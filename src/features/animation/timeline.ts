import type {
  AnimationPhase,
  AnimationTrack,
  FieldPoint,
  ThrowEvent,
} from "../scenarios/data/types";

export type TrackPoint = FieldPoint & {
  visible: boolean;
};

const interpolate = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

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

      return {
        x: interpolate(current.x, next.x, progress),
        y: interpolate(current.y, next.y, progress),
        visible:
          progress >= 1 ? (next.visible ?? current.visible ?? true) : (current.visible ?? true),
      };
    }
  }

  return { x: lastFrame.x, y: lastFrame.y, visible: lastFrame.visible ?? true };
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
