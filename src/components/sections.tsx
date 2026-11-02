import Link from "next/link";
import Script from "next/script";
import type { CSSProperties, ReactNode } from "react";
import { processSteps } from "@/content/home";
import { type Project, projectImage } from "@/content/projects";
import { asset, QUOTE_CTA, quoteHref, site, whatsappLink } from "@/lib/site";
import { ArrowRight, ArrowUpRight, Plus, WhatsApp } from "./icons";
import { Button, Eyebrow } from "./ui";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/** Large alternating portfolio row with a hover-scroll page preview. */
export function ProjectShowcase({
  project,
  index,
  flip,
  headingLevel = 3,
}: {
  project: Project;
  index: number;
  flip?: boolean;
  headingLevel?: 2 | 3;
}) {
  const caseStudy = `/work/${project.slug}/`;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className={`relative min-w-0 lg:col-span-7 ${flip ? "lg:order-2" : ""}`} data-reveal>
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-0 opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
          style={{ background: `radial-gradient(closest-side, ${project.accent}55, transparent)` }}
        />
        <Link href={caseStudy} tabIndex={-1} aria-hidden className="relative block">
          <div className="browser-frame transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1">
            <div className="browser-frame__bar">
              <span />
              <span />
              <span />
              <span className="!h-auto !w-auto !bg-transparent ml-3 truncate font-mono text-[11px] text-fg-muted">
                {project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
            </div>
            <div className="scroll-preview bg-white">
              <img
                src={asset(projectImage(project.slug, "full.webp"))}
                alt=""
                loading="lazy"
                decoding="async"
                width={1200}
                height={2400}
              />
            </div>
          </div>
        </Link>
      </div>

      <div className={`relative min-w-0 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div data-reveal style={delay(80)}>
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-fg-muted">
            <span className="text-brand">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <span>{project.category}</span>
          </p>
          <Heading className="text-h2 mt-4 !text-[clamp(1.9rem,3.4vw,2.75rem)]">
            <Link href={caseStudy} className="hover:text-brand-bright transition-colors">
              {project.title}
            </Link>
          </Heading>
          <p className="mt-2 text-sm text-fg-muted">{project.industry}</p>
          <p className="mt-5 text-fg-muted">{project.cardDescription}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.slice(0, 5).map((t) => (
              <li key={t} className="chip">{t}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={caseStudy} variant="primary" size="sm" ariaLabel={`Case study: ${project.title}`}>
              Case study
            </Button>
            <Button href={project.liveUrl} variant="secondary" size="sm" icon="external" ariaLabel={`Live preview of ${project.title} (opens in a new tab)`}>
              Live preview
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Compact project card used on service pages and "next project" links. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-night-2 transition-colors hover:border-line-strong">
      <div className="overflow-hidden border-b border-line bg-white">
        <img
          src={asset(projectImage(project.slug, "desktop.webp"))}
          alt=""
          loading="lazy"
          decoding="async"
          width={1800}
          height={1125}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-brand">{project.category}</p>
        <h3 className="text-h3 mt-3">
          <Link href={`/work/${project.slug}/`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-fg-muted">{project.industry}</p>
        <p className="mt-4 text-fg-muted">{project.cardDescription}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand">
          View case study <ArrowRight size={16} />
        </span>
      </div>
    </article>
  );
}

export function FaqList({ items, tone = "dark" }: { items: { question: string; answer: string }[]; tone?: "dark" | "paper" }) {
  const line = tone === "paper" ? "border-paper-line" : "border-line";
  const muted = tone === "paper" ? "text-ink-muted" : "text-fg-muted";
  return (
    <div className={`border-t ${line}`}>
      {items.map((item, i) => (
        <details key={item.question} className={`faq-item border-b ${line}`} data-reveal style={delay(i * 40)}>
          <summary className="flex items-start justify-between gap-6 py-6">
            <h3 className="text-[1.1rem] font-semibold leading-snug tracking-tight sm:text-xl">{item.question}</h3>
            <span className={`faq-icon mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border ${line}`}>
              <Plus size={16} />
            </span>
          </summary>
          <p className={`-mt-1 max-w-3xl pb-7 pr-12 ${muted}`}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ProcessGrid() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {processSteps.map((step, i) => (
        <li key={step.number} className="relative bg-night p-7 sm:p-9" data-reveal style={delay(i * 60)}>
          <span className="font-mono text-sm text-brand">{step.number}</span>
          <h3 className="text-h3 mt-8">{step.title}</h3>
          <p className="mt-3 text-fg-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

/** Closing call to action used at the end of most pages. */
export function CtaSection({
  title = "Have a project in mind?",
  intro = "Tell me about your business and what you want to achieve. You’ll receive a free, no-obligation quotation tailored to your project.",
  service,
}: {
  title?: ReactNode;
  intro?: ReactNode;
  service?: string;
}) {
  return (
    <section className="section-y relative overflow-hidden" aria-labelledby="cta-title">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] border border-line-strong bg-night-2 px-6 py-16 sm:px-12 md:py-24">
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
          <svg
            aria-hidden
            className="pointer-events-none absolute -right-24 -bottom-24 h-[420px] w-[720px] opacity-80"
            viewBox="0 0 720 420"
            fill="none"
          >
            <defs>
              <linearGradient id="cta-orbit" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#2aa7ff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#2aa7ff" />
                <stop offset="1" stopColor="#0b63f6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <ellipse cx="380" cy="230" rx="330" ry="120" transform="rotate(-14 380 230)" stroke="url(#cta-orbit)" strokeWidth="2" />
          </svg>
          <div className="relative max-w-3xl">
            <div data-reveal>
              <Eyebrow>Let’s talk</Eyebrow>
            </div>
            <h2 id="cta-title" className="text-display mt-6 !text-[clamp(2.4rem,5.4vw,4.5rem)]" data-reveal style={delay(60)}>
              {title}
            </h2>
            <p className="text-lead mt-6 max-w-2xl text-fg-muted" data-reveal style={delay(120)}>
              {intro}
            </p>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row" data-reveal style={delay(180)}>
              <Button href={quoteHref(service)}>{QUOTE_CTA}</Button>
              <a href={whatsappLink("Hi Sultan, I’d like to discuss a website project.")} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <WhatsApp size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatsAppFloat() {
  return (
    <aside aria-label="Quick contact">
      <a
        href={whatsappLink("Hi Sultan, I found your website and would like to discuss a project.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sultan on WhatsApp (opens in a new tab)"
        className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#062a14] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6"
      >
        <WhatsApp size={26} />
      </a>
    </aside>
  );
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${className}`}>
      {children}
      <ArrowUpRight size={16} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all data is static and authored in this repo.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Google Analytics 4 — rendered only when NEXT_PUBLIC_GA_ID is configured. */
export function Analytics() {
  const id = site.analytics.gaId;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
