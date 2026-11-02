import type { CSSProperties } from "react";
import { Check } from "@/components/icons";
import { CtaSection, JsonLd } from "@/components/sections";
import { Breadcrumbs, Button, Eyebrow, SectionHeader } from "@/components/ui";
import { capabilities, principles, profile, qualityChecklist } from "@/content/about";
import { differentiators, techGroups } from "@/content/home";
import { projects } from "@/content/projects";
import { breadcrumbSchema, pageMetadata, personSchema } from "@/lib/seo";
import { absoluteUrl, asset, QUOTE_CTA, quoteHref, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Sultan Saudagar — Website Designer & Developer in Pune",
  absoluteTitle: true,
  description:
    "Meet Sultan Saudagar, a website designer and developer in Pune helping small businesses and startups build fast, modern and trustworthy websites.",
  path: "/about/",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default function AboutPage() {
  const facts = [
    { label: "Based in", value: `${site.serviceArea.city}, ${site.serviceArea.country}` },
    { label: "Works with", value: "Clients across India & beyond" },
    { label: "Live projects", value: `${projects.length} in the portfolio` },
    profile.experience ? { label: "Experience", value: profile.experience } : { label: "Pricing", value: "Custom quote per project" },
    ...(profile.languages ? [{ label: "Languages", value: profile.languages.join(", ") }] : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40" aria-labelledby="about-title">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
        <div aria-hidden className="glow-brand pointer-events-none absolute -top-40 left-0 h-[560px] w-[800px] opacity-70" />
        <div className="container-page relative grid items-end gap-14 lg:grid-cols-12">
          <div className="hero-in lg:col-span-7">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
            <p className="eyebrow mt-10 text-brand">About</p>
            <h1 id="about-title" className="text-display mt-5">
              Hi, I’m Sultan. I build websites that <span className="text-brand">earn trust.</span>
            </h1>
            <p className="text-lead mt-7 max-w-xl text-fg-muted">
              I’m a website designer and developer based in {site.serviceArea.city}. I help businesses establish a
              powerful digital presence through modern websites, custom web applications and digital solutions.
            </p>
            <div className="mt-10 flex flex-col gap-3 xs:flex-row">
              <Button href={quoteHref()}>{QUOTE_CTA}</Button>
              <Button href="/work/" variant="secondary">See my work</Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="relative mx-auto max-w-md overflow-hidden rounded-[28px] border border-line-strong shadow-[0_40px_120px_-40px_rgba(11,99,246,0.55)] lg:max-w-none">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${asset("/images/profile/portrait-480.webp")} 480w, ${asset("/images/profile/portrait-800.webp")} 800w, ${asset("/images/profile/portrait-1200.webp")} 1200w`}
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 90vw"
                />
                <img
                  src={asset("/images/profile/portrait-1200.jpg")}
                  alt="Sultan Saudagar seated in an armchair, wearing a blue checked shirt"
                  width={1200}
                  height={1300}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-[50%_15%]"
                />
              </picture>
            </figure>
          </div>
        </div>

        <div className="container-page relative mt-16">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none [&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
            {facts.map((f) => (
              <div key={f.label} className="bg-night p-5 sm:p-6">
                <dt className="eyebrow text-fg-muted">{f.label}</dt>
                <dd className="mt-2 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="paper section-y" aria-labelledby="who-title">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader index="01" eyebrow="Who I am" title={<span id="who-title">A designer who codes, and a developer who cares about design.</span>} />
          </div>
          <div className="text-lead space-y-5 text-ink-muted lg:col-span-6 lg:col-start-7" data-reveal>
            <p>
              I work at the point where design, technology and business meet. That means I think about how your
              website looks, how it’s built, and — most importantly — what it needs to achieve for your business.
            </p>
            {profile.background && <p>{profile.background}</p>}
            <p>
              My clients are typically small businesses, local shops and retailers, driving schools, restaurants,
              educational institutes, startups and entrepreneurs. Many are building their first serious online presence;
              others have outgrown a website that no longer represents them.
            </p>
            <p>
              Because I handle design, development and testing myself, you get one point of contact, consistent quality
              and someone who understands your project end to end.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="what-title">
        <div className="container-page">
          <SectionHeader index="02" eyebrow="What I do" title={<span id="what-title">Skills &amp; expertise.</span>} />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <li key={c.title} className="bg-night p-7 sm:p-8" data-reveal style={delay((i % 3) * 60)}>
                <h3 className="text-h3 !text-xl">{c.title}</h3>
                <p className="mt-2 text-fg-muted">{c.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techGroups.map((g) => (
              <div key={g.label} data-reveal>
                <h3 className="eyebrow text-fg-muted">{g.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li key={t} className="chip !text-fg">{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-y border-line bg-night-2" aria-labelledby="philosophy-title">
        <div className="container-page">
          <SectionHeader
            index="03"
            eyebrow="Approach & philosophy"
            title={<span id="philosophy-title">How I think about building for the web.</span>}
          />
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.title} className="border-t border-line-strong pt-6" data-reveal style={delay((i % 2) * 60)}>
                <span className="font-mono text-sm text-brand">0{i + 1}</span>
                <h3 className="text-h3 mt-4">{p.title}</h3>
                <p className="mt-3 max-w-lg text-fg-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="why-title">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader index="04" eyebrow="Why work with me" title={<span id="why-title">What businesses get when they work with me.</span>} />
          </div>
          <ul className="space-y-8 lg:col-span-7">
            {differentiators.map((d, i) => (
              <li key={d.title} className="flex gap-5" data-reveal style={delay(i * 50)}>
                <span className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-brand">
                  <Check size={18} />
                </span>
                <div>
                  <h3 className="text-h3 !text-xl">{d.title}</h3>
                  <p className="mt-2 text-fg-muted">{d.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="paper section-y" aria-labelledby="quality-title">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              index="05"
              eyebrow="Commitment to quality"
              title={<span id="quality-title">Checked before it’s called finished.</span>}
              intro="Quality isn’t a final step — it’s built into every stage. Before any website goes live, it goes through these checks."
            />
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-2xl border border-paper-line bg-paper-line sm:grid-cols-2 lg:col-span-7">
            {qualityChecklist.map((q, i) => (
              <li key={q} className="flex gap-3 bg-white p-6" data-reveal style={delay((i % 2) * 60)}>
                <Check size={20} className="mt-0.5 shrink-0 text-brand-deep" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y pb-0" aria-labelledby="brand-title">
        <div className="container-page text-center">
          <Eyebrow className="justify-center">The brand</Eyebrow>
          <h2 id="brand-title" className="sr-only">{site.name} brand</h2>
          <img
            src={asset("/brand/banner-1200.webp")}
            alt={`${site.name} logo — ${site.title}. ${site.tagline}.`}
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="mx-auto mt-8 w-full max-w-3xl rounded-[24px] border border-line"
          />
        </div>
      </section>

      <CtaSection title="Let’s build something great together." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absoluteUrl("/about/"),
          name: `About ${site.name}`,
          mainEntity: personSchema,
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])} />
    </>
  );
}
