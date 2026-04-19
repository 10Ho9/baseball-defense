import { expect, test } from "@playwright/test";

test.describe("Defense trainer smoke flow", () => {
  test("shows category-based entry on the home screen", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Defensivfokus wählen." }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Infield Basics/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Double Plays/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Spezial-Defenses/i }),
    ).toBeVisible();
  });

  test("shows the scenario list inside a category", async ({ page }) => {
    await page.goto("/k/basic-infield-routines");

    await expect(
      page.getByRole("heading", { name: "Infield Basics" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Keine Läufer, Routine-Grounder zum SS/i }),
    ).toBeVisible();
  });

  test("opens a scenario detail screen and switches to position mode", async ({ page }) => {
    await page.goto("/s/bases-empty-ss-routine-grounder");

    await expect(page.getByRole("button", { name: "Ablauf" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Position" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Quiz/i })).toHaveCount(0);

    await page.getByRole("button", { name: "SS", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: "Shortstop" }),
    ).toBeVisible();
    await expect(page.getByText(/Wurfplan/i)).toBeVisible();
  });

  test("lands on the animation focus after opening a scenario from a category", async ({ page }) => {
    await page.goto("/k/basic-infield-routines");
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page
      .getByRole("link", { name: /Keine Läufer, Slow Roller vor 1B mit P-Cover/i })
      .click();

    await expect(page).toHaveURL(/\/s\/bases-empty-1b-slow-roller-p-cover$/);
    await expect(page.getByLabel(/Animation starten|Animation fortsetzen|Animation erneut abspielen/i)).toBeVisible();

    const focusTop = await page
      .getByTestId("trainer-animation-focus")
      .evaluate((element) => Math.round(element.getBoundingClientRect().top));

    expect(focusTop).toBeGreaterThanOrEqual(0);
    expect(focusTop).toBeLessThan(40);
  });
});
