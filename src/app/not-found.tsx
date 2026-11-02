import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui";
import { primaryNav, QUOTE_CTA, quoteHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-32 pb-20" aria-labelledby="nf-title">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
      <div aria-hidden className="glow-brand pointer-events-none absolute top-1/4 left-1/2 h-[520px] w-[820px] -translate-x-1/2 opacity-70" />
      <div className="container-page relative">
        <p className="font-mono text-brand">&lt;404 /&gt;</p>
        <h1 id="nf-title" className="text-display mt-6 max-w-3xl">This page took a wrong turn.</h1>
        <p className="text-lead mt-6 max-w-xl text-fg-muted">
          The page you’re looking for doesn’t exist or may have moved. Here are some places to go instead.
        </p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <Button href="/">Back to home</Button>
          <Button href={quoteHref()} variant="secondary">{QUOTE_CTA}</Button>
        </div>
        <nav aria-label="Helpful links" className="mt-14 border-t border-line pt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group inline-flex items-center gap-2 text-fg-muted hover:text-fg">
                  {item.label} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
