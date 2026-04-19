import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { getCurrentPhase } from "../features/animation/timeline";
import { useAnimationClock } from "../features/animation/useAnimationClock";
import { useSessionStore } from "../features/session/store";
import { getScenarioCategoryForScenarioId } from "../features/scenarios/data/categoryRegistry";
import { getScenarioById } from "../features/scenarios/data/registry";
import { BaseballField } from "../features/scenarios/ui/BaseballField";
import { PositionSheet } from "../features/scenarios/ui/PositionSheet";
import { cn } from "../lib/formatters";

const modes = [
  { id: "ablauf", label: "Ablauf" },
  { id: "position", label: "Position" },
] as const;

export const TrainerScreen = () => {
  const { scenarioId = "" } = useParams();
  const scenario = getScenarioById(scenarioId);
  const animationFocusRef = useRef<HTMLDivElement | null>(null);

  const resetForScenario = useSessionStore((state) => state.resetForScenario);
  const selectedPositionId = useSessionStore((state) => state.selectedPositionId);
  const setSelectedPosition = useSessionStore((state) => state.setSelectedPosition);
  const activeMode = useSessionStore((state) => state.activeMode);
  const setActiveMode = useSessionStore((state) => state.setActiveMode);
  const playbackStatus = useSessionStore((state) => state.playbackStatus);
  const setPlaybackStatus = useSessionStore((state) => state.setPlaybackStatus);
  const elapsedMs = useSessionStore((state) => state.elapsedMs);
  const setElapsedMs = useSessionStore((state) => state.setElapsedMs);

  useEffect(() => {
    if (scenario) {
      resetForScenario(scenario.summary.id);
    }
  }, [resetForScenario, scenario]);

  useEffect(() => {
    if (!scenario) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      animationFocusRef.current?.scrollIntoView?.({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [scenario]);

  useAnimationClock(scenario?.animation.durationMs ?? 0);

  if (!scenario) {
    return (
      <PageShell>
        <div className="glass-panel rounded-[32px] border border-white/10 p-6 text-slate-200">
          <div className="text-xs uppercase tracking-[0.24em] text-clay-100">Szenario fehlt</div>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white">
            Dieses Szenario existiert noch nicht.
          </h1>
          <p className="mt-3 text-sm leading-6">
            Geh zur Übersicht zurück und wähle eines der freigegebenen MVP-Szenarien aus.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-full bg-clay-300 px-4 py-2 text-sm font-semibold text-navy-900"
          >
            Zur Übersicht
          </Link>
        </div>
      </PageShell>
    );
  }

  const currentPhase = getCurrentPhase(scenario.animation.phases, elapsedMs);
  const progress = Math.min(elapsedMs / scenario.animation.durationMs, 1);
  const hasFinished =
    scenario.animation.durationMs > 0 && elapsedMs >= scenario.animation.durationMs;
  const category = getScenarioCategoryForScenarioId(scenario.summary.id);
  const backTarget = category ? `/k/${category.id}` : "/";
  const playbackAriaLabel =
    playbackStatus === "playing"
      ? "Animation pausieren"
      : hasFinished
        ? "Animation erneut abspielen"
        : elapsedMs > 0
          ? "Animation fortsetzen"
          : "Animation starten";

  const handlePlaybackToggle = () => {
    if (playbackStatus === "playing") {
      setPlaybackStatus("paused");
      return;
    }

    if (hasFinished) {
      setElapsedMs(0);
    }

    setPlaybackStatus("playing");
  };

  return (
    <PageShell>
      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={backTarget}
            className="inline-flex rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-slate-300 transition hover:border-field-100/50 hover:text-white"
          >
            {category ? "Zur Kategorie" : "Zur Übersicht"}
          </Link>
          {category ? (
            <span className="rounded-full bg-clay-300/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-clay-100">
              {category.labelDe}
            </span>
          ) : null}
        </div>

        <h1 className="max-w-3xl font-display text-[1.95rem] font-semibold leading-tight text-white sm:text-4xl">
          {scenario.summary.titleDe}
        </h1>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
        <div ref={animationFocusRef} data-testid="trainer-animation-focus" className="space-y-4">
          <BaseballField
            scenario={scenario}
            elapsedMs={elapsedMs}
            selectedPositionId={selectedPositionId}
            currentPhaseLabel={currentPhase.labelDe}
            progress={progress}
            playbackStatus={playbackStatus}
            playbackAriaLabel={playbackAriaLabel}
            onSelectPosition={setSelectedPosition}
            onTogglePlayback={handlePlaybackToggle}
          />

          <div className="glass-panel rounded-[28px] border border-white/10 p-2 shadow-panel">
            <div className="grid grid-cols-2 gap-2">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActiveMode(mode.id)}
                  className={cn(
                    "min-h-[2.9rem] rounded-full px-3 py-3 text-sm font-semibold transition",
                    activeMode === mode.id
                      ? "bg-clay-300 text-navy-900 shadow-[0_10px_24px_rgba(219,160,111,0.28)] ring-1 ring-clay-100/30"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {activeMode === "ablauf" ? (
            <AblaufPanel scenario={scenario} currentPhaseLabel={currentPhase.labelDe} />
          ) : null}
          {activeMode === "position" ? (
            <PositionSheet scenario={scenario} selectedPositionId={selectedPositionId} />
          ) : null}
        </div>
      </section>
    </PageShell>
  );
};

const AblaufPanel = ({
  scenario,
  currentPhaseLabel,
}: {
  scenario: NonNullable<ReturnType<typeof getScenarioById>>;
  currentPhaseLabel: string;
}) => (
  <div className="glass-panel rounded-[28px] border border-white/10 p-4 shadow-panel">
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="text-xs uppercase tracking-[0.24em] text-clay-100">Ablauf</div>
        <h3 className="mt-1.5 font-display text-[1.7rem] font-semibold text-white">
          {currentPhaseLabel}
        </h3>
      </div>
      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-field-100">
        Call Sheet
      </span>
    </div>

    <p className="mt-3 text-sm leading-5 text-slate-200">{scenario.objectiveDe}</p>

    <div className="mt-4 space-y-2.5">
      <SummaryRow label="Team-Call" value={scenario.teamCallDe} />
      <SummaryRow label="Primäres Aus" value={scenario.primaryOutTarget} />
      <SummaryRow label="Fallback" value={scenario.fallbackOutTarget} />
    </div>
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-[22px] bg-white/5 px-4 py-3">
    <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{label}</div>
    <div className="mt-2 text-sm leading-5 text-white">{value}</div>
  </div>
);
