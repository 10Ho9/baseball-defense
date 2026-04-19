import { resetSessionStoreForTests, useSessionStore } from "./store";

describe("session store", () => {
  beforeEach(() => {
    localStorage.clear();
    resetSessionStoreForTests();
  });

  it("resets transient state when a new scenario is selected", () => {
    useSessionStore.getState().setSelectedPosition("SS");
    useSessionStore.getState().setPlaybackStatus("playing");
    useSessionStore.getState().setElapsedMs(1450);
    useSessionStore.getState().answerQuiz("q1", "A", true, 3);

    useSessionStore.getState().resetForScenario("bases-empty-ss-routine-grounder");

    const state = useSessionStore.getState();
    expect(state.selectedScenarioId).toBe("bases-empty-ss-routine-grounder");
    expect(state.selectedPositionId).toBeNull();
    expect(state.activeMode).toBe("ablauf");
    expect(state.playbackStatus).toBe("paused");
    expect(state.elapsedMs).toBe(0);
    expect(state.quizAnswers).toEqual({});
    expect(state.quizResult).toBeNull();
  });

  it("moves into position mode when a player is selected", () => {
    useSessionStore.getState().setSelectedPosition("SS");

    const state = useSessionStore.getState();
    expect(state.selectedPositionId).toBe("SS");
    expect(state.activeMode).toBe("position");
  });

  it("tracks quiz answers and result totals", () => {
    useSessionStore.getState().answerQuiz("q1", "A", true, 2);
    useSessionStore.getState().answerQuiz("q2", "B", false, 2);

    const state = useSessionStore.getState();
    expect(state.quizAnswers.q1).toEqual({ selectedKey: "A", isCorrect: true });
    expect(state.quizResult).toEqual({ correctCount: 1, total: 2 });
  });
});
