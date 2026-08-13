"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { KenyaMap } from "@/components/overview/kenya-map";
import { MostAffectedChart } from "@/components/overview/most-affected-chart";
import type { Disease, DiseaseId, Region } from "@/lib/types";
import type { OutbreakEntry } from "@/lib/data/derive";

export function DiseaseExplorer({
  diseases,
  regions,
  outbreaksByDisease,
}: {
  diseases: Disease[];
  regions: Region[];
  outbreaksByDisease: Record<DiseaseId, OutbreakEntry[]>;
}) {
  const [selected, setSelected] = useState<DiseaseId>(diseases[0]?.id ?? "hiv");
  const activeDisease = diseases.find((d) => d.id === selected) ?? diseases[0];
  const outbreak = outbreaksByDisease[selected] ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {diseases.map((disease) => (
          <button
            key={disease.id}
            type="button"
            onClick={() => setSelected(disease.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              selected === disease.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            )}
          >
            {disease.name}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kenya outbreak map &middot; {activeDisease?.name}</CardTitle>
          <CardDescription>
            Regional case intensity for {activeDisease?.fullName} across Kenya&apos;s eight
            regions. Select a region to see its current case count.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {outbreak.length > 0 ? (
            <KenyaMap regions={regions} outbreak={outbreak} diseaseName={activeDisease?.name ?? ""} />
          ) : (
            <p className="text-sm text-muted-foreground">
              No outbreak data available for {activeDisease?.name}.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Most affected areas &middot; {activeDisease?.name}</CardTitle>
          <CardDescription>
            Regions ranked by current {activeDisease?.name} case burden.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MostAffectedChart data={outbreak} diseaseName={activeDisease?.name ?? ""} />
        </CardContent>
      </Card>
    </div>
  );
}
