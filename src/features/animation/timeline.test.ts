import { getActiveThrowEvents, getThrowProgress, getTrackPointAtTime } from "./timeline";

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
});
