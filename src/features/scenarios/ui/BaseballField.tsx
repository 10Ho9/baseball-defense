import { positionLabelsDe, cn } from "../../../lib/formatters";
import { getActiveThrowEvents, getThrowProgress, getTrackPointAtTime } from "../../animation/timeline";
import { fieldY } from "../data/fieldCoordinates";
import { baseAnchors, foulLineAnchors } from "../data/fieldLayout";
import type { OffenseActorId, PositionId, RunnerActorId, ScenarioDetail } from "../data/types";
import { GameStateHud } from "./GameStateHud";
import type { PlaybackStatus } from "../../session/store";

type BaseballFieldProps = {
  scenario: ScenarioDetail;
  elapsedMs: number;
  selectedPositionId: PositionId | null;
  currentPhaseLabel: string;
  progress: number;
  playbackStatus: PlaybackStatus;
  playbackAriaLabel: string;
  onSelectPosition?: (positionId: PositionId) => void;
  onTogglePlayback?: () => void;
};

const baseCoords = baseAnchors;
const foulLineCoords = foulLineAnchors;

const runnerBaseMap = {
  first: baseCoords.first,
  second: baseCoords.second,
  third: baseCoords.third,
};

const outfieldPath = `
  M ${baseCoords.home.x} ${baseCoords.home.y}
  L ${foulLineCoords.left.x} ${foulLineCoords.left.y}
  Q 50 -18 ${foulLineCoords.right.x} ${foulLineCoords.right.y}
  Z
`;

const warningTrackPath = `
  M ${foulLineCoords.left.x} ${foulLineCoords.left.y}
  Q 50 -18 ${foulLineCoords.right.x} ${foulLineCoords.right.y}
`;

const baselinePath = `
  M ${baseCoords.home.x} ${baseCoords.home.y}
  L ${baseCoords.third.x} ${baseCoords.third.y}
  L ${baseCoords.second.x} ${baseCoords.second.y}
  L ${baseCoords.first.x} ${baseCoords.first.y}
  Z
`;

const homePlatePath = `
  M ${baseCoords.home.x} ${fieldY(84.2)}
  L 47.9 ${fieldY(82.1)}
  L 47.9 ${fieldY(79.8)}
  L 52.1 ${fieldY(79.8)}
  L 52.1 ${fieldY(82.1)}
  Z
`;

const runnerTrackMap: Record<keyof typeof runnerBaseMap, RunnerActorId> = {
  first: "RUNNER_1",
  second: "RUNNER_2",
  third: "RUNNER_3",
};

const runnerLabels: Record<RunnerActorId, string> = {
  RUNNER_1: "R1",
  RUNNER_2: "R2",
  RUNNER_3: "R3",
};

const offenseLabels: Record<OffenseActorId, string> = {
  ...runnerLabels,
  BATTER: "B",
  BATTER_RUNNER: "BR",
};

export const BaseballField = ({
  scenario,
  elapsedMs,
  selectedPositionId,
  currentPhaseLabel,
  progress,
  playbackStatus,
  playbackAriaLabel,
  onSelectPosition,
  onTogglePlayback,
}: BaseballFieldProps) => {
  const actorTrackMap = new Map(
    scenario.animation.actorTracks.map((animationTrack) => [
      animationTrack.actorId,
      animationTrack,
    ]),
  );

  const currentActors = Object.fromEntries(
    scenario.animation.actorTracks.map((animationTrack) => [
      animationTrack.actorId,
      getTrackPointAtTime(animationTrack, elapsedMs),
    ]),
  );

  const activeThrows = getActiveThrowEvents(scenario.animation.throwEvents, elapsedMs);
  const runnerTrackIds = new Set(
    scenario.animation.actorTracks
      .filter((trackEntry) => trackEntry.actorId.startsWith("RUNNER_"))
      .map((trackEntry) => trackEntry.actorId),
  );
  const offenseTracks = scenario.animation.actorTracks.filter(
    (trackEntry) =>
      trackEntry.actorId.startsWith("RUNNER_") ||
      trackEntry.actorId === "BATTER" ||
      trackEntry.actorId === "BATTER_RUNNER",
  );

  return (
    <div className="glass-panel overflow-hidden rounded-[32px] border border-white/10 p-3 shadow-panel sm:p-4">
      <div className="relative overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_top,rgba(143,181,108,0.15),rgba(8,19,31,0.05)_40%),linear-gradient(180deg,rgba(78,107,50,0.3),rgba(7,16,25,0.86))]">
        <div className="pointer-events-none absolute inset-x-2.5 top-2.5 z-10 sm:inset-x-3 sm:top-3">
          <GameStateHud summary={scenario.summary} tone="overlay" />
        </div>

        <svg viewBox="0 0 100 100" className="aspect-[11/12] w-full">
          <defs>
            <linearGradient id="outfieldGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6e8f4f" stopOpacity="0.64" />
              <stop offset="58%" stopColor="#35512e" stopOpacity="0.46" />
              <stop offset="100%" stopColor="#142015" stopOpacity="0.32" />
            </linearGradient>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#f3d5bf" />
            </marker>
          </defs>

          <path
            d={outfieldPath}
            fill="url(#outfieldGradient)"
            stroke="rgba(226, 240, 205, 0.12)"
            strokeWidth="0.7"
          />
          <path
            d={warningTrackPath}
            fill="none"
            stroke="rgba(210, 170, 118, 0.16)"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d={warningTrackPath}
            fill="none"
            stroke="rgba(247,239,228,0.14)"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
          <line
            x1={baseCoords.home.x}
            y1={baseCoords.home.y}
            x2={foulLineCoords.left.x}
            y2={foulLineCoords.left.y}
            stroke="rgba(247,239,228,0.3)"
            strokeWidth="0.85"
          />
          <line
            x1={baseCoords.home.x}
            y1={baseCoords.home.y}
            x2={foulLineCoords.right.x}
            y2={foulLineCoords.right.y}
            stroke="rgba(247,239,228,0.3)"
            strokeWidth="0.85"
          />
          <path
            d={baselinePath}
            fill="none"
            stroke="rgba(247,239,228,0.22)"
            strokeWidth="0.7"
          />
          <ellipse
            cx="50"
            cy={fieldY(64)}
            rx="3.4"
            ry="1.95"
            fill="rgba(243, 213, 191, 0.16)"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.35"
          />
          <line
            x1="48.9"
            y1={fieldY(64)}
            x2="51.1"
            y2={fieldY(64)}
            stroke="rgba(247,239,228,0.22)"
            strokeWidth="0.4"
          />
          {Object.values(runnerBaseMap).map((base, index) => (
            <rect
              key={`${base.x}-${base.y}-${index}`}
              x={base.x - 1.5}
              y={base.y - 1.5}
              width="3"
              height="3"
              rx="0.6"
              transform={`rotate(45 ${base.x} ${base.y})`}
              fill="#faf8f1"
              stroke="rgba(8,19,31,0.45)"
              strokeWidth="0.4"
            />
          ))}
          <path
            d={homePlatePath}
            fill="#faf8f1"
            stroke="rgba(8,19,31,0.5)"
            strokeWidth="0.45"
          />

          {Object.entries(runnerBaseMap).map(([runnerKey, base]) => {
            const occupied = scenario.summary.runners[runnerKey as keyof typeof runnerBaseMap];
            const runnerActorId = runnerTrackMap[runnerKey as keyof typeof runnerBaseMap];

            if (runnerTrackIds.has(runnerActorId)) {
              return null;
            }

            return occupied ? (
              <circle
                key={runnerKey}
                cx={base.x}
                cy={base.y}
                r="3.1"
                fill="rgba(243, 213, 191, 0.18)"
                stroke="#f3d5bf"
                strokeWidth="0.7"
              />
            ) : null;
          })}

          {scenario.positions.map((assignment) => {
            const polyline = [assignment.start, ...assignment.path]
              .map((point) => `${point.x},${point.y}`)
              .join(" ");
            const isSelected = selectedPositionId === assignment.position;

            return (
              <polyline
                key={`${assignment.position}-path`}
                points={polyline}
                fill="none"
                stroke={isSelected ? "#f3d5bf" : "rgba(255,255,255,0.18)"}
                strokeWidth={isSelected ? 1.3 : 0.8}
                strokeDasharray={isSelected ? "0" : "2.2 2.2"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}

          {scenario.animation.throwEvents.map((throwEvent) => {
            const fromTrack = actorTrackMap.get(throwEvent.fromActor);
            const toTrack = actorTrackMap.get(throwEvent.toActor);

            if (!fromTrack || !toTrack) {
              return null;
            }

            const fromPoint = getTrackPointAtTime(fromTrack, throwEvent.startMs);
            const toPoint = getTrackPointAtTime(toTrack, throwEvent.startMs + throwEvent.durationMs);
            const isActive = activeThrows.some(
              (activeThrow) =>
                activeThrow.fromActor === throwEvent.fromActor &&
                activeThrow.toActor === throwEvent.toActor &&
                activeThrow.startMs === throwEvent.startMs,
            );
            const progress = isActive ? getThrowProgress(throwEvent, elapsedMs) : 1;
            const activeTarget = {
              x: fromPoint.x + (toPoint.x - fromPoint.x) * progress,
              y: fromPoint.y + (toPoint.y - fromPoint.y) * progress,
            };

            return (
              <g key={`${throwEvent.fromActor}-${throwEvent.toActor}-${throwEvent.startMs}`}>
                <line
                  x1={fromPoint.x}
                  y1={fromPoint.y}
                  x2={toPoint.x}
                  y2={toPoint.y}
                  stroke={isActive ? "rgba(243,213,191,0.95)" : "rgba(243,213,191,0.28)"}
                  strokeWidth={isActive ? 1.1 : 0.8}
                  strokeDasharray={isActive ? "0" : "2 2"}
                  markerEnd="url(#arrowhead)"
                />
                {isActive ? (
                  <circle
                    cx={activeTarget.x}
                    cy={activeTarget.y}
                    r="1.1"
                    fill="#f3d5bf"
                  />
                ) : null}
              </g>
            );
          })}

          {scenario.positions.map((assignment) => {
            const actor = currentActors[assignment.position];
            const isSelected = selectedPositionId === assignment.position;
            const label = positionLabelsDe[assignment.position];

            return (
              <g key={assignment.position}>
                <circle
                  cx={actor.x}
                  cy={actor.y}
                  r="5.8"
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => onSelectPosition?.(assignment.position)}
                />
                <circle
                  cx={actor.x}
                  cy={actor.y}
                  r={isSelected ? 3.2 : 2.6}
                  fill={isSelected ? "#f3d5bf" : "#d6e3ca"}
                  stroke={isSelected ? "#ffffff" : "#183b24"}
                  strokeWidth={isSelected ? 0.75 : 0.55}
                  className="cursor-pointer transition-all"
                  onClick={() => onSelectPosition?.(assignment.position)}
                />
                <text
                  x={actor.x}
                  y={actor.y - 4.7}
                  fill={isSelected ? "#fff8ef" : "rgba(255,255,255,0.72)"}
                  fontSize="2.2"
                  fontWeight="700"
                  textAnchor="middle"
                  className="pointer-events-none"
                >
                  {assignment.position}
                </text>
                <title>{label}</title>
              </g>
            );
          })}

          {offenseTracks
            .map((animationTrack) => {
              const actorId = animationTrack.actorId as OffenseActorId;
              const actor = currentActors[actorId as keyof typeof currentActors] as
                | { x: number; y: number; visible: boolean }
                | undefined;

              if (!actor?.visible) {
                return null;
              }

              const isBatter = actorId === "BATTER";
              const isBatterRunner = actorId === "BATTER_RUNNER";

              return (
                <g key={actorId}>
                  <circle
                    cx={actor.x}
                    cy={actor.y}
                    r={isBatter ? "2.1" : isBatterRunner ? "2.45" : "2.3"}
                    fill={isBatter ? "#d99168" : "#c96d42"}
                    stroke="#fff2df"
                    strokeWidth={isBatter ? "0.5" : "0.55"}
                  />
                  <text
                    x={actor.x}
                    y={actor.y - (isBatter ? 3.8 : 4.2)}
                    fill="#fff2df"
                    fontSize={isBatter ? "1.8" : "2"}
                    fontWeight="700"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {offenseLabels[actorId]}
                  </text>
                </g>
              );
            })}

          {currentActors.BALL?.visible ? (
            <circle
              cx={currentActors.BALL.x}
              cy={currentActors.BALL.y}
              r="1.4"
              fill="#f8fafc"
              stroke="#c96d42"
              strokeWidth="0.35"
            />
          ) : null}

        </svg>

      </div>

      <div className="mt-2 flex items-center gap-3 rounded-[20px] bg-white/5 px-3 py-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.22em] text-clay-100">Aktive Phase</div>
          <div className="mt-1 truncate text-sm font-semibold text-white">{currentPhaseLabel}</div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy-950/70">
            <div
              className="h-full rounded-full bg-gradient-to-r from-clay-300 to-field-200 transition-[width]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onTogglePlayback}
          aria-label={playbackAriaLabel}
          title={playbackAriaLabel}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay-300 text-navy-900 shadow-[0_14px_36px_rgba(219,160,111,0.24)] transition hover:bg-clay-200"
        >
          {playbackStatus === "playing" ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>

      <div className="mt-3 text-[10px] uppercase tracking-[0.24em] text-slate-400">
        Positionen
      </div>

      <div className="mt-2 grid grid-cols-5 gap-2">
        {scenario.positions.map((assignment) => (
          <button
            key={assignment.position}
            type="button"
            onClick={() => onSelectPosition?.(assignment.position)}
            className={cn(
              "min-h-[2.75rem] rounded-[14px] border px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition",
              selectedPositionId === assignment.position
                ? "border-clay-200 bg-clay-300/15 text-clay-100 shadow-[0_10px_24px_rgba(219,160,111,0.2)] ring-1 ring-clay-100/20"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-field-200/40 hover:text-white",
            )}
          >
            {assignment.position}
          </button>
        ))}
      </div>
    </div>
  );
};

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
    <path d="M8 6.5v11l9-5.5z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
    <path d="M7.5 6.5h3v11h-3zm6 0h3v11h-3z" />
  </svg>
);
