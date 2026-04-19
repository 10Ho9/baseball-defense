import type { RunnerState, ScenarioSummary } from "../data/types";
import { cn, formatOutsDe, formatPlayTypeDe, formatRunnersDe } from "../../../lib/formatters";

type GameStateHudProps = {
  summary: ScenarioSummary;
  className?: string;
  tone?: "overlay" | "card";
};

const toneClasses = {
  overlay: {
    play: "bg-navy-950/84 text-field-100 shadow-[0_14px_36px_rgba(2,6,23,0.32)]",
    cluster: "bg-navy-950/84 text-white shadow-[0_14px_36px_rgba(2,6,23,0.32)]",
    dotOn: "bg-[#ef4444] shadow-[0_0_12px_rgba(239,68,68,0.55)]",
    dotOff: "bg-white/20 ring-1 ring-white/15",
    diamondStroke: "stroke-white/45",
    diamondFill: "fill-white/12",
    baseOn: "fill-clay-200 stroke-[#f8fafc]",
    baseOff: "fill-white/12 stroke-white/35",
  },
  card: {
    play: "bg-field-300/15 text-field-100",
    cluster: "bg-white/8 text-white",
    dotOn: "bg-[#ef4444] shadow-[0_0_10px_rgba(239,68,68,0.45)]",
    dotOff: "bg-white/15 ring-1 ring-white/10",
    diamondStroke: "stroke-white/28",
    diamondFill: "fill-white/7",
    baseOn: "fill-clay-200 stroke-[#f8fafc]",
    baseOff: "fill-white/10 stroke-white/25",
  },
} as const;

export const GameStateHud = ({
  summary,
  className,
  tone = "card",
}: GameStateHudProps) => {
  const tones = toneClasses[tone];
  const accessibilityLabel = `${formatPlayTypeDe(summary.playType)}, ${formatOutsDe(summary.outs)}, ${formatRunnersDe(summary.runners)}`;

  return (
    <div
      className={cn("flex items-center justify-between gap-3", className)}
      aria-label={accessibilityLabel}
    >
      <div
        className={cn(
          "inline-flex min-h-[2.25rem] items-center rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]",
          tones.play,
        )}
      >
        {formatPlayTypeDe(summary.playType)}
      </div>

      <div
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5",
          tones.cluster,
        )}
      >
        <OutLights outs={summary.outs} tone={tone} />
        <RunnerDiamond runners={summary.runners} tone={tone} />
      </div>
    </div>
  );
};

const OutLights = ({
  outs,
  tone,
}: {
  outs: ScenarioSummary["outs"];
  tone: "overlay" | "card";
}) => {
  const tones = toneClasses[tone];

  return (
    <div className="flex items-center" aria-label={formatOutsDe(outs)}>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {[0, 1].map((index) => (
          <span
            key={index}
            className={cn(
              tone === "overlay" ? "h-3.5 w-3.5 rounded-full" : "h-3 w-3 rounded-full",
              index < outs ? tones.dotOn : tones.dotOff,
            )}
          />
        ))}
      </div>
    </div>
  );
};

const RunnerDiamond = ({
  runners,
  tone,
}: {
  runners: RunnerState;
  tone: "overlay" | "card";
}) => {
  const tones = toneClasses[tone];

  return (
    <div className="flex items-center" aria-label={formatRunnersDe(runners)}>
      <svg
        viewBox="0 0 24 24"
        className={cn(tone === "overlay" ? "h-8 w-8" : "h-7 w-7")}
        aria-hidden="true"
      >
        <path
          d="M12 4.5 L19.5 12 L12 19.5 L4.5 12 Z"
          className={cn(tones.diamondFill, tones.diamondStroke)}
          strokeWidth="1"
        />
        <rect
          x="16.15"
          y="10.15"
          width="3.7"
          height="3.7"
          rx="0.75"
          transform="rotate(45 18 12)"
          className={cn(runners.first ? tones.baseOn : tones.baseOff)}
          strokeWidth="0.8"
        />
        <rect
          x="10.15"
          y="4.15"
          width="3.7"
          height="3.7"
          rx="0.75"
          transform="rotate(45 12 6)"
          className={cn(runners.second ? tones.baseOn : tones.baseOff)}
          strokeWidth="0.8"
        />
        <rect
          x="4.15"
          y="10.15"
          width="3.7"
          height="3.7"
          rx="0.75"
          transform="rotate(45 6 12)"
          className={cn(runners.third ? tones.baseOn : tones.baseOff)}
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
};
