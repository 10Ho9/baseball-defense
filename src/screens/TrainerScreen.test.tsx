import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { resetSessionStoreForTests, useSessionStore } from "../features/session/store";
import { TrainerScreen } from "./TrainerScreen";

describe("TrainerScreen", () => {
  beforeEach(() => {
    localStorage.clear();
    resetSessionStoreForTests();
  });

  it("keeps the public detail flow on Ablauf and Position only", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={["/s/bases-empty-ss-routine-grounder"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/s/:scenarioId" element={<TrainerScreen />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: /Ablauf/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Position/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Quiz/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/QA Checklist/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "SS" }));

    expect(useSessionStore.getState().activeMode).toBe("position");
    expect(screen.getByRole("heading", { name: /Shortstop/i })).toBeInTheDocument();
  });

  it("scrolls the animation focus into view when a scenario detail opens", async () => {
    const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
    const scrollIntoView = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

    try {
      render(
        <MemoryRouter
          initialEntries={["/s/bases-empty-ss-routine-grounder"]}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/s/:scenarioId" element={<TrainerScreen />} />
          </Routes>
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(scrollIntoView).toHaveBeenCalledWith({ block: "start" });
      });
    } finally {
      window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    }
  });
});
