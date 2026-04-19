import type { PropsWithChildren } from "react";

export const PageShell = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen bg-stadium-glow px-4 pb-8 pt-4 text-slate-50 sm:px-6 sm:pb-10 sm:pt-6">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 sm:gap-6">{children}</div>
  </div>
);
