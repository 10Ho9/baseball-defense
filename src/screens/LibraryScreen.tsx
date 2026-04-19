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

      <section className="min-h-[calc(100svh-9rem)] sm:min-h-0">
        <div className="grid auto-rows-[minmax(8.95rem,1fr)] grid-cols-2 gap-3 sm:grid-cols-3">
          {scenarioCategorySummaryList.map((category) => (
            <ScenarioCategoryCard key={category.id} category={category} className="h-full" />
          ))}
        </div>
      </section>
    </PageShell>
  );
};
