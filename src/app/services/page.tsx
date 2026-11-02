import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "@/components/icons";
import { CtaSection, JsonLd, ProcessGrid } from "@/components/sections";
import { Button, PageHero, SectionHeader } from "@/components/ui";
import { services } from "@/content/services";
import { breadcrumbSchema, businessId, pageMetadata } from "@/lib/seo";
import { absoluteUrl, QUOTE_CTA, quoteHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Website Design & Development Services",
  description:
    "Business websites, web applications, e-commerce, redesigns, landing pages and maintenance — every project quoted individually. Based in Pune, India.",
  path: "/services/",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Digital solutions, <span className="text-brand">shaped around your business.</span>
          </>
        }
        intro="Whether you need your first website or a custom application, every project starts with your goals and ends with something your customers find easy to use. No fixed packages — each project receives its own quotation."
      >
        <Button href={quoteHref()}>{QUOTE_CTA}</Button>
      </PageHero>

      <section className="pb-24 md:pb-32" aria-label="All services">
        <div className="container-page">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.slug} className="bg-night" data-reveal style={delay((i % 2) * 80)}>
                <Link href={`/services/${s.slug}/`} className="group flex h-full flex-col p-8 transition-colors hover:bg-night-2 sm:p-10">
                  <span className="font-mono text-sm text-brand">{s.number}</span>
                  <h2 className="text-h3 mt-8 !text-2xl sm:!text-[1.75rem]">{s.title}</h2>
                  <p className="mt-4 text-fg-muted">{s.tagline}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Ideal for">
                    {s.audience.slice(0, 3).map((a) => (
                      <li key={a} className="chip">{a}</li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-brand">
                    Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="paper section-y" aria-labelledby="pricing-title">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="How pricing works"
              title={<span id="pricing-title">A custom quote, not a fixed package.</span>}
            />
          </div>
          <div className="text-lead space-y-5 text-ink-muted lg:col-span-6" data-reveal>
            <p>
              Two websites can look similar and still require very different amounts of work. Rather than forcing your
              project into a package, I quote for what you actually need.
            </p>
            <p>
              Share a few details about your business and goals. I’ll review them, ask any questions, and send a clear
              proposal with the scope, timeline and cost — free and without obligation.
            </p>
            <div className="pt-2">
              <Button href={quoteHref()}>{QUOTE_CTA}</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="process-title">
        <div className="container-page">
          <SectionHeader eyebrow="Process" title={<span id="process-title">How every project runs.</span>} />
          <div className="mt-14">
            <ProcessGrid />
          </div>
        </div>
      </section>

      <CtaSection />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Services",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              description: s.seoDescription,
              url: absoluteUrl(`/services/${s.slug}/`),
              provider: { "@id": businessId },
            },
          })),
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }])} />
    </>
  );
}
