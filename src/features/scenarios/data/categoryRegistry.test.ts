import {
  getScenarioCategoryById,
  getScenarioCategoryForScenarioId,
  getScenarioSummariesByCategoryId,
  scenarioCategorySummaryList,
} from "./categoryRegistry";

describe("scenarioCategoryRegistry", () => {
  it("groups the implemented scenarios into visible curriculum categories", () => {
    expect(scenarioCategorySummaryList.map((category) => category.id)).toEqual([
      "basic-infield-routines",
      "force-and-double-plays",
      "bunts-and-squeezes",
      "run-prevention-and-tag-ups",
      "outfield-hits-cutoffs-relays",
      "priority-and-foul-pops",
      "special-defenses",
    ]);

    expect(scenarioCategorySummaryList.map((category) => category.scenarioIds)).toEqual([
      [
        "bases-empty-ss-routine-grounder",
        "bases-empty-3b-routine-grounder",
        "bases-empty-2b-routine-grounder",
        "bases-empty-1b-routine-grounder",
        "bases-empty-3b-slow-roller-charge",
        "bases-empty-1b-slow-roller-p-cover",
      ],
      [
        "runner-on-first-double-play-keystone",
        "runner-on-first-ss-double-play-6-4-3",
        "runner-on-first-3b-double-play-5-4-3",
        "runner-on-first-1b-double-play-3-6-3",
        "runners-on-first-second-middle-grounder-force-third",
        "bases-loaded-middle-grounder-home-to-first",
      ],
      [
        "runner-on-first-bunt-third-base-side",
        "runner-on-first-bunt-first-base-side",
        "runners-on-first-second-sac-bunt-third-base-side",
        "runners-on-first-second-sac-bunt-first-base-side",
        "runner-on-third-safety-squeeze-defense",
        "runner-on-third-suicide-squeeze-wheel-play",
      ],
      [
        "runner-on-third-infield-in-grounder",
        "bases-loaded-infield-in",
        "runner-on-third-shallow-left-fly-home-throw",
        "runner-on-third-medium-center-fly-cutoff-home",
      ],
      [
        "runner-on-second-left-single-cutoff-home",
        "runner-on-second-center-single-cutoff-home",
        "runner-on-second-right-single-cutoff-third-home",
        "runner-on-first-left-single-first-to-third",
        "runner-on-first-right-single-first-to-third",
        "bases-empty-gap-double-relay-second",
      ],
      [
        "bases-empty-left-center-bloop",
        "bases-empty-right-center-bloop",
        "bases-empty-first-base-foul-pop",
        "bases-empty-third-base-foul-pop",
      ],
      [
        "runner-on-first-steal-second-cover",
        "runners-on-first-third-hold-defense",
        "runners-on-first-third-break-play",
        "rundown-third-home",
      ],
    ]);

    expect(getScenarioCategoryById("special-defenses")?.labelDe).toBe("Spezial-Defenses");
  });

  it("looks up categories from scenario ids and returns only implemented summaries", () => {
    expect(
      getScenarioCategoryForScenarioId("runner-on-first-bunt-third-base-side")?.labelDe,
    ).toBe("Bunts");

    expect(
      getScenarioSummariesByCategoryId("bunts-and-squeezes").map((scenario) => scenario.id),
    ).toEqual([
      "runner-on-first-bunt-third-base-side",
      "runner-on-first-bunt-first-base-side",
      "runners-on-first-second-sac-bunt-third-base-side",
      "runners-on-first-second-sac-bunt-first-base-side",
      "runner-on-third-safety-squeeze-defense",
      "runner-on-third-suicide-squeeze-wheel-play",
    ]);

    expect(
      getScenarioSummariesByCategoryId("force-and-double-plays").map((scenario) => scenario.id),
    ).toEqual([
      "runner-on-first-double-play-keystone",
      "runner-on-first-ss-double-play-6-4-3",
      "runner-on-first-3b-double-play-5-4-3",
      "runner-on-first-1b-double-play-3-6-3",
      "runners-on-first-second-middle-grounder-force-third",
      "bases-loaded-middle-grounder-home-to-first",
    ]);

    expect(
      getScenarioSummariesByCategoryId("run-prevention-and-tag-ups").map((scenario) => scenario.id),
    ).toEqual([
      "runner-on-third-infield-in-grounder",
      "bases-loaded-infield-in",
      "runner-on-third-shallow-left-fly-home-throw",
      "runner-on-third-medium-center-fly-cutoff-home",
    ]);

    expect(
      getScenarioSummariesByCategoryId("outfield-hits-cutoffs-relays").map((scenario) => scenario.id),
    ).toEqual([
      "runner-on-second-left-single-cutoff-home",
      "runner-on-second-center-single-cutoff-home",
      "runner-on-second-right-single-cutoff-third-home",
      "runner-on-first-left-single-first-to-third",
      "runner-on-first-right-single-first-to-third",
      "bases-empty-gap-double-relay-second",
    ]);

    expect(
      getScenarioSummariesByCategoryId("priority-and-foul-pops").map((scenario) => scenario.id),
    ).toEqual([
      "bases-empty-left-center-bloop",
      "bases-empty-right-center-bloop",
      "bases-empty-first-base-foul-pop",
      "bases-empty-third-base-foul-pop",
    ]);

    expect(
      getScenarioSummariesByCategoryId("special-defenses").map((scenario) => scenario.id),
    ).toEqual([
      "runner-on-first-steal-second-cover",
      "runners-on-first-third-hold-defense",
      "runners-on-first-third-break-play",
      "rundown-third-home",
    ]);

    expect(
      getScenarioSummariesByCategoryId("basic-infield-routines").map((scenario) => scenario.id),
    ).toEqual([
      "bases-empty-ss-routine-grounder",
      "bases-empty-3b-routine-grounder",
      "bases-empty-2b-routine-grounder",
      "bases-empty-1b-routine-grounder",
      "bases-empty-3b-slow-roller-charge",
      "bases-empty-1b-slow-roller-p-cover",
    ]);
  });
});
