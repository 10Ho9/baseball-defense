import type {
  AnimationTrack,
  FieldPoint,
  PositionAssignment,
  PositionId,
  SupportAssignment,
} from "../types";
import { fieldPoint as p } from "../fieldCoordinates";
import {
  baseAnchors,
  defaultDefensiveStarts as STARTS,
  specialDefensiveStarts,
} from "../fieldLayout";

export { p, STARTS, specialDefensiveStarts };

export const HOME = baseAnchors.home;
export const FIRST_BASE = baseAnchors.first;
export const SECOND_BASE = baseAnchors.second;
export const THIRD_BASE = baseAnchors.third;
export const BATTER_BOX: FieldPoint = { x: 44.5, y: STARTS.C.y };
export const BATTER_LANE_ENTRY = p(54, 82.2);
export const HOME_RECEIVE_TARGET = p(50, 86.5);
export const HOME_BACKUP_ENTRY = p(50, 74);
export const HOME_BACKUP_SHALLOW = p(50, 72);
export const HOME_LINE_SHORT_BACKUP = p(50, 80);
export const HOME_DEEP_BACKUP = p(50, 90);
export const FIRST_BASE_BAG_TARGET = p(69, 63);
export const THIRD_BASE_BAG_TARGET = p(31, 63);
export const FIRST_BASE_FOUL_BACKUP = p(82, 68);
export const SECOND_BASE_COVER_TARGET = p(50.5, 44.5);
export const SECOND_BASE_DEEP_BACKUP = p(50, 36);
export const SHALLOW_CENTER_STOP = p(50, 34.5);
export const LEFT_HOME_LINE_BACKUP = p(39, 84);
export const RIGHT_HOME_LINE_BACKUP = p(61, 84);
export const LEFT_CENTER_PINCH = p(44, 30.5);
export const RIGHT_CENTER_PINCH = p(56, 30.5);
export const DOUBLE_PLAY_1B_START = specialDefensiveStarts.doublePlayFirstBase;
export const BUNT_1B_START = specialDefensiveStarts.buntFirstBase;
export const BUNT_3B_START = specialDefensiveStarts.buntThirdBase;
export const CUTOFF_3B_START = specialDefensiveStarts.cutoffThirdBase;

export const q = (
  id: string,
  type: "move-first" | "throw-first",
  questionDe: string,
  options: Array<[string, string]>,
  correctAnswerKey: string,
  explanationDe: string,
) => ({
  id,
  type,
  questionDe,
  optionsDe: options.map(([key, textDe]) => ({ key, textDe })),
  correctAnswerKey,
  explanationDe,
});

export const track = (
  actorId: AnimationTrack["actorId"],
  keyframes: Array<[number, FieldPoint, boolean?]>,
): AnimationTrack => ({
  actorId,
  keyframes: keyframes.map(([atMs, point, visible]) => ({
    atMs,
    x: point.x,
    y: point.y,
    visible,
  })),
});

export const batterTrack = (contactAtMs = 300): AnimationTrack =>
  track("BATTER", [
    [0, BATTER_BOX, true],
    [contactAtMs, BATTER_BOX, true],
    [contactAtMs + 1, BATTER_BOX, false],
  ]);

export const batterRunnerTrack = (
  keyframes: Array<[number, FieldPoint, boolean?]>,
): AnimationTrack =>
  track("BATTER_RUNNER", [
    [0, BATTER_BOX, false],
    [301, BATTER_BOX, true],
    [360, BATTER_LANE_ENTRY, true],
    ...keyframes,
  ]);

export const position = (
  positionId: PositionId,
  config: Omit<PositionAssignment, "position" | "start" | "labelDe"> & {
    labelDe?: string;
    start?: FieldPoint;
  },
): PositionAssignment => ({
  position: positionId,
  labelDe: config.labelDe ?? positionId,
  start: config.start ?? STARTS[positionId],
  path: config.path,
  prePitchAlignmentDe: config.prePitchAlignmentDe,
  firstStepDe: config.firstStepDe,
  primaryResponsibilityDe: config.primaryResponsibilityDe,
  secondaryResponsibilityDe: config.secondaryResponsibilityDe,
  throwPriority: config.throwPriority,
  commonMistakeDe: config.commonMistakeDe,
  communicationCueDe: config.communicationCueDe,
});

export const support = (
  positionId: PositionId,
  targetDe: string,
  detailDe: string,
): SupportAssignment => ({
  position: positionId,
  targetDe,
  detailDe,
});

export const backupBehindHome = (positionId: PositionId, detailDe: string) =>
  support(positionId, "Hinter Home", detailDe);

export const coverFirstBase = (positionId: PositionId, detailDe: string) =>
  support(positionId, "1B", detailDe);

export const coverHome = (positionId: PositionId, detailDe: string) =>
  support(positionId, "Home", detailDe);

export const coverSecondBase = (positionId: PositionId, detailDe: string) =>
  support(positionId, "2B", detailDe);

export const coverThirdBase = (positionId: PositionId, detailDe: string) =>
  support(positionId, "3B", detailDe);

export const backupFirstBaseLine = (positionId: PositionId, detailDe: string) =>
  support(positionId, "1B-Linie", detailDe);

export const backupThirdBaseLine = (positionId: PositionId, detailDe: string) =>
  support(positionId, "3B-Linie", detailDe);

export const backupSecondBaseDeep = (positionId: PositionId, detailDe: string) =>
  support(positionId, "2B tief", detailDe);

export const checklist = ({
  start,
  firstStep,
  cover,
  backup,
  throwPriority,
  fallback,
}: {
  start: string;
  firstStep: string;
  cover: string;
  backup: string;
  throwPriority: string;
  fallback: string;
}) => [
  { labelDe: "Startposition", expectedDe: start, severity: "blocker" as const },
  {
    labelDe: "Erster Schritt",
    expectedDe: firstStep,
    severity: "blocker" as const,
  },
  { labelDe: "Cover", expectedDe: cover, severity: "blocker" as const },
  { labelDe: "Backup", expectedDe: backup, severity: "blocker" as const },
  {
    labelDe: "Erste Wurfpriorität",
    expectedDe: throwPriority,
    severity: "blocker" as const,
  },
  {
    labelDe: "B-Plan",
    expectedDe: fallback,
    severity: "major" as const,
  },
];
