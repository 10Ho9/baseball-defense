import { scenarioRegistry } from "../src/features/scenarios/data/registry";
import { baseAnchors } from "../src/features/scenarios/data/fieldLayout";

const buntScenarioIds = [
  "runner-on-first-bunt-third-base-side",
  "runner-on-first-bunt-first-base-side",
  "runners-on-first-second-sac-bunt-third-base-side",
  "runners-on-first-second-sac-bunt-first-base-side",
  "runner-on-third-safety-squeeze-defense",
  "runner-on-third-suicide-squeeze-wheel-play",
] as const;

const leftLineXAtY = (y: number) => {
  const t = (y - baseAnchors.home.y) / (baseAnchors.third.y - baseAnchors.home.y);
  return baseAnchors.home.x + (baseAnchors.third.x - baseAnchors.home.x) * t;
};

const rightLineXAtY = (y: number) => {
  const t = (y - baseAnchors.home.y) / (baseAnchors.first.y - baseAnchors.home.y);
  return baseAnchors.home.x + (baseAnchors.first.x - baseAnchors.home.x) * t;
};

const results = buntScenarioIds.map((id) => {
  const scenario = scenarioRegistry.find((entry) => entry.summary.id === id);

  if (!scenario) {
    return { id, error: "scenario not found" };
  }

  const ballTrack = scenario.animation.actorTracks.find((track) => track.actorId === "BALL");

  if (!ballTrack) {
    return { id, error: "ball track not found" };
  }

  const lane =
    id.includes("first-base-side") ? "first" : id.includes("third-base-side") || id.includes("wheel") ? "third" : "middle";

  const samples = ballTrack.keyframes
    .filter((frame) => frame.visible !== false)
    .slice(1, Math.min(ballTrack.keyframes.length, 4))
    .map((frame) => {
      const leftBoundaryX = leftLineXAtY(frame.y);
      const rightBoundaryX = rightLineXAtY(frame.y);
      const inside =
        lane === "third"
          ? frame.x >= leftBoundaryX
          : lane === "first"
            ? frame.x <= rightBoundaryX
            : frame.x >= leftBoundaryX && frame.x <= rightBoundaryX;

      return {
        atMs: frame.atMs,
        x: Number(frame.x.toFixed(2)),
        y: Number(frame.y.toFixed(2)),
        leftBoundaryX: Number(leftBoundaryX.toFixed(2)),
        rightBoundaryX: Number(rightBoundaryX.toFixed(2)),
        inside,
      };
    });

  return { id, lane, samples };
});

console.log(JSON.stringify(results, null, 2));
