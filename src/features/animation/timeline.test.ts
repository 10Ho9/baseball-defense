import {
  getActiveThrowEvents,
  getDisplayedActorPointAtTime,
  getThrowProgress,
  getTrackPointAtTime,
} from "./timeline";

describe("timeline helpers", () => {
  const track = {
    actorId: "SS" as const,
    keyframes: [
      { atMs: 0, x: 10, y: 10 },
      { atMs: 1000, x: 30, y: 30 },
      { atMs: 2000, x: 50, y: 30, visible: false },
    ],
  };

  it("interpolates actor positions between keyframes", () => {
    expect(getTrackPointAtTime(track, 500)).toEqual({
      x: 20,
      y: 20,
      visible: true,
    });
  });

  it("returns the final keyframe after the animation ends", () => {
    expect(getTrackPointAtTime(track, 2600)).toEqual({
      x: 50,
      y: 30,
      visible: false,
    });
  });

  it("keeps actors visible until a hidden keyframe is actually reached", () => {
    expect(getTrackPointAtTime(track, 1500)).toEqual({
      x: 40,
      y: 30,
      visible: true,
    });

    expect(getTrackPointAtTime(track, 2000)).toEqual({
      x: 50,
      y: 30,
      visible: false,
    });
  });

  it("finds active throw windows and progress", () => {
    const throwEvents = [
      {
        fromActor: "SS" as const,
        toActor: "1B" as const,
        startMs: 1000,
        durationMs: 1000,
        labelDe: "Wurf an 1B",
      },
    ];

    expect(getActiveThrowEvents(throwEvents, 1500)).toHaveLength(1);
    expect(getThrowProgress(throwEvents[0], 1500)).toBeCloseTo(0.5);
    expect(getActiveThrowEvents(throwEvents, 2100)).toHaveLength(0);
  });

  it("pins the throwing fielder to the release point while the throw is in flight", () => {
    const throwEvents = [
      {
        fromActor: "SS" as const,
        toActor: "1B" as const,
        startMs: 1000,
        durationMs: 1000,
        labelDe: "Wurf an 1B",
      },
    ];

    expect(getDisplayedActorPointAtTime(track, 1500, throwEvents)).toEqual({
      x: 30,
      y: 30,
      visible: true,
    });
    expect(getDisplayedActorPointAtTime(track, 2100, throwEvents)).toEqual({
      x: 50,
      y: 30,
      visible: false,
    });
  });

  it("routes runners across intermediate bases instead of cutting through the infield", () => {
    const runnerTrack = {
      actorId: "RUNNER_1" as const,
      keyframes: [
        { atMs: 0, x: 70, y: 64 },
        { atMs: 1000, x: 30, y: 64 },
      ],
    };

    const midpoint = getTrackPointAtTime(runnerTrack, 500);

    expect(midpoint.x).toBeCloseTo(50, 1);
    expect(midpoint.y).toBeLessThan(50);
    expect(midpoint.visible).toBe(true);
  });

  it("keeps runner advances on the basepath even with off-base lead keyframes", () => {
    const runnerTrack = {
      actorId: "RUNNER_1" as const,
      keyframes: [
        { atMs: 0, x: 58, y: 57 },
        { atMs: 1000, x: 46, y: 60 },
      ],
    };

    const midpoint = getTrackPointAtTime(runnerTrack, 500);

    expect(midpoint.x).toBeGreaterThan(45);
    expect(midpoint.x).toBeLessThan(55);
    expect(midpoint.y).toBeLessThan(60);
    expect(midpoint.visible).toBe(true);
  });
});
