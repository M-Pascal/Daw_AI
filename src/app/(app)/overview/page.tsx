import { getDiseases, getRegions } from "@/lib/data/store";
import { getNationalOverview, getOutbreakSnapshot } from "@/lib/data/derive";
import { NationalOverviewCards } from "@/components/overview/national-overview-cards";
import { DiseaseExplorer } from "@/components/overview/disease-explorer";
import type { DiseaseId } from "@/lib/types";
import type { OutbreakEntry } from "@/lib/data/derive";

export default async function OverviewPage() {
  const [diseases, regions, overview] = await Promise.all([
    getDiseases(),
    getRegions(),
    getNationalOverview(),
  ]);

  const outbreakEntries = await Promise.all(
    diseases.map(async (disease) => [disease.id, await getOutbreakSnapshot(disease.id)] as const)
  );
  const outbreaksByDisease = Object.fromEntries(outbreakEntries) as Record<
    DiseaseId,
    OutbreakEntry[]
  >;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          National Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Current disease burden across Kenya&apos;s public hospitals, from synthetic
          demonstration data.
        </p>
      </div>

      {overview.length > 0 ? (
        <NationalOverviewCards overview={overview} diseases={diseases} />
      ) : (
        <p className="text-sm text-muted-foreground">No disease data available.</p>
      )}

      <DiseaseExplorer
        diseases={diseases}
        regions={regions}
        outbreaksByDisease={outbreaksByDisease}
      />
    </div>
  );
}
