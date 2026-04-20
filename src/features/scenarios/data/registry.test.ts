import { scenarioRegistry } from "./registry";
import { foulLineAnchors, baseAnchors } from "./fieldLayout";
import { fieldPoint as p } from "./fieldCoordinates";
import { getTrackPointAtTime } from "../../animation/timeline";

const leftFoulLineXAtY = (y: number) => {
  const t = (y - baseAnchors.home.y) / (foulLineAnchors.left.y - baseAnchors.home.y);
  return baseAnchors.home.x + (foulLineAnchors.left.x - baseAnchors.home.x) * t;
};

const rightFoulLineXAtY = (y: number) => {
  const t = (y - baseAnchors.home.y) / (foulLineAnchors.right.y - baseAnchors.home.y);
  return baseAnchors.home.x + (foulLineAnchors.right.x - baseAnchors.home.x) * t;
};

describe("scenarioRegistry", () => {
  it("contains the implemented curriculum scenarios in document order", () => {
    expect(scenarioRegistry).toHaveLength(36);
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
      "runner-on-first-steal-second-cover",
      "runners-on-first-third-hold-defense",
      "runners-on-first-third-break-play",
      "rundown-third-home",
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
    const firstThrowArrivalMs = throwEvents?.[0]
      ? throwEvents[0].startMs + throwEvents[0].durationMs
      : undefined;

    expect(catcher?.throwPriority).toEqual(["1B", "Ball sichern"]);
    expect(backupPositions).toEqual(["P", "LF", "RF", "CF"]);
    expect(throwEvents?.map((event) => event.toActor)).toEqual(["C", "1B"]);
    expect(homeArrivalFrame?.atMs).toBe(firstThrowArrivalMs);
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
    const centerFieldTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "CF");
    const catchPoint = centerFieldTrack ? getTrackPointAtTime(centerFieldTrack, 1800) : undefined;
    const releasePoint =
      centerFieldTrack && throwEvent
        ? getTrackPointAtTime(centerFieldTrack, throwEvent.startMs)
        : undefined;

    expect(coverPositions).toEqual(["SS", "C", "3B"]);
    expect(throwEvent?.toActor).toBe("SS");
    expect(releasePoint?.y).toBeGreaterThanOrEqual(catchPoint?.y ?? Number.NEGATIVE_INFINITY);
    expect(runnerOnThirdTrack?.keyframes.at(-1)?.visible).not.toBe(false);
  });

  it("keeps shallow outfield releases moving through the ball and synced to the throw start", () => {
    const checks = [
      {
        id: "runner-on-third-shallow-left-fly-home-throw",
        fielder: "LF",
        pickupMs: 1800,
      },
      {
        id: "runner-on-second-left-single-cutoff-home",
        fielder: "LF",
        pickupMs: 1500,
      },
      {
        id: "runner-on-second-center-single-cutoff-home",
        fielder: "CF",
        pickupMs: 1500,
      },
      {
        id: "runner-on-second-right-single-cutoff-third-home",
        fielder: "RF",
        pickupMs: 1600,
      },
      {
        id: "runner-on-first-left-single-first-to-third",
        fielder: "LF",
        pickupMs: 1500,
      },
      {
        id: "runner-on-first-right-single-first-to-third",
        fielder: "RF",
        pickupMs: 1500,
      },
    ] as const;

    for (const check of checks) {
      const scenario = scenarioRegistry.find((entry) => entry.summary.id === check.id);
      const throwEvent = scenario?.animation.throwEvents[0];
      const fielderTrack = scenario?.animation.actorTracks.find(
        (track) => track.actorId === check.fielder,
      );
      const ballTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "BALL");
      const pickupPoint = fielderTrack
        ? getTrackPointAtTime(fielderTrack, check.pickupMs)
        : undefined;
      const releasePoint =
        fielderTrack && throwEvent
          ? getTrackPointAtTime(fielderTrack, throwEvent.startMs)
          : undefined;
      const ballReleaseFrame = ballTrack?.keyframes.find(
        (frame) => frame.atMs === throwEvent?.startMs,
      );

      expect(throwEvent?.fromActor).toBe(check.fielder);
      expect(releasePoint?.y).toBeGreaterThanOrEqual(pickupPoint?.y ?? Number.NEGATIVE_INFINITY);

      if (check.fielder === "LF") {
        expect(releasePoint?.x).toBeGreaterThan(pickupPoint?.x ?? Number.POSITIVE_INFINITY);
      } else if (check.fielder === "RF") {
        expect(releasePoint?.x).toBeLessThan(pickupPoint?.x ?? Number.NEGATIVE_INFINITY);
      } else {
        expect(releasePoint?.x).toBeCloseTo(pickupPoint?.x ?? Number.NaN);
      }

      expect(ballReleaseFrame).toMatchObject(releasePoint ?? {});
    }
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

  it("keeps the break play anchored in the SS return to home first", () => {
    const scenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "runners-on-first-third-break-play",
    );

    expect(scenario).not.toBeUndefined();

    const coverPositions = scenario?.covers.map((assignment) => assignment.position);
    const backupPositions = scenario?.backups.map((assignment) => assignment.position);
    const throwEvents = scenario?.animation.throwEvents;
    const runnerOnThirdTrack = scenario?.animation.actorTracks.find(
      (track) => track.actorId === "RUNNER_3",
    );

    expect(coverPositions).toEqual(["SS", "2B", "C", "3B", "P"]);
    expect(backupPositions).toEqual(["CF", "LF", "RF"]);
    expect(throwEvents?.map((event) => event.toActor)).toEqual(["SS", "C"]);
    expect(runnerOnThirdTrack?.keyframes.at(-1)?.visible).toBe(false);
  });

  it("keeps charging bunt corner infielders on the actual fair-territory pickup point", () => {
    const checks = [
      {
        id: "runner-on-first-bunt-third-base-side",
        fielder: "3B",
        pickupMs: 1700,
        pickupPoint: p(43.5, 73),
      },
      {
        id: "runner-on-first-bunt-first-base-side",
        fielder: "1B",
        pickupMs: 1700,
        pickupPoint: p(60, 73.5),
      },
      {
        id: "runners-on-first-second-sac-bunt-third-base-side",
        fielder: "3B",
        pickupMs: 1700,
        pickupPoint: p(43.5, 72.5),
      },
      {
        id: "runners-on-first-second-sac-bunt-first-base-side",
        fielder: "1B",
        pickupMs: 1700,
        pickupPoint: p(60, 73),
      },
      {
        id: "runner-on-third-suicide-squeeze-wheel-play",
        fielder: "3B",
        pickupMs: 1700,
        pickupPoint: p(43.5, 73),
      },
    ] as const;

    for (const check of checks) {
      const scenario = scenarioRegistry.find((entry) => entry.summary.id === check.id);
      const fielderTrack = scenario?.animation.actorTracks.find(
        (track) => track.actorId === check.fielder,
      );
      const ballTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "BALL");
      const fielderPickupPoint = fielderTrack
        ? getTrackPointAtTime(fielderTrack, check.pickupMs)
        : undefined;
      const ballPickupPoint = ballTrack
        ? getTrackPointAtTime(ballTrack, check.pickupMs)
        : undefined;

      expect(fielderPickupPoint).toMatchObject(check.pickupPoint);
      expect(ballPickupPoint).toMatchObject(check.pickupPoint);
    }
  });

  it("keeps bunt throws aligned with the documented transfer point before release", () => {
    const checks = [
      {
        id: "runner-on-first-bunt-third-base-side",
        thrower: "3B",
        releaseMs: 2600,
        releasePoint: p(48, 68),
      },
      {
        id: "runner-on-first-bunt-first-base-side",
        thrower: "1B",
        releaseMs: 2600,
        releasePoint: p(69, 67.5),
      },
      {
        id: "runners-on-first-second-sac-bunt-third-base-side",
        thrower: "3B",
        releaseMs: 2600,
        releasePoint: p(33, 67),
      },
      {
        id: "runners-on-first-second-sac-bunt-first-base-side",
        thrower: "1B",
        releaseMs: 2600,
        releasePoint: p(52, 68),
      },
      {
        id: "runner-on-third-suicide-squeeze-wheel-play",
        thrower: "3B",
        releaseMs: 2200,
        releasePoint: p(43.5, 73),
      },
    ] as const;

    for (const check of checks) {
      const scenario = scenarioRegistry.find((entry) => entry.summary.id === check.id);
      const throwEvent = scenario?.animation.throwEvents[0];
      const throwerTrack = scenario?.animation.actorTracks.find(
        (track) => track.actorId === check.thrower,
      );
      const ballTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "BALL");
      const throwerReleaseFrame = throwerTrack?.keyframes.find(
        (frame) => frame.atMs === check.releaseMs,
      );
      const ballReleaseFrame = ballTrack?.keyframes.find(
        (frame) => frame.atMs === check.releaseMs,
      );

      expect(throwEvent?.startMs).toBe(check.releaseMs);
      expect(throwerReleaseFrame).toMatchObject(check.releasePoint);
      expect(ballReleaseFrame).toMatchObject(check.releasePoint);
    }
  });

  it("keeps corner-bunt release moves flowing toward the correct throwing lane", () => {
    const checks = [
      {
        id: "runner-on-first-bunt-third-base-side",
        thrower: "3B",
        pickupMs: 1700,
        releaseMs: 2600,
        expectedXDirection: 1,
      },
      {
        id: "runner-on-first-bunt-first-base-side",
        thrower: "1B",
        pickupMs: 1700,
        releaseMs: 2600,
        expectedXDirection: 1,
      },
      {
        id: "runners-on-first-second-sac-bunt-third-base-side",
        thrower: "3B",
        pickupMs: 1700,
        releaseMs: 2600,
        expectedXDirection: -1,
      },
      {
        id: "runners-on-first-second-sac-bunt-first-base-side",
        thrower: "1B",
        pickupMs: 1700,
        releaseMs: 2600,
        expectedXDirection: -1,
      },
    ] as const;

    for (const check of checks) {
      const scenario = scenarioRegistry.find((entry) => entry.summary.id === check.id);
      const throwerTrack = scenario?.animation.actorTracks.find(
        (track) => track.actorId === check.thrower,
      );
      const pickupPoint = throwerTrack ? getTrackPointAtTime(throwerTrack, check.pickupMs) : undefined;
      const releasePoint = throwerTrack ? getTrackPointAtTime(throwerTrack, check.releaseMs) : undefined;

      expect(releasePoint).toBeDefined();
      expect(pickupPoint).toBeDefined();
      expect(Math.sign((releasePoint?.x ?? 0) - (pickupPoint?.x ?? 0))).toBe(check.expectedXDirection);
      expect((releasePoint?.y ?? 0)).toBeLessThan(pickupPoint?.y ?? Number.NEGATIVE_INFINITY);
    }
  });

  it("keeps bunt lead runners pressuring the next base on realistic timings", () => {
    const checks = [
      {
        id: "runner-on-first-bunt-third-base-side",
        actorId: "RUNNER_1",
        arriveMs: 4200,
        destination: baseAnchors.second,
      },
      {
        id: "runner-on-first-bunt-first-base-side",
        actorId: "RUNNER_1",
        arriveMs: 4200,
        destination: baseAnchors.second,
      },
      {
        id: "runners-on-first-second-sac-bunt-third-base-side",
        actorId: "RUNNER_2",
        arriveMs: 3300,
        destination: baseAnchors.third,
      },
      {
        id: "runners-on-first-second-sac-bunt-first-base-side",
        actorId: "RUNNER_2",
        arriveMs: 3300,
        destination: baseAnchors.third,
      },
      {
        id: "runner-on-third-safety-squeeze-defense",
        actorId: "RUNNER_3",
        arriveMs: 3000,
        destination: baseAnchors.home,
      },
      {
        id: "runner-on-third-suicide-squeeze-wheel-play",
        actorId: "RUNNER_3",
        arriveMs: 2800,
        destination: baseAnchors.home,
      },
    ] as const;

    for (const check of checks) {
      const scenario = scenarioRegistry.find((entry) => entry.summary.id === check.id);
      const runnerTrack = scenario?.animation.actorTracks.find(
        (track) => track.actorId === check.actorId,
      );
      const arrivalFrame = runnerTrack?.keyframes.find((frame) => frame.atMs === check.arriveMs);

      expect(arrivalFrame).toMatchObject(check.destination);
    }
  });

  it("keeps bunt lead-runner outs from resolving before the documented throw arrives", () => {
    const checks = [
      {
        id: "runners-on-first-second-sac-bunt-third-base-side",
        runnerId: "RUNNER_2",
      },
      {
        id: "runners-on-first-second-sac-bunt-first-base-side",
        runnerId: "RUNNER_2",
      },
      {
        id: "runner-on-third-safety-squeeze-defense",
        runnerId: "RUNNER_3",
      },
      {
        id: "runner-on-third-suicide-squeeze-wheel-play",
        runnerId: "RUNNER_3",
      },
    ] as const;

    for (const check of checks) {
      const scenario = scenarioRegistry.find((entry) => entry.summary.id === check.id);
      const runnerTrack = scenario?.animation.actorTracks.find(
        (track) => track.actorId === check.runnerId,
      );
      const throwEvent = scenario?.animation.throwEvents[0];
      const outFrame = runnerTrack?.keyframes.find((frame) => frame.visible === false);
      const throwArrivalMs = throwEvent ? throwEvent.startMs + throwEvent.durationMs : undefined;

      expect(outFrame?.atMs).toBeGreaterThanOrEqual(throwArrivalMs ?? Number.POSITIVE_INFINITY);
    }
  });

  it("treats the safety squeeze as a forward carry on the home line before the flip", () => {
    const scenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "runner-on-third-safety-squeeze-defense",
    );

    expect(scenario).not.toBeUndefined();

    const throwEvent = scenario?.animation.throwEvents[0];
    const pitcherTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "P");
    const pickupPoint = pitcherTrack ? getTrackPointAtTime(pitcherTrack, 1600) : undefined;
    const releasePoint =
      pitcherTrack && throwEvent ? getTrackPointAtTime(pitcherTrack, throwEvent.startMs) : undefined;

    expect(pickupPoint).toMatchObject(p(50, 74));
    expect(releasePoint?.x).toBe(50);
    expect(releasePoint?.y).toBeGreaterThan(pickupPoint?.y ?? Number.POSITIVE_INFINITY);
    expect(releasePoint?.y).toBeLessThan(p(50, 80).y);
  });

  it("sets the bases-loaded infield-in SS before the force throw and keeps the break-play SS on the home return line", () => {
    const homeFirstScenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "bases-loaded-infield-in",
    );
    const breakPlayScenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "runners-on-first-third-break-play",
    );

    const homeFirstShortstopTrack = homeFirstScenario?.animation.actorTracks.find(
      (track) => track.actorId === "SS",
    );
    const breakPlayShortstop = breakPlayScenario?.positions.find(
      (position) => position.position === "SS",
    );
    const breakPlayShortstopTrack = breakPlayScenario?.animation.actorTracks.find(
      (track) => track.actorId === "SS",
    );
    const homeThrow = homeFirstScenario?.animation.throwEvents[0];
    const breakReturnThrow = breakPlayScenario?.animation.throwEvents[1];

    expect(homeFirstShortstopTrack?.keyframes.find((frame) => frame.atMs === 1800)).toMatchObject(
      p(45, 57),
    );
    expect(homeThrow?.startMs).toBeGreaterThanOrEqual(1800);
    expect(breakPlayShortstop?.path.at(-1)).toMatchObject(p(49.5, 58));
    const breakReleasePoint =
      breakPlayShortstopTrack && breakReturnThrow
        ? getTrackPointAtTime(breakPlayShortstopTrack, breakReturnThrow.startMs)
        : undefined;

    expect(breakReleasePoint?.x).toBeGreaterThan(49);
  });

  it("starts the third-home rundown with the ball on the 3B-side rundown endpoint", () => {
    const scenario = scenarioRegistry.find(
      (entry) => entry.summary.id === "rundown-third-home",
    );
    const thirdBaseman = scenario?.positions.find((position) => position.position === "3B");
    const thirdBaseTrack = scenario?.animation.actorTracks.find(
      (track) => track.actorId === "3B",
    );
    const ballTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "BALL");

    expect(thirdBaseman?.start).toMatchObject(p(31, 63));
    expect(thirdBaseTrack?.keyframes[0]).toMatchObject(p(31, 63));
    expect(ballTrack?.keyframes[0]).toMatchObject(p(31, 63));
  });

  it("keeps directional bunt ball tracks inside the relevant foul line before fielding", () => {
    const checks = [
      {
        id: "runner-on-first-bunt-third-base-side",
        lane: "third",
      },
      {
        id: "runner-on-first-bunt-first-base-side",
        lane: "first",
      },
      {
        id: "runners-on-first-second-sac-bunt-third-base-side",
        lane: "third",
      },
      {
        id: "runners-on-first-second-sac-bunt-first-base-side",
        lane: "first",
      },
      {
        id: "runner-on-third-suicide-squeeze-wheel-play",
        lane: "third",
      },
    ] as const;

    for (const check of checks) {
      const scenario = scenarioRegistry.find((entry) => entry.summary.id === check.id);
      const ballTrack = scenario?.animation.actorTracks.find((track) => track.actorId === "BALL");
      const rollingFrames = ballTrack?.keyframes
        .filter((frame) => frame.visible !== false)
        .slice(1, 3);

      expect(rollingFrames).toHaveLength(2);

      for (const frame of rollingFrames ?? []) {
        if (check.lane === "third") {
          expect(frame.x).toBeGreaterThanOrEqual(leftFoulLineXAtY(frame.y));
        } else {
          expect(frame.x).toBeLessThanOrEqual(rightFoulLineXAtY(frame.y));
        }
      }
    }
  });

  it("keeps outfield-origin home plays in mid-depth rebound support instead of pulling corner outfielders to the plate", () => {
    const checks = [
      {
        id: "runner-on-third-shallow-left-fly-home-throw",
        positions: ["CF", "RF"] as const,
      },
      {
        id: "runner-on-third-medium-center-fly-cutoff-home",
        positions: ["LF", "RF"] as const,
      },
      {
        id: "runner-on-second-left-single-cutoff-home",
        positions: ["CF", "RF"] as const,
      },
      {
        id: "runner-on-second-center-single-cutoff-home",
        positions: ["LF", "RF"] as const,
      },
      {
        id: "runner-on-second-right-single-cutoff-third-home",
        positions: ["CF", "LF"] as const,
      },
    ];

    for (const check of checks) {
      const scenario = scenarioRegistry.find((entry) => entry.summary.id === check.id);

      expect(scenario).not.toBeUndefined();

      for (const positionId of check.positions) {
        const assignment = scenario?.positions.find(
          (position) => position.position === positionId,
        );
        const finalPoint = assignment?.path.at(-1);

        expect(finalPoint?.y).toBeLessThan(50);
      }
    }
  });

  it("keeps home-pressure infield plays and the third-home rundown on corner-base backup lanes instead of pulling outfielders to home", () => {
    const checks = [
      {
        id: "bases-loaded-middle-grounder-home-to-first",
      },
      {
        id: "runner-on-third-safety-squeeze-defense",
      },
      {
        id: "runner-on-third-suicide-squeeze-wheel-play",
      },
      {
        id: "runner-on-third-infield-in-grounder",
      },
      {
        id: "bases-loaded-infield-in",
      },
      {
        id: "rundown-third-home",
      },
    ];

    for (const check of checks) {
      const scenario = scenarioRegistry.find((entry) => entry.summary.id === check.id);

      expect(scenario).not.toBeUndefined();
      const leftFielder = scenario?.positions.find((position) => position.position === "LF");
      const centerFielder = scenario?.positions.find((position) => position.position === "CF");
      const rightFielder = scenario?.positions.find((position) => position.position === "RF");

      expect(leftFielder?.path.at(-1)?.x).toBe(18);
      expect(leftFielder?.path.at(-1)?.y).toBeGreaterThanOrEqual(60);
      expect(leftFielder?.path.at(-1)?.y).toBeLessThan(80);

      expect(centerFielder?.path.at(-1)?.x).toBe(50);
      expect(centerFielder?.path.at(-1)?.y).toBeLessThan(40);

      expect(rightFielder?.path.at(-1)?.x).toBe(82);
      expect(rightFielder?.path.at(-1)?.y).toBeGreaterThanOrEqual(60);
      expect(rightFielder?.path.at(-1)?.y).toBeLessThan(80);
    }
  });
});
