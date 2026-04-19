import { scenarioRegistry } from "./registry";

describe("scenarioRegistry", () => {
  it("contains the implemented curriculum scenarios in document order", () => {
    expect(scenarioRegistry).toHaveLength(11);
    expect(scenarioRegistry.map((scenario) => scenario.summary.id)).toEqual([
      "bases-empty-ss-routine-grounder",
      "bases-empty-3b-routine-grounder",
      "bases-empty-2b-routine-grounder",
      "bases-empty-1b-routine-grounder",
      "bases-empty-3b-slow-roller-charge",
      "bases-empty-1b-slow-roller-p-cover",
      "runner-on-first-double-play-keystone",
      "runner-on-first-bunt-third-base-side",
      "runner-on-third-infield-in-grounder",
      "runner-on-second-left-single-cutoff-home",
      "bases-empty-left-center-bloop",
    ]);
  });

  it("keeps every scenario structurally complete for animation, roles, and quiz", () => {
    for (const scenario of scenarioRegistry) {
      expect(scenario.positions).toHaveLength(9);
      expect(scenario.covers.length).toBeGreaterThan(0);
      expect(scenario.backups.length).toBeGreaterThan(0);
      expect(scenario.quiz.length).toBeGreaterThanOrEqual(2);
      expect(scenario.animation.actorTracks.some((track) => track.actorId === "BALL")).toBe(true);
      expect(scenario.animation.phases.length).toBeGreaterThanOrEqual(1);
      expect(scenario.acceptanceChecklist).toHaveLength(6);
    }
  });

  it("keeps the bases-empty SS routine grounded in the safe out at 1B", () => {
    const scenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "bases-empty-ss-routine-grounder",
    );

    expect(scenario).not.toBeUndefined();

    const secondBase = scenario?.positions.find((assignment) => assignment.position === "2B");
    const backupPositions = scenario?.backups.map((assignment) => assignment.position);
    const throwEvent = scenario?.animation.throwEvents[0];
    const ballTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "BALL");
    const ballArrivalFrame = ballTrack?.keyframes.filter((frame) => frame.visible !== false).at(-1);

    expect(secondBase?.throwPriority).toEqual(["1B", "Sonst Ball sichern"]);
    expect(backupPositions).toEqual(["P", "LF", "CF", "RF"]);
    expect(ballArrivalFrame?.atMs).toBe(throwEvent?.startMs ? throwEvent.startMs + throwEvent.durationMs : undefined);
  });
});
