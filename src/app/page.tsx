import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { CtaSection, FaqList, JsonLd, ProcessGrid, ProjectShowcase } from "@/components/sections";
import { Button, Eyebrow, SectionHeader } from "@/components/ui";
import { commitments, differentiators, homeFaqs, techGroups } from "@/content/home";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { faqSchema, pageMetadata } from "@/lib/seo";
import { asset, QUOTE_CTA, quoteHref, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${site.name} — Website Designer & Developer in Pune`,
  absoluteTitle: true,
  description:
    "Website designer and developer in Pune building fast, modern business websites and custom web applications for growing businesses. Request a free quote.",
  path: "/",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ServicesOverview />
      <WhyMe />
      <AboutIntro />
      <Process />
      <Technology />
      <Commitments />
      <Faq />
      <CtaSection />
      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28" aria-labelledby="hero-title">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
      <div aria-hidden className="glow-brand pointer-events-none absolute -top-32 right-[-10%] h-[640px] w-[820px] opacity-80" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="hero-in lg:col-span-7">
          <Eyebrow>Website Designer &amp; Developer · Pune, India</Eyebrow>
          <h1 id="hero-title" className="text-display mt-7">
            Websites that work as hard as <span className="text-brand">your business</span> does.
          </h1>
          <p className="text-lead mt-7 max-w-xl text-fg-muted">
            I’m {site.name}. From business websites to custom web applications, I design, build and test digital
            experiences that help growing businesses earn trust online — and turn visitors into customers.
          </p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            <Button href={quoteHref()}>{QUOTE_CTA}</Button>
            <Button href="/work/" variant="secondary">
              Explore My Work
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted">
            {["Custom quote for every project", "Mobile-first & fast", "Direct with the developer"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check size={16} className="text-brand" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none">
          <Portrait />
        </div>
      </div>

      <div className="container-page relative mt-20 lg:mt-28">
        <nav aria-label="Services shortcuts" className="border-t border-line pt-6">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="group flex items-baseline gap-2 text-sm text-fg-muted transition-colors hover:text-fg">
                  <span className="font-mono text-xs text-brand">{s.number}</span>
                  <span className="link-underline">{s.shortTitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

function Portrait() {
  return (
    <div className="relative">
      {/* Orbit echoing the ring in the logo */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        fill="none"
        className="pointer-events-none absolute top-1/2 left-1/2 z-20 w-[135%] -translate-x-1/2 -translate-y-[42%]"
      >
        <defs>
          <linearGradient id="hero-orbit" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#63c1ff" stopOpacity="0" />
            <stop offset="0.35" stopColor="#2aa7ff" />
            <stop offset="0.75" stopColor="#0b63f6" />
            <stop offset="1" stopColor="#0b63f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Front half of the ring only, so it appears to pass in front of the photo */}
        <path
          className="orbit-draw"
          pathLength={1}
          d="M40 380 C 120 470, 420 470, 560 300"
          stroke="url(#hero-orbit)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <svg aria-hidden viewBox="0 0 60 60" className="absolute -top-6 -right-2 z-20 w-14 text-brand sm:-right-6">
        <rect x="34" y="0" width="10" height="10" fill="currentColor" />
        <rect x="50" y="6" width="7" height="7" fill="currentColor" opacity=".7" />
        <rect x="20" y="16" width="12" height="12" fill="currentColor" />
        <rect x="40" y="24" width="8" height="8" fill="currentColor" opacity=".8" />
        <rect x="8" y="36" width="9" height="9" fill="currentColor" opacity=".9" />
      </svg>

      <div className="relative z-10 overflow-hidden rounded-[28px] border border-line-strong bg-night-3 shadow-[0_40px_120px_-40px_rgba(11,99,246,0.55)]">
        <picture>
          <source
            type="image/webp"
            srcSet={`${asset("/images/profile/portrait-480.webp")} 480w, ${asset("/images/profile/portrait-800.webp")} 800w, ${asset("/images/profile/portrait-1200.webp")} 1200w`}
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 26rem, 90vw"
          />
          <img
            src={asset("/images/profile/portrait-1200.jpg")}
            alt="Sultan Saudagar, website designer and developer, seated in a blue checked shirt"
            width={1200}
            height={1300}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/5] w-full object-cover object-[50%_18%]"
          />
        </picture>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/90 to-transparent" />
        <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-lg font-semibold leading-tight">{site.name}</p>
            <p className="text-sm text-fg-muted">{site.title}</p>
          </div>
          <span className="rounded-full border border-line-strong bg-night/70 px-3 py-1 font-mono text-xs text-brand backdrop-blur">
            &lt;/&gt;
          </span>
        </div>
      </div>
    </div>
  );
}

function SelectedWork() {
  return (
    <section className="section-y relative overflow-x-clip" aria-labelledby="work-title" id="work">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            index="01"
            eyebrow="Selected work"
            title={<span id="work-title">Real projects, live on the web.</span>}
            intro="Every project here is online right now. Open the live site, try it on your phone, then read how it was made."
          />
          <div data-reveal className="shrink-0">
            <Button href="/work/" variant="secondary" size="sm">
              All projects
            </Button>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
          {projects.map((project, i) => (
            <ProjectShowcase key={project.slug} project={project} index={i} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section className="paper section-y" aria-labelledby="services-title">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                index="02"
                eyebrow="Services"
                title={<span id="services-title">Everything your business needs online.</span>}
                intro="From your first website to a custom application, each service is shaped around your goals and quoted for your project."
              />
              <div className="mt-8" data-reveal>
                <Button href="/services/" variant="secondary" size="sm">
                  Explore services
                </Button>
              </div>
            </div>
          </div>
          <ul className="border-t border-paper-line lg:col-span-7">
            {services.map((s, i) => (
              <li key={s.slug} className="border-b border-paper-line" data-reveal style={delay(i * 50)}>
                <Link href={`/services/${s.slug}/`} className="group flex gap-5 py-7 sm:gap-8 sm:py-8">
                  <span className="pt-1.5 font-mono text-sm text-brand-deep">{s.number}</span>
                  <span className="flex-1">
                    <span className="block font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-brand-deep sm:text-2xl">
                      {s.title}
                    </span>
                    <span className="mt-2 block text-ink-muted">{s.tagline}</span>
                  </span>
                  <span className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-paper-line transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WhyMe() {
  return (
    <section className="section-y" aria-labelledby="why-title">
      <div className="container-page">
        <SectionHeader
          index="03"
          eyebrow="Why work with me"
          title={<span id="why-title">A personal service with professional standards.</span>}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {differentiators.map((d, i) => (
            <div key={d.title} className="bg-night p-8 sm:p-10" data-reveal style={delay(i * 60)}>
              <span className="font-mono text-sm text-brand">0{i + 1}</span>
              <h3 className="text-h3 mt-6">{d.title}</h3>
              <p className="mt-3 max-w-md text-fg-muted">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutIntro() {
  return (
    <section className="section-y border-y border-line bg-night-2" aria-labelledby="about-title">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <img
              src={asset("/images/profile/portrait-800.webp")}
              alt="Portrait of Sultan Saudagar"
              width={800}
              height={867}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-[24px] border border-line-strong object-cover object-[50%_12%]"
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <div data-reveal>
            <Eyebrow index="04">About</Eyebrow>
          </div>
          <h2 id="about-title" className="text-h2 mt-5" data-reveal style={delay(60)}>
            Hi, I’m Sultan — I build websites businesses can rely on.
          </h2>
          <div className="text-lead mt-6 space-y-5 text-fg-muted" data-reveal style={delay(120)}>
            <p>
              I’m a website designer and developer based in Pune. I work with small businesses, startups and
              entrepreneurs who want a professional online presence — without the jargon, the inflated promises or
              the one-size-fits-all packages.
            </p>
            <p>
              My work combines thoughtful design, modern development and careful testing, so the website you launch
              looks great, loads fast and simply works.
            </p>
          </div>
          <div className="mt-9" data-reveal style={delay(180)}>
            <Button href="/about/" variant="secondary">
              More about me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section-y" aria-labelledby="process-title">
      <div className="container-page">
        <SectionHeader
          index="05"
          eyebrow="Process"
          title={<span id="process-title">A clear process, from first message to launch.</span>}
          intro="You always know what happens next, what I need from you and what you’ll receive."
        />
        <div className="mt-14">
          <ProcessGrid />
        </div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section className="section-y pt-0" aria-labelledby="tech-title">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              index="06"
              eyebrow="Technology"
              title={<span id="tech-title">Modern tools, chosen for the job.</span>}
              intro="I pick technology based on what your project needs — speed, budget, maintenance and growth."
            />
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {techGroups.map((g, i) => (
              <div key={g.label} className="bg-night p-7" data-reveal style={delay(i * 60)}>
                <h3 className="eyebrow text-fg-muted">{g.label}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li key={t} className="chip !text-fg">{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Commitments() {
  return (
    <section className="paper section-y" aria-labelledby="trust-title">
      <div className="container-page">
        <SectionHeader
          index="07"
          eyebrow="What you can count on"
          title={<span id="trust-title">Trust is earned with work, not with claims.</span>}
        />
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c, i) => (
            <div key={c.title} className="border-t-2 border-ink pt-6" data-reveal style={delay(i * 60)}>
              <h3 className="text-h3">{c.title}</h3>
              <p className="mt-3 text-ink-muted">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section-y" aria-labelledby="faq-title">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader index="08" eyebrow="FAQ" title={<span id="faq-title">Questions, answered.</span>} />
          <p className="mt-6 text-fg-muted" data-reveal>
            Can’t find what you’re looking for?{" "}
            <Link href="/contact/" className="text-brand link-underline">
              Get in touch
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
