import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { CtaSection, FaqList, JsonLd, ProjectCard } from "@/components/sections";
import { Breadcrumbs, Button, Eyebrow, SectionHeader } from "@/components/ui";
import { projectsForService } from "@/content/projects";
import { getService, services } from "@/content/services";
import { breadcrumbSchema, businessId, faqSchema, pageMetadata } from "@/lib/seo";
import { absoluteUrl, QUOTE_CTA, quoteHref, site, whatsappLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seoTitle, description: service.seoDescription, path: `/services/${service.slug}/` });
}

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = projectsForService(service.slug);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28" aria-labelledby="service-title">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
        <div aria-hidden className="glow-brand pointer-events-none absolute -top-40 right-0 h-[560px] w-[800px] opacity-70" />
        <div className="container-page relative grid gap-12 lg:grid-cols-12">
          <div className="hero-in lg:col-span-8">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services/" }, { label: service.shortTitle }]} />
            <p className="eyebrow mt-10 text-brand">Service {service.number}</p>
            <h1 id="service-title" className="text-display mt-5 !text-[clamp(2.4rem,5.6vw,4.75rem)]">{service.title}</h1>
            <p className="text-lead mt-7 max-w-2xl text-fg-muted">{service.intro}</p>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row">
              <Button href={quoteHref(service.slug)}>{QUOTE_CTA}</Button>
              <a
                href={whatsappLink(`Hi Sultan, I’m interested in ${service.title.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Discuss on WhatsApp
              </a>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:pt-24" aria-label="Ideal for">
            <div className="rounded-2xl border border-line bg-night-2/80 p-7 backdrop-blur" data-reveal>
              <h2 className="eyebrow text-fg-muted">Ideal for</h2>
              <ul className="mt-5 space-y-3">
                {service.audience.map((a) => (
                  <li key={a} className="flex items-center gap-3">
                    <Check size={18} className="shrink-0 text-brand" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="paper section-y" aria-labelledby="what-title">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader index="01" eyebrow="What it is" title={<span id="what-title">{service.tagline}</span>} titleClassName="!text-[clamp(1.6rem,2.8vw,2.3rem)] !leading-[1.15]" />
            <p className="text-lead mt-6 text-ink-muted" data-reveal>{service.whatItIs}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="eyebrow text-brand-deep" data-reveal>Problems it solves</h2>
            <ul className="mt-6 border-t border-paper-line">
              {service.problems.map((p, i) => (
                <li key={p} className="flex gap-5 border-b border-paper-line py-5" data-reveal style={delay(i * 50)}>
                  <span className="font-mono text-sm text-brand-deep">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="deliverables-title">
        <div className="container-page">
          <SectionHeader index="02" eyebrow="Features & deliverables" title={<span id="deliverables-title">What’s included.</span>} intro="The exact scope is agreed in your proposal. These are the foundations most projects of this type include." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((d, i) => (
              <li key={d.title} className="bg-night p-7 sm:p-8" data-reveal style={delay((i % 3) * 60)}>
                <Check size={22} className="text-brand" />
                <h3 className="text-h3 mt-6 !text-xl">{d.title}</h3>
                <p className="mt-2 text-fg-muted">{d.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y border-y border-line bg-night-2" aria-labelledby="benefits-title">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader index="03" eyebrow="Benefits" title={<span id="benefits-title">What it does for your business.</span>} />
          </div>
          <ul className="space-y-10 lg:col-span-7">
            {service.benefits.map((b, i) => (
              <li key={b.title} className="border-t border-line-strong pt-6" data-reveal style={delay(i * 60)}>
                <h3 className="text-h3">{b.title}</h3>
                <p className="mt-2 text-lg text-fg-muted">{b.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="approach-title">
        <div className="container-page">
          <SectionHeader index="04" eyebrow="Approach" title={<span id="approach-title">How I approach it.</span>} />
          <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.approach.map((step, i) => (
              <li key={step.title} className="relative border-t border-brand/60 pt-6" data-reveal style={delay(i * 60)}>
                <span className="font-mono text-sm text-brand">Step {i + 1}</span>
                <h3 className="text-h3 mt-4 !text-xl">{step.title}</h3>
                <p className="mt-2 text-fg-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y pt-0" aria-labelledby="related-title">
        <div className="container-page">
          <SectionHeader index="05" eyebrow="Related work" title={<span id="related-title">{related.length ? "Projects in this area." : "See the quality of my work."}</span>} />
          {related.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <div key={p.slug} data-reveal>
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 max-w-2xl" data-reveal>
              <p className="text-lead text-fg-muted">
                There isn’t a public project for this service in the portfolio yet. You can still explore live websites
                and web applications I’ve built to judge the design and build quality.
              </p>
              <div className="mt-8">
                <Button href="/work/" variant="secondary">View all work</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="section-y pt-0" aria-labelledby="service-faq-title">
          <div className="container-page grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader index="06" eyebrow="FAQ" title={<span id="service-faq-title">Common questions.</span>} />
            </div>
            <div className="lg:col-span-8">
              <FaqList items={service.faqs} />
            </div>
          </div>
        </section>
      )}

      <CtaSection
        title={<>Let’s talk about your {service.shortTitle.toLowerCase().replace(/s$/, "")} project.</>}
        intro="Share a few details and you’ll receive a free, custom quotation — no fixed packages and no obligation."
        service={service.slug}
      />

      <nav aria-label="Other services" className="border-t border-line">
        <div className="container-page py-14">
          <Eyebrow>Other services</Eyebrow>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="group inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg">
                  {s.shortTitle} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: service.seoDescription,
          url: absoluteUrl(`/services/${service.slug}/`),
          provider: { "@id": businessId },
          areaServed: [
            { "@type": "City", name: site.serviceArea.city },
            { "@type": "Country", name: site.serviceArea.country },
          ],
        }}
      />
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
          { name: service.title, path: `/services/${service.slug}/` },
        ])}
      />
    </>
  );
}
