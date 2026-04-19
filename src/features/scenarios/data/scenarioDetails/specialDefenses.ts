import type { ScenarioCategoryDetailGroup } from "../categoryTypes";
import type { ScenarioDetail } from "../types";

export const specialDefensesScenarioDetails: ScenarioDetail[] = [];

export const specialDefensesCategory: ScenarioCategoryDetailGroup = {
  category: {
    id: "special-defenses",
    order: 7,
    labelDe: "Spezial-Defenses",
    shortLabelDe: "Spezial-Defenses",
    focusLine: "Special alignments and surprise looks.",
  },
  scenarios: specialDefensesScenarioDetails,
};
