import type {
  AnimationPhase,
  AnimationTrack,
  FieldPoint,
  ThrowEvent,
} from "../scenarios/data/types";
import { baseAnchors } from "../scenarios/data/fieldLayout";

export type TrackPoint = FieldPoint & {
  visible: boolean;
};

const OFFENSIVE_BASEPATH = [
  baseAnchors.home,
  baseAnchors.first,
  baseAnchors.second,
  baseAnchors.third,
  baseAnchors.home,
] as const;

const BASEPATH_SEGMENTS = OFFENSIVE_BASEPATH.slice(0, -1).map((start, index) => ({
  start,
  end: OFFENSIVE_BASEPATH[index + 1],
}));

const BASEPATH_LENGTHS = BASEPATH_SEGMENTS.map((segment) =>
  Math.hypot(segment.end.x - segment.start.x, segment.end.y - segment.start.y),
);

const TOTAL_BASEPATH_LENGTH = BASEPATH_LENGTHS.reduce(
  (total, length) => total + length,
  0,
);

const BASEPATH_DIRECTION_EPSILON = 0.001;

const interpolate = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const normalizeDistance = (distance: number) => {
  const normalized = distance % TOTAL_BASEPATH_LENGTH;
  return normalized < 0 ? normalized + TOTAL_BASEPATH_LENGTH : normalized;
};

const projectPointOntoBasepath = (point: FieldPoint) => {
  let bestProjection = {
    distanceAlongPath: 0,
    closestPoint: BASEPATH_SEGMENTS[0].start,
    distanceToPath: Number.POSITIVE_INFINITY,
  };

  let traversedDistance = 0;

  BASEPATH_SEGMENTS.forEach((segment, index) => {
    const dx = segment.end.x - segment.start.x;
    const dy = segment.end.y - segment.start.y;
    const segmentLength = BASEPATH_LENGTHS[index];
    const rawT =
      segmentLength === 0
        ? 0
        : ((point.x - segment.start.x) * dx + (point.y - segment.start.y) * dy) /
          (segmentLength * segmentLength);
    const t = clamp(rawT, 0, 1);
    const closestPoint = {
      x: segment.start.x + dx * t,
      y: segment.start.y + dy * t,
    };
    const distanceToPath = Math.hypot(point.x - closestPoint.x, point.y - closestPoint.y);

    if (distanceToPath < bestProjection.distanceToPath) {
      bestProjection = {
        distanceAlongPath: traversedDistance + segmentLength * t,
        closestPoint,
        distanceToPath,
      };
    }

    traversedDistance += segmentLength;
  });

  return bestProjection;
};

const getPointAtBasepathDistance = (distanceAlongPath: number): FieldPoint => {
  let remainingDistance = normalizeDistance(distanceAlongPath);

  for (let index = 0; index < BASEPATH_SEGMENTS.length; index += 1) {
    const segment = BASEPATH_SEGMENTS[index];
    const segmentLength = BASEPATH_LENGTHS[index];

    if (remainingDistance <= segmentLength || index === BASEPATH_SEGMENTS.length - 1) {
      const progress = segmentLength === 0 ? 0 : remainingDistance / segmentLength;
      return {
        x: interpolate(segment.start.x, segment.end.x, progress),
        y: interpolate(segment.start.y, segment.end.y, progress),
      };
    }

    remainingDistance -= segmentLength;
  }

  return BASEPATH_SEGMENTS[BASEPATH_SEGMENTS.length - 1].end;
};

const isBasepathRunner = (actorId: AnimationTrack["actorId"]) =>
  actorId.startsWith("RUNNER_");

const interpolateRunnerOnBasepath = (
  start: FieldPoint,
  end: FieldPoint,
  progress: number,
): FieldPoint | null => {
  const startProjection = projectPointOntoBasepath(start);
  const endProjection = projectPointOntoBasepath(end);

  const forwardDistance = normalizeDistance(
    endProjection.distanceAlongPath - startProjection.distanceAlongPath,
  );
  const backwardDistance = normalizeDistance(
    startProjection.distanceAlongPath - endProjection.distanceAlongPath,
  );

  const direction =
    forwardDistance <= backwardDistance + BASEPATH_DIRECTION_EPSILON ? 1 : -1;
  const traveledDistance =
    direction === 1 ? forwardDistance * progress : backwardDistance * progress;
  const currentDistance =
    direction === 1
      ? startProjection.distanceAlongPath + traveledDistance
      : startProjection.distanceAlongPath - traveledDistance;

  return getPointAtBasepathDistance(currentDistance);
};

export const getTrackPointAtTime = (
  track: AnimationTrack,
  elapsedMs: number,
): TrackPoint => {
  const frames = track.keyframes;

  if (elapsedMs <= frames[0].atMs) {
    return {
      x: frames[0].x,
      y: frames[0].y,
      visible: frames[0].visible ?? true,
    };
  }

  const lastFrame = frames[frames.length - 1];
  if (elapsedMs >= lastFrame.atMs) {
    return {
      x: lastFrame.x,
      y: lastFrame.y,
      visible: lastFrame.visible ?? true,
    };
  }

  for (let index = 0; index < frames.length - 1; index += 1) {
    const current = frames[index];
    const next = frames[index + 1];

    if (elapsedMs >= current.atMs && elapsedMs <= next.atMs) {
      const duration = next.atMs - current.atMs;
      const progress = duration === 0 ? 0 : (elapsedMs - current.atMs) / duration;
      const runnerPoint = isBasepathRunner(track.actorId)
        ? interpolateRunnerOnBasepath(current, next, progress)
        : null;

      return {
        x: runnerPoint?.x ?? interpolate(current.x, next.x, progress),
        y: runnerPoint?.y ?? interpolate(current.y, next.y, progress),
        visible:
          progress >= 1 ? (next.visible ?? current.visible ?? true) : (current.visible ?? true),
      };
    }
  }

  return { x: lastFrame.x, y: lastFrame.y, visible: lastFrame.visible ?? true };
};

export const getDisplayedActorPointAtTime = (
  track: AnimationTrack,
  elapsedMs: number,
  throwEvents: ThrowEvent[],
): TrackPoint => {
  const activeThrow = throwEvents.find(
    (event) =>
      event.fromActor === track.actorId &&
      elapsedMs >= event.startMs &&
      elapsedMs <= event.startMs + event.durationMs,
  );

  if (!activeThrow) {
    return getTrackPointAtTime(track, elapsedMs);
  }

  return getTrackPointAtTime(track, activeThrow.startMs);
};

export const getCurrentPhase = (
  phases: AnimationPhase[],
  elapsedMs: number,
): AnimationPhase => {
  const found = phases.find(
    (phase) => elapsedMs >= phase.startMs && elapsedMs <= phase.endMs,
  );

  return found ?? phases[phases.length - 1];
};

export const getActiveThrowEvents = (
  throwEvents: ThrowEvent[],
  elapsedMs: number,
) =>
  throwEvents.filter(
    (event) => elapsedMs >= event.startMs && elapsedMs <= event.startMs + event.durationMs,
  );

export const getThrowProgress = (throwEvent: ThrowEvent, elapsedMs: number) => {
  if (elapsedMs <= throwEvent.startMs) {
    return 0;
  }

  if (elapsedMs >= throwEvent.startMs + throwEvent.durationMs) {
    return 1;
  }

  return (elapsedMs - throwEvent.startMs) / throwEvent.durationMs;
};
