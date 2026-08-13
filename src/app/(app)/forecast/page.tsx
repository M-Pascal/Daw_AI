import { getDiseases, getRegions } from "@/lib/data/store";
import { getForecastSeries, getSeasonalInsight } from "@/lib/data/derive";
import { ForecastExplorer } from "@/components/forecast/forecast-explorer";

export default async function ForecastPage() {
  const [diseases, regions] = await Promise.all([getDiseases(), getRegions()]);
  const defaultDisease = diseases[0];

  const [series, seasonal] = defaultDisease
    ? await Promise.all([
        getForecastSeries(defaultDisease.id, "national"),
        getSeasonalInsight(defaultDisease.id),
      ])
    : [[], null];

  const historicalPoints = series.filter((p) => p.historical !== null);
  const currentCases = historicalPoints[historicalPoints.length - 1]?.historical ?? 0;
  const previousCases = historicalPoints[historicalPoints.length - 2]?.historical ?? 0;
  const changePercent =
    previousCases === 0 ? 0 : ((currentCases - previousCases) / previousCases) * 100;
  const trendStatus = changePercent > 5 ? "shortage" : changePercent < -5 ? "surplus" : "balanced";
  const nextForecastPoint = series.find((p) => p.forecast !== null && p.historical === null);

  const initialData = defaultDisease
    ? {
        disease: defaultDisease,
        regionId: "national" as const,
        regionName: "National (all regions)",
        series,
        seasonal,
        trend: {
          currentCases,
          previousCases,
          changePercent: Math.round(changePercent * 10) / 10,
          status: trendStatus as "shortage" | "surplus" | "balanced",
        },
        nextMonth: nextForecastPoint
          ? { month: nextForecastPoint.month, cases: nextForecastPoint.forecast }
          : null,
      }
    : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Disease Forecast
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Predicted monthly disease burden by region, generated from historical
          patterns to support evidence-based drug allocation.
        </p>
      </div>

      {diseases.length > 0 ? (
        <ForecastExplorer diseases={diseases} regions={regions} initialData={initialData} />
      ) : (
        <p className="text-sm text-muted-foreground">No forecast data available.</p>
      )}
    </div>
  );
}
