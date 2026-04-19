export const positionIds = [
  "P",
  "C",
  "1B",
  "2B",
  "3B",
  "SS",
  "LF",
  "CF",
  "RF",
] as const;

export type PositionId = (typeof positionIds)[number];
export const runnerActorIds = ["RUNNER_1", "RUNNER_2", "RUNNER_3"] as const;
export const offenseActorIds = [...runnerActorIds, "BATTER", "BATTER_RUNNER"] as const;

export type RunnerActorId = (typeof runnerActorIds)[number];
export type OffenseActorId = (typeof offenseActorIds)[number];
export type ActorId = PositionId | OffenseActorId | "BALL";

export const playTypes = [
  "groundball",
  "double-play",
  "bunt",
  "cutoff",
  "infield-in",
  "flyball",
] as const;

export type PlayType = (typeof playTypes)[number];

export type RunnerState = {
  first: boolean;
  second: boolean;
  third: boolean;
};

export type FieldPoint = {
  x: number;
  y: number;
};

export type ScenarioSummary = {
  id: string;
  titleDe: string;
  runners: RunnerState;
  outs: 0 | 1 | 2;
  playType: PlayType;
  ballDirectionDe: string;
};

export type PositionAssignment = {
  position: PositionId;
  labelDe: string;
  start: FieldPoint;
  path: FieldPoint[];
  prePitchAlignmentDe: string;
  firstStepDe: string;
  primaryResponsibilityDe: string;
  secondaryResponsibilityDe?: string;
  throwPriority: string[];
  commonMistakeDe?: string;
  communicationCueDe?: string;
};

export type SupportAssignment = {
  position: PositionId;
  targetDe: string;
  detailDe: string;
};

export type AnimationPhase = {
  labelDe: string;
  startMs: number;
  endMs: number;
};

export type AnimationKeyframe = FieldPoint & {
  atMs: number;
  visible?: boolean;
};

export type AnimationTrack = {
  actorId: ActorId;
  keyframes: AnimationKeyframe[];
};

export type ThrowEvent = {
  fromActor: ActorId;
  toActor: ActorId;
  startMs: number;
  durationMs: number;
  labelDe: string;
};

export type AnimationTimeline = {
  durationMs: number;
  phases: AnimationPhase[];
  actorTracks: AnimationTrack[];
  throwEvents: ThrowEvent[];
};

export type QuizOption = {
  key: string;
  textDe: string;
};

export type QuizPromptType = "move-first" | "throw-first";

export type QuizPrompt = {
  id: string;
  type: QuizPromptType;
  questionDe: string;
  optionsDe: QuizOption[];
  correctAnswerKey: string;
  explanationDe: string;
};

export type AcceptanceSeverity = "blocker" | "major" | "minor";

export type AcceptanceChecklistItem = {
  labelDe: string;
  expectedDe: string;
  severity: AcceptanceSeverity;
};

export type ScenarioDetail = {
  summary: ScenarioSummary;
  teamCallDe: string;
  objectiveDe: string;
  primaryOutTarget: string;
  fallbackOutTarget: string;
  positions: PositionAssignment[];
  covers: SupportAssignment[];
  backups: SupportAssignment[];
  animation: AnimationTimeline;
  quiz: QuizPrompt[];
  acceptanceChecklist: AcceptanceChecklistItem[];
};

export type CoachRequest = {
  scenarioId: string;
  selectedPosition: PositionId | null;
  question: string;
  locale: "de";
  context?: {
    activeMode?: "ablauf" | "position";
    latestQuizResult?: {
      correctCount: number;
      total: number;
    };
  };
};

export type CoachResponse = {
  answerDe: string;
  citedPositionIds: PositionId[];
  disclaimer?: string;
};
