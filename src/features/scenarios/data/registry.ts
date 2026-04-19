import { scenarioCollectionSchema } from "./schema";
import { scenarioDetails } from "./scenarios";

const parsed = scenarioCollectionSchema.parse(scenarioDetails);

export const scenarioRegistry = parsed;

export const scenarioSummaryList = scenarioRegistry.map((scenario) => scenario.summary);

export const scenarioMap = new Map(
  scenarioRegistry.map((scenario) => [scenario.summary.id, scenario]),
);

export const getScenarioById = (scenarioId: string) => scenarioMap.get(scenarioId) ?? null;
