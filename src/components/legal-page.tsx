import type { ReactNode } from "react";
import { Breadcrumbs } from "./ui";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40" aria-labelledby="legal-title">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
          <h1 id="legal-title" className="text-display mt-8 !text-[clamp(2.4rem,5vw,4rem)]">{title}</h1>
          <p className="mt-5 text-fg-muted">Last updated: {updated}</p>
        </div>
      </section>
      <div className="paper section-y">
        <div className="container-page">
          <div className="prose-legal mx-auto max-w-3xl text-[1.05rem] leading-relaxed">{children}</div>
        </div>
      </div>
    </>
  );
}
