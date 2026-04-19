import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PositionId } from "../scenarios/data/types";

export type ActiveMode = "ablauf" | "position";
export type PlaybackStatus = "playing" | "paused";

export type QuizAnswerState = {
  selectedKey: string;
  isCorrect: boolean;
};

type SessionState = {
  recentScenarioId: string | null;
  selectedScenarioId: string | null;
  selectedPositionId: PositionId | null;
  activeMode: ActiveMode;
  playbackStatus: PlaybackStatus;
  elapsedMs: number;
  quizIndex: number;
  quizAnswers: Record<string, QuizAnswerState>;
  quizResult: {
    correctCount: number;
    total: number;
  } | null;
  resetForScenario: (scenarioId: string) => void;
  setSelectedPosition: (positionId: PositionId | null) => void;
  setActiveMode: (mode: ActiveMode) => void;
  setPlaybackStatus: (status: PlaybackStatus) => void;
  setElapsedMs: (value: number | ((current: number) => number)) => void;
  resetPlayback: () => void;
  answerQuiz: (
    promptId: string,
    selectedKey: string,
    isCorrect: boolean,
    total: number,
  ) => void;
  goToQuizIndex: (index: number) => void;
  resetQuiz: () => void;
};

export const sessionInitialState = {
  selectedScenarioId: null,
  selectedPositionId: null,
  activeMode: "ablauf" as ActiveMode,
  playbackStatus: "paused" as PlaybackStatus,
  elapsedMs: 0,
  quizIndex: 0,
  quizAnswers: {} as Record<string, QuizAnswerState>,
  quizResult: null as SessionState["quizResult"],
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      recentScenarioId: null,
      ...sessionInitialState,
      resetForScenario: (scenarioId) =>
        set(() => ({
          ...sessionInitialState,
          selectedScenarioId: scenarioId,
          recentScenarioId: scenarioId,
        })),
      setSelectedPosition: (selectedPositionId) =>
        set((state) => ({
          selectedPositionId,
          activeMode: selectedPositionId ? "position" : state.activeMode,
        })),
      setActiveMode: (activeMode) => set({ activeMode }),
      setPlaybackStatus: (playbackStatus) => set({ playbackStatus }),
      setElapsedMs: (value) =>
        set((state) => ({
          elapsedMs: typeof value === "function" ? value(state.elapsedMs) : value,
        })),
      resetPlayback: () =>
        set((state) => ({
          elapsedMs: 0,
          playbackStatus: state.playbackStatus === "playing" ? "paused" : state.playbackStatus,
        })),
      answerQuiz: (promptId, selectedKey, isCorrect, total) =>
        set((state) => {
          const quizAnswers = {
            ...state.quizAnswers,
            [promptId]: {
              selectedKey,
              isCorrect,
            },
          };
          const correctCount = Object.values(quizAnswers).filter(
            (answer) => answer.isCorrect,
          ).length;

          return {
            quizAnswers,
            quizResult: {
              correctCount,
              total,
            },
          };
        }),
      goToQuizIndex: (quizIndex) => set({ quizIndex }),
      resetQuiz: () => set({ quizIndex: 0, quizAnswers: {}, quizResult: null }),
    }),
    {
      name: "baseball-defense-trainer-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        recentScenarioId: state.recentScenarioId,
      }),
    },
  ),
);

export const useRecentScenarioId = () =>
  useSessionStore((state) => state.recentScenarioId ?? null);

export const getSessionSnapshot = () => useSessionStore.getState();

export const resetScenarioState = (scenarioId: string) =>
  useSessionStore.getState().resetForScenario(scenarioId);

export const setInitialScenarioIfNeeded = (scenarioId: string) => {
  const currentScenarioId = getSessionSnapshot().selectedScenarioId;

  if (currentScenarioId !== scenarioId) {
    resetScenarioState(scenarioId);
  }
};

export const resetSessionStoreForTests = () =>
  useSessionStore.setState({
    ...sessionInitialState,
    recentScenarioId: null,
  });
