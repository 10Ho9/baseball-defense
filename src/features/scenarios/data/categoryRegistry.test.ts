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
      ["runner-on-first-double-play-keystone"],
      ["runner-on-first-bunt-third-base-side"],
      ["runner-on-third-infield-in-grounder"],
      ["runner-on-second-left-single-cutoff-home"],
      ["bases-empty-left-center-bloop"],
    ]);

    expect(getScenarioCategoryById("special-defenses")).toBeNull();
  });

  it("looks up categories from scenario ids and returns only implemented summaries", () => {
    expect(
      getScenarioCategoryForScenarioId("runner-on-first-bunt-third-base-side")?.labelDe,
    ).toBe("Bunts");

    expect(
      getScenarioSummariesByCategoryId("bunts-and-squeezes").map((scenario) => scenario.id),
    ).toEqual(["runner-on-first-bunt-third-base-side"]);

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
