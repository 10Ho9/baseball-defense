import { render, screen } from "@testing-library/react";
import { getScenarioById } from "../data/registry";
import { PositionSheet } from "./PositionSheet";

describe("PositionSheet", () => {
  it("shows an empty state before a position is selected", () => {
    const scenario = getScenarioById("runner-on-first-double-play-keystone");

    if (!scenario) {
      throw new Error("Scenario not found");
    }

    render(<PositionSheet scenario={scenario} selectedPositionId={null} />);

    expect(
      screen.getByText(/Tippe im Feld oder unten auf eine Position/i),
    ).toBeInTheDocument();
  });

  it("renders the selected position responsibilities", () => {
    const scenario = getScenarioById("runner-on-first-double-play-keystone");

    if (!scenario) {
      throw new Error("Scenario not found");
    }

    render(<PositionSheet scenario={scenario} selectedPositionId="SS" />);

    expect(screen.getByRole("heading", { name: /Shortstop/i })).toBeInTheDocument();
    expect(screen.getByText(/Force-Out an 2B treten und an 1B weiterwerfen/i)).toBeInTheDocument();
  });
});
