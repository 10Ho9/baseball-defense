import { Link } from "react-router-dom";
import { cn } from "../../../lib/formatters";
import type { ScenarioCategorySummary } from "../data/categoryRegistry";

type ScenarioCategoryCardProps = {
  category: ScenarioCategorySummary;
  className?: string;
};

export const ScenarioCategoryCard = ({ category, className }: ScenarioCategoryCardProps) => (
  <Link
    to={`/k/${category.id}`}
    aria-label={category.labelDe}
    className={cn(
      "glass-panel group relative flex min-h-[8.95rem] flex-col overflow-hidden rounded-[28px] border border-white/10 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-field-200/50",
      surfaceClasses[category.id],
      className,
    )}
  >
    <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-1", accentClasses[category.id])} />

    <div className="relative flex flex-1 flex-col">
      <div className="flex justify-end">
        <span className="text-[0.82rem] font-semibold tracking-[0.18em] text-white/18">
          {String(category.order).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-5 space-y-2.5">
        <h2 className="max-w-[10.5rem] font-display text-[1.4rem] font-semibold leading-[1.02] text-white sm:text-[1.48rem]">
          {category.shortLabelDe}
        </h2>
        <p className="max-w-[12rem] text-[0.88rem] leading-5 text-slate-300">
          {category.focusLine}
        </p>
      </div>

      <p className="mt-auto pt-6 text-[0.66rem] font-medium uppercase tracking-[0.28em] text-white/36">
          {category.scenarioIds.length} {category.scenarioIds.length === 1 ? "Übung" : "Übungen"}
      </p>
    </div>
  </Link>
);

const accentClasses: Record<ScenarioCategorySummary["id"], string> = {
  "basic-infield-routines": "bg-gradient-to-r from-field-200/60 to-transparent",
  "force-and-double-plays": "bg-gradient-to-r from-clay-200/65 to-transparent",
  "bunts-and-squeezes": "bg-gradient-to-r from-emerald-300/55 to-transparent",
  "run-prevention-and-tag-ups": "bg-gradient-to-r from-sky-300/55 to-transparent",
  "outfield-hits-cutoffs-relays": "bg-gradient-to-r from-amber-300/55 to-transparent",
  "priority-and-foul-pops": "bg-gradient-to-r from-rose-300/55 to-transparent",
  "special-defenses": "bg-gradient-to-r from-white/30 to-transparent",
};

const surfaceClasses: Record<ScenarioCategorySummary["id"], string> = {
  "basic-infield-routines":
    "border-clay-200/20 shadow-[0_18px_36px_rgba(219,160,111,0.10)] bg-[radial-gradient(circle_at_88%_14%,rgba(219,160,111,0.12),transparent_34%),linear-gradient(180deg,rgba(21,34,49,0.98),rgba(8,19,31,0.96))]",
  "force-and-double-plays":
    "shadow-[0_18px_36px_rgba(219,160,111,0.10)] bg-[radial-gradient(circle_at_88%_14%,rgba(251,191,36,0.12),transparent_34%),linear-gradient(180deg,rgba(15,29,44,0.98),rgba(8,19,31,0.96))]",
  "bunts-and-squeezes":
    "shadow-[0_18px_36px_rgba(74,222,128,0.08)] bg-[radial-gradient(circle_at_88%_14%,rgba(74,222,128,0.12),transparent_34%),linear-gradient(180deg,rgba(14,28,42,0.98),rgba(8,19,31,0.96))]",
  "run-prevention-and-tag-ups":
    "shadow-[0_18px_36px_rgba(125,211,252,0.08)] bg-[radial-gradient(circle_at_88%_14%,rgba(125,211,252,0.12),transparent_34%),linear-gradient(180deg,rgba(15,30,46,0.98),rgba(8,19,31,0.96))]",
  "outfield-hits-cutoffs-relays":
    "shadow-[0_18px_36px_rgba(252,211,77,0.08)] bg-[radial-gradient(circle_at_88%_14%,rgba(252,211,77,0.12),transparent_34%),linear-gradient(180deg,rgba(14,28,42,0.98),rgba(8,19,31,0.96))]",
  "priority-and-foul-pops":
    "shadow-[0_18px_36px_rgba(251,113,133,0.08)] bg-[radial-gradient(circle_at_88%_14%,rgba(251,113,133,0.12),transparent_34%),linear-gradient(180deg,rgba(15,28,44,0.98),rgba(8,19,31,0.96))]",
  "special-defenses":
    "shadow-[0_18px_36px_rgba(148,163,184,0.06)] bg-[radial-gradient(circle_at_88%_14%,rgba(148,163,184,0.12),transparent_34%),linear-gradient(180deg,rgba(15,28,44,0.98),rgba(8,19,31,0.96))]",
};
