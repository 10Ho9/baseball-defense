import type { PositionId, RunnerState, ScenarioSummary } from "../features/scenarios/data/types";

export const positionLabelsDe: Record<PositionId, string> = {
  P: "Pitcher",
  C: "Catcher",
  "1B": "First Base",
  "2B": "Second Base",
  "3B": "Third Base",
  SS: "Shortstop",
  LF: "Left Field",
  CF: "Center Field",
  RF: "Right Field",
};

export const formatOutsDe = (outs: ScenarioSummary["outs"]) =>
  `${outs} ${outs === 1 ? "Out" : "Outs"}`;

export const formatRunnersDe = (runners: RunnerState) => {
  const activeBases = [];

  if (runners.first) activeBases.push("1B");
  if (runners.second) activeBases.push("2B");
  if (runners.third) activeBases.push("3B");

  return activeBases.length > 0
    ? `Läufer auf ${activeBases.join(" / ")}`
    : "Keine Läufer";
};

export const formatPlayTypeDe = (playType: ScenarioSummary["playType"]) => {
  switch (playType) {
    case "groundball":
      return "Groundball";
    case "double-play":
      return "Double Play";
    case "bunt":
      return "Bunt Defense";
    case "cutoff":
      return "Cutoff / Relay";
    case "infield-in":
      return "Infield In";
    case "flyball":
      return "Flyball";
    case "steal-defense":
      return "Steal Defense";
    case "first-and-third-defense":
      return "1st-and-3rd Defense";
    case "rundown":
      return "Rundown";
    default:
      return playType;
  }
};

export const formatScenarioCountDe = (count: number) =>
  `${count} ${count === 1 ? "freigegebenes Szenario" : "freigegebene Szenarien"}`;

export const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");
