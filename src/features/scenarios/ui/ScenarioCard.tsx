import { Link } from "react-router-dom";
import type { ScenarioSummary } from "../data/types";
import { GameStateHud } from "./GameStateHud";

type ScenarioCardProps = {
  summary: ScenarioSummary;
  isRecent?: boolean;
  ctaLabel?: string;
};

export const ScenarioCard = ({
  summary,
  isRecent = false,
  ctaLabel = "Öffnen",
}: ScenarioCardProps) => (
  <Link
    to={`/s/${summary.id}`}
    className="glass-panel group flex flex-col gap-3 rounded-[28px] border border-white/10 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-field-200/50"
  >
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {isRecent ? (
          <span className="rounded-full bg-clay-300/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-clay-100">
            Zuletzt geöffnet
          </span>
        ) : null}
      </div>
      <h2 className="font-display text-[1.55rem] font-semibold leading-tight text-white">
        {summary.titleDe}
      </h2>
    </div>

    <GameStateHud summary={summary} />

    <div className="flex items-center justify-between text-sm text-slate-300">
      <span>{summary.ballDirectionDe}</span>
      <span className="font-semibold text-clay-100 transition group-hover:translate-x-0.5">
        {ctaLabel}
      </span>
    </div>
  </Link>
);
