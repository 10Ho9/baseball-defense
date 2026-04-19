import { PageShell } from "../components/PageShell";
import { scenarioCategorySummaryList } from "../features/scenarios/data/categoryRegistry";
import { ScenarioCategoryCard } from "../features/scenarios/ui/ScenarioCategoryCard";

export const LibraryScreen = () => {
  return (
    <PageShell>
      <section className="space-y-1.5">
        <h1 className="max-w-2xl font-display text-[1.95rem] font-semibold leading-[0.98] text-white sm:text-5xl">
          Defensivfokus wählen.
        </h1>
      </section>

      <section className="h-[calc(100svh-9rem)] sm:h-auto">
        <div className="grid h-full grid-cols-2 grid-rows-3 gap-3 sm:grid-cols-3 sm:grid-rows-2">
          {scenarioCategorySummaryList.map((category) => (
            <ScenarioCategoryCard key={category.id} category={category} className="h-full" />
          ))}
        </div>
      </section>
    </PageShell>
  );
};
