import { z } from "zod";
import { offenseActorIds, playTypes, positionIds } from "./types";

const positionIdSchema = z.enum(positionIds);
const actorIdSchema = z.union([
  positionIdSchema,
  z.enum(offenseActorIds),
  z.literal("BALL"),
]);

const fieldPointSchema = z.object({
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
});

const runnersSchema = z.object({
  first: z.boolean(),
  second: z.boolean(),
  third: z.boolean(),
});

const scenarioSummarySchema = z.object({
  id: z.string().min(1),
  titleDe: z.string().min(1),
  runners: runnersSchema,
  outs: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  playType: z.enum(playTypes),
  ballDirectionDe: z.string().min(1),
});

const positionAssignmentSchema = z.object({
  position: positionIdSchema,
  labelDe: z.string().min(1),
  start: fieldPointSchema,
  path: z.array(fieldPointSchema),
  prePitchAlignmentDe: z.string().min(1),
  firstStepDe: z.string().min(1),
  primaryResponsibilityDe: z.string().min(1),
  secondaryResponsibilityDe: z.string().min(1).optional(),
  throwPriority: z.array(z.string().min(1)).min(1),
  commonMistakeDe: z.string().min(1).optional(),
  communicationCueDe: z.string().min(1).optional(),
});

const supportAssignmentSchema = z.object({
  position: positionIdSchema,
  targetDe: z.string().min(1),
  detailDe: z.string().min(1),
});

const animationPhaseSchema = z.object({
  labelDe: z.string().min(1),
  startMs: z.number().min(0),
  endMs: z.number().min(0),
});

const animationKeyframeSchema = fieldPointSchema.extend({
  atMs: z.number().min(0),
  visible: z.boolean().optional(),
});

const animationTrackSchema = z.object({
  actorId: actorIdSchema,
  keyframes: z.array(animationKeyframeSchema).min(2),
});

const throwEventSchema = z.object({
  fromActor: actorIdSchema,
  toActor: actorIdSchema,
  startMs: z.number().min(0),
  durationMs: z.number().positive(),
  labelDe: z.string().min(1),
});

const animationTimelineSchema = z.object({
  durationMs: z.number().positive(),
  phases: z.array(animationPhaseSchema).min(1),
  actorTracks: z.array(animationTrackSchema).min(1),
  throwEvents: z.array(throwEventSchema),
});

const quizOptionSchema = z.object({
  key: z.string().min(1),
  textDe: z.string().min(1),
});

const quizPromptSchema = z.object({
  id: z.string().min(1),
  type: z.union([z.literal("move-first"), z.literal("throw-first")]),
  questionDe: z.string().min(1),
  optionsDe: z.array(quizOptionSchema).min(2),
  correctAnswerKey: z.string().min(1),
  explanationDe: z.string().min(1),
});

const acceptanceChecklistItemSchema = z.object({
  labelDe: z.string().min(1),
  expectedDe: z.string().min(1),
  severity: z.union([
    z.literal("blocker"),
    z.literal("major"),
    z.literal("minor"),
  ]),
});

export const scenarioDetailSchema = z.object({
  summary: scenarioSummarySchema,
  teamCallDe: z.string().min(1),
  objectiveDe: z.string().min(1),
  primaryOutTarget: z.string().min(1),
  fallbackOutTarget: z.string().min(1),
  positions: z.array(positionAssignmentSchema).length(positionIds.length),
  covers: z.array(supportAssignmentSchema).min(1),
  backups: z.array(supportAssignmentSchema).min(1),
  animation: animationTimelineSchema,
  quiz: z.array(quizPromptSchema).min(2).max(3),
  acceptanceChecklist: z.array(acceptanceChecklistItemSchema).min(6),
});

export const scenarioCollectionSchema = z
  .array(scenarioDetailSchema)
  .superRefine((scenarios, ctx) => {
    const ids = new Set<string>();

    scenarios.forEach((scenario, index) => {
      const id = scenario.summary.id;
      if (ids.has(id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Scenario id '${id}' is duplicated`,
          path: [index, "summary", "id"],
        });
      }
      ids.add(id);

      scenario.animation.phases.forEach((phase, phaseIndex) => {
        if (phase.endMs <= phase.startMs) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Animation phase endMs must be greater than startMs",
            path: [index, "animation", "phases", phaseIndex],
          });
        }
      });

      scenario.animation.actorTracks.forEach((track, trackIndex) => {
        const hasAscendingFrames = track.keyframes.every((frame, framePos, array) => {
          if (framePos === 0) return true;
          return frame.atMs >= array[framePos - 1].atMs;
        });

        if (!hasAscendingFrames) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Keyframes must be sorted by atMs",
            path: [index, "animation", "actorTracks", trackIndex, "keyframes"],
          });
        }
      });
    });
  });
