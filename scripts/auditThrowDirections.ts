import { getTrackPointAtTime } from "../src/features/animation/timeline";
import { scenarioRegistry } from "../src/features/scenarios/data/registry";

type Vector = {
  x: number;
  y: number;
};

const vec = (
  start: { x: number; y: number },
  end: { x: number; y: number },
): Vector => ({
  x: end.x - start.x,
  y: end.y - start.y,
});

const magnitude = (vector: Vector) => Math.hypot(vector.x, vector.y);

const angleBetween = (a: Vector, b: Vector) => {
  const magA = magnitude(a);
  const magB = magnitude(b);

  if (magA < 0.01 || magB < 0.01) {
    return null;
  }

  const cosine = Math.max(
    -1,
    Math.min(1, (a.x * b.x + a.y * b.y) / (magA * magB)),
  );

  return Math.round((Math.acos(cosine) * 180 * 10) / Math.PI) / 10;
};

const formatVector = (vector: Vector) =>
  `(${vector.x.toFixed(1)}, ${vector.y.toFixed(1)})`;

const report = scenarioRegistry.flatMap((scenario) =>
  scenario.animation.throwEvents.map((throwEvent) => {
    const fromTrack = scenario.animation.actorTracks.find(
      (track) => track.actorId === throwEvent.fromActor,
    );
    const toTrack = scenario.animation.actorTracks.find(
      (track) => track.actorId === throwEvent.toActor,
    );

    if (!fromTrack || !toTrack) {
      return null;
    }

    const releasePoint = getTrackPointAtTime(fromTrack, throwEvent.startMs);
    const prePoint = getTrackPointAtTime(fromTrack, Math.max(0, throwEvent.startMs - 200));
    const postPoint = getTrackPointAtTime(
      fromTrack,
      Math.min(
        scenario.animation.durationMs,
        throwEvent.startMs + Math.min(400, throwEvent.durationMs),
      ),
    );
    const targetPoint = getTrackPointAtTime(
      toTrack,
      throwEvent.startMs + throwEvent.durationMs,
    );

    const preVector = vec(prePoint, releasePoint);
    const throwVector = vec(releasePoint, targetPoint);
    const postVector = vec(releasePoint, postPoint);

    return {
      scenarioId: scenario.summary.id,
      fromActor: throwEvent.fromActor,
      toActor: throwEvent.toActor,
      preAngle: angleBetween(preVector, throwVector),
      postAngle: angleBetween(postVector, throwVector),
      preVector: formatVector(preVector),
      throwVector: formatVector(throwVector),
      postVector: formatVector(postVector),
    };
  }),
).filter(Boolean);

const suspicious = report.filter(
  (entry) =>
    entry &&
    ((entry.preAngle !== null && entry.preAngle > 100) ||
      (entry.postAngle !== null && entry.postAngle > 100)),
);

console.log(
  JSON.stringify(
    {
      totalThrows: report.length,
      suspiciousCount: suspicious.length,
      suspicious,
    },
    null,
    2,
  ),
);
