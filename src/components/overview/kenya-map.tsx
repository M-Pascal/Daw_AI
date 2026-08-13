"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Region } from "@/lib/types";
import type { OutbreakEntry } from "@/lib/data/derive";

const VIEW_W = 480;
const VIEW_H = 620;

export function KenyaMap({
  regions,
  outbreak,
  diseaseName,
}: {
  regions: Region[];
  outbreak: OutbreakEntry[];
  diseaseName: string;
}) {
  const outbreakByRegion = useMemo(
    () => new Map(outbreak.map((o) => [o.regionId, o])),
    [outbreak]
  );
  const topRegionId = outbreak[0]?.regionId;
  const [activeRegionId, setActiveRegionId] = useState<string | null>(null);

  const activeEntry =
    outbreak.find((o) => o.regionId === activeRegionId) ?? outbreak[0] ?? null;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_220px]">
      <div className="rounded-xl border border-border bg-secondary/40 p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`Map of Kenya's eight regions showing ${diseaseName} case counts`}
          className="mx-auto h-auto w-full max-w-md"
        >
          {regions.map((region) => {
            const entry = outbreakByRegion.get(region.id);
            const intensity = entry?.intensity ?? 0;
            const opacity = 0.12 + intensity * 0.78;
            const isTop = region.id === topRegionId;
            const isActive = region.id === (activeRegionId ?? topRegionId);

            return (
              <g key={region.id}>
                <rect
                  x={region.mapRect.x}
                  y={region.mapRect.y}
                  width={region.mapRect.w}
                  height={region.mapRect.h}
                  rx={14}
                  fill="var(--color-primary)"
                  fillOpacity={opacity}
                  stroke={isTop ? "var(--color-kenya-accent)" : "var(--color-border)"}
                  strokeWidth={isTop ? 3 : isActive ? 2 : 1}
                  className="cursor-pointer transition-[stroke-width] duration-150"
                  onClick={() => setActiveRegionId(region.id)}
                  onMouseEnter={() => setActiveRegionId(region.id)}
                >
                  <title>
                    {region.name}: {entry?.cases.toLocaleString() ?? 0} cases
                  </title>
                </rect>
                <text
                  x={region.mapRect.x + region.mapRect.w / 2}
                  y={region.mapRect.y + region.mapRect.h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none fill-foreground text-[11px] font-medium"
                >
                  {region.name}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <span>Low</span>
          <div className="h-2.5 w-32 rounded-full bg-gradient-to-r from-primary/10 to-primary" />
          <span>High</span>
          <span className="ml-4 inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-kenya-accent" />
            Most affected
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {diseaseName} &middot; selected region
        </p>
        {activeEntry ? (
          <div className="mt-2">
            <p className="text-lg font-semibold text-foreground">{activeEntry.regionName}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
              {activeEntry.cases.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">reported cases this month</p>
            <span
              className={cn(
                "mt-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                activeEntry.severity === "critical" && "bg-destructive/10 text-destructive",
                activeEntry.severity === "high" && "bg-shortage/10 text-shortage",
                activeEntry.severity === "moderate" && "bg-primary/10 text-primary",
                activeEntry.severity === "low" && "bg-balanced/10 text-balanced"
              )}
            >
              {activeEntry.severity} burden
            </span>
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">No data available.</p>
        )}
      </div>
    </div>
  );
}
