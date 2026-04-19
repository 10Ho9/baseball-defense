import type { ScenarioCategorySummary } from "./categoryTypes";
import type { ScenarioSummary } from "./types";
import { scenarioMap } from "./registry";
import { scenarioCategoryDefinitions } from "./scenarioDetails";

export type { ScenarioCategorySummary } from "./categoryTypes";

export const scenarioCategorySummaryList = scenarioCategoryDefinitions
  .map((category) => ({
    ...category,
    scenarioIds: category.scenarioIds.filter((scenarioId) => scenarioMap.has(scenarioId)),
  }))
  .filter((category) => category.scenarioIds.length > 0);

const scenarioCategoryMap = new Map(
  scenarioCategorySummaryList.map((category) => [category.id, category]),
);

const scenarioToCategoryMap = new Map(
  scenarioCategorySummaryList.flatMap((category) =>
    category.scenarioIds.map((scenarioId) => [scenarioId, category.id] as const),
  ),
);

export const getScenarioCategoryById = (categoryId: string) =>
  scenarioCategoryMap.get(categoryId) ?? null;

export const getScenarioCategoryForScenarioId = (scenarioId: string) => {
  const categoryId = scenarioToCategoryMap.get(scenarioId);

  return categoryId ? getScenarioCategoryById(categoryId) : null;
};

export const getScenarioSummariesByCategoryId = (
  categoryId: string,
): ScenarioSummary[] => {
  const category = getScenarioCategoryById(categoryId);

  if (!category) {
    return [];
  }

  return category.scenarioIds.flatMap((scenarioId) => {
    const scenario = scenarioMap.get(scenarioId);

    return scenario ? [scenario.summary] : [];
  });
};
