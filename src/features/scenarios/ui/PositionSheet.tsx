import { useEffect, useState } from "react";
import { positionLabelsDe } from "../../../lib/formatters";
import type { PositionId, ScenarioDetail } from "../data/types";

type PositionSheetProps = {
  scenario: ScenarioDetail;
  selectedPositionId: PositionId | null;
};

export const PositionSheet = ({
  scenario,
  selectedPositionId,
}: PositionSheetProps) => {
  const [activeSection, setActiveSection] = useState<"role" | "support">("role");

  useEffect(() => {
    setActiveSection("role");
  }, [selectedPositionId]);

  const selectedPosition = scenario.positions.find(
    (assignment) => assignment.position === selectedPositionId,
  );

  if (!selectedPosition) {
    return (
      <div className="glass-panel rounded-[28px] border border-dashed border-white/15 p-5 text-sm text-slate-300">
        Tippe im Feld oder unten auf eine Position, um Rolle und Support im Detail zu sehen.
      </div>
    );
  }

  const positionCovers = scenario.covers.filter(
    (supportAssignment) => supportAssignment.position === selectedPosition.position,
  );
  const positionBackups = scenario.backups.filter(
    (supportAssignment) => supportAssignment.position === selectedPosition.position,
  );

  return (
    <div className="glass-panel rounded-[28px] border border-white/10 p-4 shadow-panel">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-clay-100">Position</div>
          <h3 className="mt-1.5 font-display text-[1.7rem] font-semibold text-white">
            {positionLabelsDe[selectedPosition.position]}
          </h3>
        </div>
        <span className="rounded-full bg-field-300/15 px-3 py-1 text-sm font-semibold text-field-100">
          {selectedPosition.position}
        </span>
      </div>

      <div className="mt-4 rounded-[22px] bg-white/5 p-1">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveSection("role")}
            className={
              activeSection === "role"
                ? "min-h-[2.75rem] rounded-[18px] bg-clay-300 px-3 py-2 text-sm font-semibold text-navy-900 shadow-[0_10px_24px_rgba(219,160,111,0.28)]"
                : "min-h-[2.75rem] rounded-[18px] bg-transparent px-3 py-2 text-sm font-semibold text-slate-300"
            }
          >
            Rolle
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("support")}
            className={
              activeSection === "support"
                ? "min-h-[2.75rem] rounded-[18px] bg-clay-300 px-3 py-2 text-sm font-semibold text-navy-900 shadow-[0_10px_24px_rgba(219,160,111,0.28)]"
                : "min-h-[2.75rem] rounded-[18px] bg-transparent px-3 py-2 text-sm font-semibold text-slate-300"
            }
          >
            Support
          </button>
        </div>
      </div>

      {activeSection === "role" ? (
        <div className="mt-4 space-y-3">
          <DetailCard
            title="Rolle"
            accent={selectedPosition.position}
            rows={[
              {
                label: "Erster Schritt",
                value: selectedPosition.firstStepDe,
              },
              {
                label: "Aufgabe",
                value: selectedPosition.primaryResponsibilityDe,
              },
            ]}
          />
          <div className="rounded-[24px] bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Wurfplan</div>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Wenn Ball kontrolliert
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedPosition.throwPriority.map((throwPriority) => (
                <span
                  key={throwPriority}
                  className="rounded-full border border-clay-200/25 bg-clay-300/10 px-3 py-2 text-sm font-medium text-clay-100"
                >
                  {throwPriority}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <SupportCard
            cue={selectedPosition.communicationCueDe}
            covers={positionCovers.map((item) => `${item.targetDe}: ${item.detailDe}`)}
            backups={positionBackups.map((item) => `${item.targetDe}: ${item.detailDe}`)}
          />
          <ListCard
            title="Häufiger Fehler"
            emptyLabel="Kein spezieller Fehlerhinweis"
            items={selectedPosition.commonMistakeDe ? [selectedPosition.commonMistakeDe] : []}
          />
        </div>
      )}
    </div>
  );
};

const DetailCard = ({
  title,
  accent,
  rows,
}: {
  title: string;
  accent?: string;
  rows: Array<{ label: string; value: string }>;
}) => (
  <div className="rounded-[24px] bg-white/5 p-4">
    <div className="flex items-center justify-between gap-3">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{title}</div>
      {accent ? (
        <span className="rounded-full bg-field-300/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-field-100">
          {accent}
        </span>
      ) : null}
    </div>
    <div className="mt-3 space-y-2.5">
      {rows.map((row) => (
        <div key={row.label} className="rounded-[18px] bg-navy-900/40 px-3 py-3">
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{row.label}</div>
          <p className="mt-2 text-sm leading-5 text-slate-100">{row.value}</p>
        </div>
      ))}
    </div>
  </div>
);

const SupportCard = ({
  cue,
  covers,
  backups,
}: {
  cue?: string;
  covers: string[];
  backups: string[];
}) => (
  <div className="rounded-[24px] bg-white/5 p-4">
    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Support</div>
    <div className="mt-3 space-y-2.5">
      {cue ? (
        <InfoRow label="Call" value={cue} />
      ) : null}
      <InfoRow
        label="Cover"
        value={covers.length > 0 ? covers.join(" / ") : "Kein extra Cover in diesem Team-Call"}
      />
      <InfoRow
        label="Backup"
        value={backups.length > 0 ? backups.join(" / ") : "Kein extra Backup in diesem Team-Call"}
      />
    </div>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-[18px] bg-navy-900/40 px-3 py-3">
    <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
    <p className="mt-2 text-sm leading-5 text-slate-100">{value}</p>
  </div>
);

const ListCard = ({
  title,
  items,
  emptyLabel,
}: {
  title: string;
  items: string[];
  emptyLabel: string;
}) => (
  <div className="rounded-[24px] bg-white/5 p-4">
    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{title}</div>
    <div className="mt-3 space-y-2 text-sm leading-5 text-slate-100">
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item} className="rounded-2xl bg-navy-900/40 px-3 py-3">
            {item}
          </div>
        ))
      ) : (
        <div className="rounded-2xl bg-navy-900/40 px-3 py-3 text-slate-400">{emptyLabel}</div>
      )}
    </div>
  </div>
);
