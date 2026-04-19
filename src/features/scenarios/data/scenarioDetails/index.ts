import type {
  ScenarioCategoryDetailGroup,
  ScenarioCategorySummary,
} from "../categoryTypes";
import { basicInfieldRoutinesCategory } from "./basicInfieldRoutines";
import { buntsAndSqueezesCategory } from "./buntsAndSqueezes";
import { forceAndDoublePlaysCategory } from "./forceAndDoublePlays";
import { outfieldHitsCutoffsRelaysCategory } from "./outfieldHitsCutoffsRelays";
import { priorityAndFoulPopsCategory } from "./priorityAndFoulPops";
import { runPreventionAndTagUpsCategory } from "./runPreventionAndTagUps";
import { specialDefensesCategory } from "./specialDefenses";

export const scenarioCategoryGroups: ScenarioCategoryDetailGroup[] = [
  basicInfieldRoutinesCategory,
  forceAndDoublePlaysCategory,
  buntsAndSqueezesCategory,
  runPreventionAndTagUpsCategory,
  outfieldHitsCutoffsRelaysCategory,
  priorityAndFoulPopsCategory,
  specialDefensesCategory,
];

export const implementedScenarioDetails = scenarioCategoryGroups.flatMap(
  (group) => group.scenarios,
);

export const scenarioCategoryDefinitions: ScenarioCategorySummary[] =
  scenarioCategoryGroups.map(({ category, scenarios }) => ({
    ...category,
    scenarioIds: scenarios.map((scenario) => scenario.summary.id),
  }));
