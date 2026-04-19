import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { resetSessionStoreForTests } from "../features/session/store";
import { LibraryScreen } from "./LibraryScreen";

describe("LibraryScreen", () => {
  beforeEach(() => {
    localStorage.clear();
    resetSessionStoreForTests();
  });

  it("shows all visible curriculum categories as immediate entry choices", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LibraryScreen />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("heading", { name: /Schneller Wiedereinstieg/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Wische für weitere Blöcke/i)).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Defensivfokus wählen/i })).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Infield Basics/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Double Plays/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Bunts/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Play at the Plate/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Cutoffs & Relays/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Pop-Ups & Priority/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Spezial-Defenses/i }),
    ).toBeInTheDocument();
  });
});
