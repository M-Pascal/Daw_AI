import "server-only";
import { getDiseaseMonthlyData, getRegions } from "@/lib/data/store";
import type {
  DiseaseId,
  ForecastPoint,
  HistoricalPoint,
  MonthlyPoint,
  RegionId,
  TrendStatus,
} from "@/lib/types";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTH_LABELS[m - 1]} ${y}`;
}

export interface NationalOverviewEntry {
  diseaseId: DiseaseId;
  currentMonth: string;
  currentCases: number;
  previousCases: number;
  changePercent: number;
  trendStatus: TrendStatus;
  sparkline: { month: string; cases: number }[];
}

export async function getNationalOverview(): Promise<NationalOverviewEntry[]> {
  const data = await getDiseaseMonthlyData();
  const regions = await getRegions();
  const diseaseIds = Object.keys(data.series) as DiseaseId[];
  const currentMonth = data.meta.currentMonth;
  const months = data.meta.historicalMonths;
  const previousMonth = months[months.length - 2];

  return diseaseIds.map((diseaseId) => {
    const perRegion = data.series[diseaseId];

    const totalsByMonth = new Map<string, number>();
    for (const region of regions) {
      const points = perRegion[region.id] ?? [];
      for (const p of points) {
        if (p.type !== "historical") continue;
        totalsByMonth.set(p.month, (totalsByMonth.get(p.month) ?? 0) + p.cases);
      }
    }

    const currentCases = totalsByMonth.get(currentMonth) ?? 0;
    const previousCases = totalsByMonth.get(previousMonth) ?? 0;
    const changePercent =
      previousCases === 0 ? 0 : ((currentCases - previousCases) / previousCases) * 100;

    const sparklineMonths = months.slice(-6);
    const sparkline = sparklineMonths.map((m) => ({
      month: m,
      cases: totalsByMonth.get(m) ?? 0,
    }));

    return {
      diseaseId,
      currentMonth,
      currentCases,
      previousCases,
      changePercent: Math.round(changePercent * 10) / 10,
      trendStatus: trendStatusFromChange(changePercent),
      sparkline,
    };
  });
}

function trendStatusFromChange(changePercent: number): TrendStatus {
  if (changePercent > 5) return "shortage";
  if (changePercent < -5) return "surplus";
  return "balanced";
}

export interface OutbreakEntry {
  regionId: RegionId;
  regionName: string;
  cases: number;
  intensity: number; // 0..1 normalized against the max region for this disease
  severity: "low" | "moderate" | "high" | "critical";
}

export async function getOutbreakSnapshot(diseaseId: DiseaseId): Promise<OutbreakEntry[]> {
  const data = await getDiseaseMonthlyData();
  const regions = await getRegions();
  const currentMonth = data.meta.currentMonth;
  const perRegion = data.series[diseaseId];

  const raw = regions.map((region) => {
    const points = perRegion[region.id] ?? [];
    const point = points.find((p) => p.month === currentMonth);
    return { region, cases: point?.cases ?? 0 };
  });

  const max = Math.max(1, ...raw.map((r) => r.cases));

  return raw
    .map(({ region, cases }) => {
      const intensity = cases / max;
      let severity: OutbreakEntry["severity"] = "low";
      if (intensity >= 0.85) severity = "critical";
      else if (intensity >= 0.6) severity = "high";
      else if (intensity >= 0.3) severity = "moderate";

      return {
        regionId: region.id,
        regionName: region.name,
        cases,
        intensity,
        severity,
      };
    })
    .sort((a, b) => b.cases - a.cases);
}

export async function getMostAffectedAreas(diseaseId: DiseaseId): Promise<OutbreakEntry[]> {
  return getOutbreakSnapshot(diseaseId);
}

export interface ForecastSeriesPoint {
  month: string;
  monthLabel: string;
  historical: number | null;
  forecast: number | null;
  low: number | null;
  high: number | null;
}

export async function getForecastSeries(
  diseaseId: DiseaseId,
  regionId: RegionId | "national"
): Promise<ForecastSeriesPoint[]> {
  const data = await getDiseaseMonthlyData();
  const regions = await getRegions();
  const perRegion = data.series[diseaseId];

  function pointsFor(rid: RegionId): MonthlyPoint[] {
    return perRegion[rid] ?? [];
  }

  const allMonths = [...data.meta.historicalMonths, ...data.meta.forecastMonths];

  const result: ForecastSeriesPoint[] = allMonths.map((month) => ({
    month,
    monthLabel: formatMonth(month),
    historical: null,
    forecast: null,
    low: null,
    high: null,
  }));

  const byMonth = new Map(result.map((r) => [r.month, r]));

  const regionIds: RegionId[] = regionId === "national" ? regions.map((r) => r.id) : [regionId];

  for (const rid of regionIds) {
    for (const point of pointsFor(rid)) {
      const entry = byMonth.get(point.month);
      if (!entry) continue;
      if (point.type === "historical") {
        entry.historical = (entry.historical ?? 0) + point.cases;
      } else {
        const fp = point as ForecastPoint;
        entry.forecast = (entry.forecast ?? 0) + fp.cases;
        entry.low = (entry.low ?? 0) + fp.low;
        entry.high = (entry.high ?? 0) + fp.high;
      }
    }
  }

  // Bridge the line: carry the last historical point into the forecast series
  // so the chart line is visually continuous between actual and predicted data.
  const lastHistoricalMonth = data.meta.historicalMonths[data.meta.historicalMonths.length - 1];
  const bridgeEntry = byMonth.get(lastHistoricalMonth);
  const firstForecastMonth = data.meta.forecastMonths[0];
  const firstForecastEntry = byMonth.get(firstForecastMonth);
  if (bridgeEntry && firstForecastEntry) {
    firstForecastEntry.forecast = firstForecastEntry.forecast ?? bridgeEntry.historical;
  }

  return result;
}

export interface SeasonalInsight {
  peakMonthLabel: string;
  peakMonthIndex: number;
  lowMonthLabel: string;
  lowMonthIndex: number;
}

export async function getSeasonalInsight(diseaseId: DiseaseId): Promise<SeasonalInsight> {
  const data = await getDiseaseMonthlyData();
  const regions = await getRegions();
  const perRegion = data.series[diseaseId];

  const totalsByMonthIndex = new Array(12).fill(0);
  const countByMonthIndex = new Array(12).fill(0);

  for (const region of regions) {
    const points = (perRegion[region.id] ?? []).filter(
      (p): p is HistoricalPoint => p.type === "historical"
    );
    for (const p of points) {
      const idx = Number(p.month.split("-")[1]) - 1;
      totalsByMonthIndex[idx] += p.cases;
      countByMonthIndex[idx] += 1;
    }
  }

  const averages = totalsByMonthIndex.map((total, i) =>
    countByMonthIndex[i] ? total / countByMonthIndex[i] : 0
  );

  let peakMonthIndex = 0;
  let lowMonthIndex = 0;
  averages.forEach((avg, i) => {
    if (avg > averages[peakMonthIndex]) peakMonthIndex = i;
    if (avg < averages[lowMonthIndex]) lowMonthIndex = i;
  });

  return {
    peakMonthLabel: MONTH_LABELS[peakMonthIndex],
    peakMonthIndex,
    lowMonthLabel: MONTH_LABELS[lowMonthIndex],
    lowMonthIndex,
  };
}
