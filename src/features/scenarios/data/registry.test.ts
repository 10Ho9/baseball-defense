import { scenarioRegistry } from "./registry";

describe("scenarioRegistry", () => {
  it("contains the implemented curriculum scenarios in document order", () => {
    expect(scenarioRegistry).toHaveLength(32);
    expect(scenarioRegistry.map((scenario) => scenario.summary.id)).toEqual([
      "bases-empty-ss-routine-grounder",
      "bases-empty-3b-routine-grounder",
      "bases-empty-2b-routine-grounder",
      "bases-empty-1b-routine-grounder",
      "bases-empty-3b-slow-roller-charge",
      "bases-empty-1b-slow-roller-p-cover",
      "runner-on-first-double-play-keystone",
      "runner-on-first-ss-double-play-6-4-3",
      "runner-on-first-3b-double-play-5-4-3",
      "runner-on-first-1b-double-play-3-6-3",
      "runners-on-first-second-middle-grounder-force-third",
      "bases-loaded-middle-grounder-home-to-first",
      "runner-on-first-bunt-third-base-side",
      "runner-on-first-bunt-first-base-side",
      "runners-on-first-second-sac-bunt-third-base-side",
      "runners-on-first-second-sac-bunt-first-base-side",
      "runner-on-third-safety-squeeze-defense",
      "runner-on-third-suicide-squeeze-wheel-play",
      "runner-on-third-infield-in-grounder",
      "bases-loaded-infield-in",
      "runner-on-third-shallow-left-fly-home-throw",
      "runner-on-third-medium-center-fly-cutoff-home",
      "runner-on-second-left-single-cutoff-home",
      "runner-on-second-center-single-cutoff-home",
      "runner-on-second-right-single-cutoff-third-home",
      "runner-on-first-left-single-first-to-third",
      "runner-on-first-right-single-first-to-third",
      "bases-empty-gap-double-relay-second",
      "bases-empty-left-center-bloop",
      "bases-empty-right-center-bloop",
      "bases-empty-first-base-foul-pop",
      "bases-empty-third-base-foul-pop",
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

  it("keeps the bases-loaded middle grounder focused on the force at home first", () => {
    const scenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "bases-loaded-middle-grounder-home-to-first",
    );

    expect(scenario).not.toBeUndefined();

    const catcher = scenario?.positions.find((assignment) => assignment.position === "C");
    const backupPositions = scenario?.backups.map((assignment) => assignment.position);
    const throwEvents = scenario?.animation.throwEvents;
    const ballTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "BALL");
    const homeArrivalFrame = ballTrack?.keyframes.find((frame) => frame.atMs === 3100);

    expect(catcher?.throwPriority).toEqual(["1B", "Ball sichern"]);
    expect(backupPositions).toEqual(["P", "LF", "RF", "CF"]);
    expect(throwEvents?.map((event) => event.toActor)).toEqual(["C", "1B"]);
    expect(homeArrivalFrame?.atMs).toBe(throwEvents?.[0].startMs + throwEvents?.[0].durationMs);
  });

  it("keeps the suicide squeeze wheel play anchored in the wheel rotation to home", () => {
    const scenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "runner-on-third-suicide-squeeze-wheel-play",
    );

    expect(scenario).not.toBeUndefined();

    const coverPositions = scenario?.covers.map((assignment) => assignment.position);
    const backupPositions = scenario?.backups.map((assignment) => assignment.position);
    const throwEvent = scenario?.animation.throwEvents[0];

    expect(coverPositions).toEqual(["SS", "2B", "C"]);
    expect(backupPositions).toEqual(["LF", "RF", "CF"]);
    expect(throwEvent?.toActor).toBe("C");
  });

  it("keeps the medium center fly decision anchored in the SS cutoff hold", () => {
    const scenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "runner-on-third-medium-center-fly-cutoff-home",
    );

    expect(scenario).not.toBeUndefined();

    const coverPositions = scenario?.covers.map((assignment) => assignment.position);
    const runnerOnThirdTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "RUNNER_3");
    const throwEvent = scenario?.animation.throwEvents[0];

    expect(coverPositions).toEqual(["SS", "C", "3B"]);
    expect(throwEvent?.toActor).toBe("SS");
    expect(runnerOnThirdTrack?.keyframes.at(-1)?.visible).not.toBe(false);
  });

  it("keeps the right single relay anchored in the 1B cutoff and 3B stop", () => {
    const scenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "runner-on-second-right-single-cutoff-third-home",
    );

    expect(scenario).not.toBeUndefined();

    const coverPositions = scenario?.covers.map((assignment) => assignment.position);
    const throwEvent = scenario?.animation.throwEvents[0];
    const runnerTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "RUNNER_2");

    expect(coverPositions).toEqual(["1B", "3B", "2B", "C"]);
    expect(throwEvent?.toActor).toBe("1B");
    expect(runnerTrack?.keyframes.at(-1)?.visible).not.toBe(false);
  });

  it("keeps the first-base foul pop anchored in 1B priority with no forced throw", () => {
    const scenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "bases-empty-first-base-foul-pop",
    );

    expect(scenario).not.toBeUndefined();

    const coverPositions = scenario?.covers.map((assignment) => assignment.position);
    const backupPositions = scenario?.backups.map((assignment) => assignment.position);

    expect(coverPositions).toEqual(["1B", "C", "2B"]);
    expect(backupPositions).toEqual(["P", "RF", "CF", "LF"]);
    expect(scenario?.animation.throwEvents).toEqual([]);
  });
});
