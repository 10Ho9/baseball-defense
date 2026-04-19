import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getScenarioById } from "../scenarios/data/registry";
import { resetSessionStoreForTests } from "../session/store";
import { QuizPanel } from "./QuizPanel";

describe("QuizPanel", () => {
  beforeEach(() => {
    localStorage.clear();
    resetSessionStoreForTests();
  });

  it("reveals feedback and advances to the next prompt", async () => {
    const user = userEvent.setup();
    const scenario = getScenarioById("bases-empty-ss-routine-grounder");

    if (!scenario) {
      throw new Error("Scenario not found");
    }

    render(<QuizPanel scenario={scenario} />);

    await user.click(screen.getByRole("button", { name: /B Zum Ball arbeiten/i }));

    expect(
      screen.getByText(/Der SS soll den Groundball frontal fielden und erst dann sauber die Füße für den Wurf setzen/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Nächste Frage/i }));

    expect(
      screen.getByRole("heading", { name: /Wohin geht der erste Wurf in diesem Team-Call/i }),
    ).toBeInTheDocument();
  });
});
