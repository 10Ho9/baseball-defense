import { useSessionStore } from "../session/store";
import type { ScenarioDetail } from "../scenarios/data/types";
import { cn } from "../../lib/formatters";

type QuizPanelProps = {
  scenario: ScenarioDetail;
};

export const QuizPanel = ({ scenario }: QuizPanelProps) => {
  const quizIndex = useSessionStore((state) => state.quizIndex);
  const quizAnswers = useSessionStore((state) => state.quizAnswers);
  const quizResult = useSessionStore((state) => state.quizResult);
  const answerQuiz = useSessionStore((state) => state.answerQuiz);
  const goToQuizIndex = useSessionStore((state) => state.goToQuizIndex);
  const resetQuiz = useSessionStore((state) => state.resetQuiz);

  const prompts = scenario.quiz;
  const prompt = prompts[quizIndex];
  const answerState = prompt ? quizAnswers[prompt.id] : undefined;
  const isComplete = quizIndex >= prompts.length;

  if (isComplete) {
    return (
      <div className="glass-panel rounded-[28px] border border-white/10 p-5 shadow-panel">
        <div className="text-xs uppercase tracking-[0.24em] text-clay-100">Quiz abgeschlossen</div>
        <h3 className="mt-2 font-display text-2xl font-semibold text-white">
          {quizResult?.correctCount ?? 0} / {prompts.length} richtig
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
          Die Antworten bleiben direkt mit demselben Szenario verknüpft. Wenn die Erklärung nicht
          mit deiner Erwartung übereinstimmt, ist das ein Signal für die PM/QA-Freigabe des Team-Calls.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetQuiz}
            className="rounded-full bg-clay-300 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-clay-200"
          >
            Quiz neu starten
          </button>
          <button
            type="button"
            onClick={() => goToQuizIndex(0)}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-field-100/50"
          >
            Erste Frage ansehen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-[28px] border border-white/10 p-5 shadow-panel">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-clay-100">
            Frage {quizIndex + 1} / {prompts.length}
          </div>
          <h3 className="mt-2 font-display text-2xl font-semibold text-white">
            {prompt.questionDe}
          </h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
          {prompt.type === "move-first" ? "Move First" : "Throw First"}
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        {prompt.optionsDe.map((option) => {
          const isSelected = answerState?.selectedKey === option.key;
          const isCorrect = prompt.correctAnswerKey === option.key;
          const shouldHighlightCorrect = Boolean(answerState) && isCorrect;
          const shouldHighlightWrong = Boolean(answerState) && isSelected && !isCorrect;

          return (
            <button
              key={option.key}
              type="button"
              onClick={() =>
                answerQuiz(
                  prompt.id,
                  option.key,
                  option.key === prompt.correctAnswerKey,
                  prompts.length,
                )
              }
              disabled={Boolean(answerState)}
              className={cn(
                "rounded-[24px] border px-4 py-4 text-left text-sm leading-6 transition",
                "disabled:cursor-default disabled:opacity-100",
                shouldHighlightCorrect
                  ? "border-field-100/50 bg-field-300/12 text-field-50"
                  : shouldHighlightWrong
                    ? "border-rose-300/40 bg-rose-300/10 text-rose-100"
                    : isSelected
                      ? "border-clay-200/40 bg-clay-300/15 text-clay-100"
                      : "border-white/10 bg-white/5 text-slate-100 hover:border-clay-200/35 hover:bg-white/10",
              )}
            >
              <span className="block text-xs uppercase tracking-[0.22em] text-slate-400">
                {option.key}
              </span>
              <span className="mt-2 block font-medium">{option.textDe}</span>
            </button>
          );
        })}
      </div>

      {answerState ? (
        <div className="mt-5 rounded-[24px] bg-navy-900/55 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-field-100">Erklärung</div>
          <p className="mt-3 text-sm leading-6 text-slate-100">{prompt.explanationDe}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => goToQuizIndex(quizIndex + 1)}
              className="rounded-full bg-clay-300 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-clay-200"
            >
              {quizIndex === prompts.length - 1 ? "Ergebnis sehen" : "Nächste Frage"}
            </button>
            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-field-100/50"
            >
              Quiz resetten
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
