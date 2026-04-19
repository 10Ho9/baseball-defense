import { Link, useParams } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { useRecentScenarioId } from "../features/session/store";
import {
  getScenarioCategoryById,
  getScenarioSummariesByCategoryId,
} from "../features/scenarios/data/categoryRegistry";
import { ScenarioCard } from "../features/scenarios/ui/ScenarioCard";

export const CategoryScreen = () => {
  const { categoryId = "" } = useParams();
  const category = getScenarioCategoryById(categoryId);
  const recentScenarioId = useRecentScenarioId();

  if (!category) {
    return (
      <PageShell>
        <div className="glass-panel rounded-[32px] border border-white/10 p-6 text-slate-200">
          <div className="text-xs uppercase tracking-[0.24em] text-clay-100">Kategorie fehlt</div>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white">
            Diese Kategorie ist im MVP noch nicht freigegeben.
          </h1>
          <p className="mt-3 text-sm leading-6">
            Geh zurück zur Übersicht und wähle einen der sichtbaren Lernblöcke.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-full bg-clay-300 px-4 py-2 text-sm font-semibold text-navy-900"
          >
            Zur Übersicht
          </Link>
        </div>
      </PageShell>
    );
  }

  const scenarioSummaries = getScenarioSummariesByCategoryId(category.id);

  return (
    <PageShell>
      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/"
            className="inline-flex rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-slate-300 transition hover:border-field-100/50 hover:text-white"
          >
            Zur Übersicht
          </Link>
          <span className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-field-100">
            {scenarioSummaries.length} Szenario
          </span>
        </div>
        <div className="text-xs uppercase tracking-[0.32em] text-clay-100">Kategorie {category.order}</div>
        <h1 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
          {category.labelDe}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
          Freigegebenes Szenario wählen und direkt in Ablauf oder Position starten.
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">Szenarien</h2>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-field-100">
            Direkt startklar
          </span>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {scenarioSummaries.map((summary) => (
            <ScenarioCard
              key={summary.id}
              summary={summary}
              isRecent={summary.id === recentScenarioId}
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
};
