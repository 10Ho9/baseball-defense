import { expect, test } from "@playwright/test";
import { scenarioCategorySummaryList } from "../src/features/scenarios/data/categoryRegistry";
import { scenarioRegistry } from "../src/features/scenarios/data/registry";
import { positionLabelsDe } from "../src/lib/formatters";

test.describe("Full scenario catalog regression", () => {
  test("opens every visible category and shows all scenario cards", async ({ page }) => {
    for (const category of scenarioCategorySummaryList) {
      await page.goto(`/k/${category.id}`);

      await expect(
        page.getByRole("heading", { name: category.labelDe, exact: true }),
      ).toBeVisible();

      for (const scenarioId of category.scenarioIds) {
        const scenario = scenarioRegistry.find((entry) => entry.summary.id === scenarioId);

        expect(scenario).toBeDefined();

        await expect(
          page.getByRole("link", { name: new RegExp(scenario!.summary.titleDe, "i") }),
        ).toBeVisible();
      }
    }
  });

  test("opens every scenario route and completes the core learning flow", async ({ page }) => {
    for (const scenario of scenarioRegistry) {
      await page.goto(`/s/${scenario.summary.id}`);

      await expect(
        page.getByRole("heading", { name: scenario.summary.titleDe, exact: true }),
      ).toBeVisible();
      const teamCallRow = page.getByText("Team-Call", { exact: true }).locator("xpath=..");
      const primaryRow = page.getByText("Primäres Aus", { exact: true }).locator("xpath=..");
      const fallbackRow = page.getByText("Fallback", { exact: true }).locator("xpath=..");

      await expect(teamCallRow.getByText(scenario.teamCallDe, { exact: true })).toBeVisible();
      await expect(primaryRow.getByText(scenario.primaryOutTarget, { exact: true })).toBeVisible();
      await expect(fallbackRow.getByText(scenario.fallbackOutTarget, { exact: true })).toBeVisible();
      await expect(page.getByTestId("trainer-animation-focus")).toBeVisible();
      await expect(
        page.getByLabel(/Animation starten|Animation fortsetzen|Animation erneut abspielen|Animation pausieren/i),
      ).toBeVisible();

      const firstPosition = scenario.positions[0];
      await page.getByRole("button", { name: "Position" }).click();
      await page.getByRole("button", { name: firstPosition.position, exact: true }).click();

      await expect(
        page.getByRole("heading", {
          name: positionLabelsDe[firstPosition.position],
          exact: true,
        }),
      ).toBeVisible();
      await expect(page.getByText(/Wurfplan/i)).toBeVisible();

      await page.getByRole("button", { name: "Support" }).click();
      await expect(page.getByText("Cover", { exact: true })).toBeVisible();
      await expect(page.getByText("Backup", { exact: true })).toBeVisible();

      if (firstPosition.communicationCueDe) {
        await expect(page.getByText(firstPosition.communicationCueDe, { exact: true })).toBeVisible();
      }
    }
  });
});
