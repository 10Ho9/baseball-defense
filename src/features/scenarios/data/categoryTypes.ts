import type { ScenarioDetail } from "./types";

export type ScenarioCategorySummary = {
  id: string;
  order: number;
  labelDe: string;
  shortLabelDe: string;
  focusLine: string;
  scenarioIds: string[];
};

export type ScenarioCategoryDefinition = Omit<ScenarioCategorySummary, "scenarioIds">;

export type ScenarioCategoryDetailGroup = {
  category: ScenarioCategoryDefinition;
  scenarios: ScenarioDetail[];
};
