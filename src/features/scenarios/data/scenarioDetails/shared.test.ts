import { describe, expect, it } from "vitest";

import { BATTER_BOX, batterRunnerTrack, p } from "./shared";

describe("scenario shared helpers", () => {
  it("starts batter-runner movement from the batter box without a forced lane jump", () => {
    const track = batterRunnerTrack([[420, p(57, 83), true]]);

    expect(track.keyframes).toEqual([
      { atMs: 0, x: BATTER_BOX.x, y: BATTER_BOX.y, visible: false },
      { atMs: 301, x: BATTER_BOX.x, y: BATTER_BOX.y, visible: true },
      { atMs: 420, x: p(57, 83).x, y: p(57, 83).y, visible: true },
    ]);
  });
});
