import { cn } from "@/lib/utils";
import type { TrendStatus } from "@/lib/types";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

const STATUS_CONFIG: Record<
  TrendStatus,
  { label: string; className: string; Icon: typeof ArrowUpRight }
> = {
  shortage: {
    label: "Rising demand",
    className: "bg-shortage/10 text-shortage border-shortage/30",
    Icon: ArrowUpRight,
  },
  surplus: {
    label: "Falling demand",
    className: "bg-surplus/15 text-surplus border-surplus/40",
    Icon: ArrowDownRight,
  },
  balanced: {
    label: "Stable",
    className: "bg-balanced/10 text-balanced border-balanced/30",
    Icon: Minus,
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: TrendStatus;
  className?: string;
}) {
  const { label, className: statusClassName, Icon } = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        statusClassName,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
