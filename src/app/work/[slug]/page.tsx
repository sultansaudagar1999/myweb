import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Check } from "@/components/icons";
import { CtaSection, ExternalLink, JsonLd } from "@/components/sections";
import { Breadcrumbs, BrowserFrame, Button, Eyebrow } from "@/components/ui";
import { getProject, projectImage, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { breadcrumbSchema, businessId, pageMetadata } from "@/lib/seo";
import { absoluteUrl, asset, QUOTE_CTA, quoteHref } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — Case Study`,
    description: project.summary,
    path: `/work/${project.slug}/`,
    type: "article",
    image: { src: projectImage(project.slug, "og.jpg"), width: 1200, height: 630, alt: `${project.title} homepage` },
  });
}

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length]!;
  const [hero, ...details] = project.gallery.filter((g) => g.kind === "desktop");
  const mobile = project.gallery.find((g) => g.kind === "mobile");
  const relatedServices = project.services.map(getService).filter((s) => s !== undefined);

  const facts = [
    { label: "Category", value: project.category },
    { label: "Industry", value: project.industry },
    { label: "Hosting", value: project.hosting },
    { label: "Live site", value: <ExternalLink href={project.liveUrl} className="text-brand link-underline">Visit website</ExternalLink> },
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-32 sm:pt-40" aria-labelledby="project-title">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 opacity-40 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${project.accent}, transparent)` }}
        />
        <div className="container-page relative">
          <div className="hero-in max-w-4xl">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work/" }, { label: project.title }]} />
            <h1 id="project-title" className="text-display mt-8">{project.title}</h1>
            <p className="text-lead mt-6 max-w-3xl text-fg-muted">{project.summary}</p>
            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <Button href={project.liveUrl} icon="external" ariaLabel={`Live preview of ${project.title} (opens in a new tab)`}>
                Live preview
              </Button>
              <Button href={quoteHref(project.services[0])} variant="secondary">
                Start a similar project
              </Button>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-night p-5 sm:p-6">
                <dt className="eyebrow text-fg-muted">{f.label}</dt>
                <dd className="mt-2 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>

          {hero && (
            <div className="relative mt-12" data-reveal>
              <BrowserFrame src={hero.src} alt={hero.alt} url={project.liveUrl} priority />
            </div>
          )}
        </div>
      </section>

      <article className="paper section-y mt-24" aria-label={`${project.title} case study`}>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="eyebrow text-brand-deep">Technologies</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t} className="chip">{t}</li>
                  ))}
                </ul>
                {relatedServices.length > 0 && (
                  <>
                    <h2 className="eyebrow mt-10 text-brand-deep">Related services</h2>
                    <ul className="mt-4 space-y-2">
                      {relatedServices.map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}/`} className="link-underline font-medium">{s.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {project.repoUrl && (
                  <p className="mt-10">
                    <ExternalLink href={project.repoUrl} className="link-underline font-medium">Source on GitHub</ExternalLink>
                  </p>
                )}
              </div>
            </aside>

            <div className="space-y-20 lg:col-span-8">
              <CaseSection index="01" title="Project overview">
                <p>{project.overview}</p>
              </CaseSection>
              <CaseSection index="02" title="Background">
                <p>{project.background}</p>
              </CaseSection>
              <CaseSection index="03" title="The requirement">
                <CheckList items={project.requirement} />
              </CaseSection>
              <CaseSection index="04" title="The solution">
                <p>{project.solution}</p>
              </CaseSection>
              <CaseSection index="05" title="Design approach">
                <CheckList items={project.designApproach} />
              </CaseSection>
              <CaseSection index="06" title="Development approach">
                <CheckList items={project.developmentApproach} />
              </CaseSection>
              <CaseSection index="07" title="Key features">
                <ul className="grid gap-px overflow-hidden rounded-2xl border border-paper-line bg-paper-line sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f.title} className="bg-white p-6">
                      <h3 className="font-display text-lg font-semibold tracking-tight">{f.title}</h3>
                      <p className="mt-2 text-ink-muted">{f.description}</p>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            </div>
          </div>
        </div>
      </article>

      <section className="section-y" aria-labelledby="screens-title">
        <div className="container-page">
          <Eyebrow index="08">Screens</Eyebrow>
          <h2 id="screens-title" className="text-h2 mt-5">A closer look.</h2>
          <p className="mt-4 text-fg-muted">Actual screenshots captured from the live website.</p>
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-8">
              {details.map((d, i) => (
                <figure key={d.src} data-reveal style={delay(i * 80)}>
                  <div className="overflow-hidden rounded-2xl border border-line-strong bg-white">
                    <img src={asset(d.src)} alt={d.alt} loading="lazy" decoding="async" className="block w-full" />
                  </div>
                  {d.caption && <figcaption className="mt-3 text-sm text-fg-muted">{d.caption}</figcaption>}
                </figure>
              ))}
            </div>
            {mobile && (
              <figure className="mx-auto w-full max-w-[18rem] lg:sticky lg:top-28 lg:col-span-4" data-reveal style={delay(160)}>
                <div className="overflow-hidden rounded-[2.2rem] border-[6px] border-night-4 bg-night-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                  <img src={asset(mobile.src)} alt={mobile.alt} loading="lazy" decoding="async" className="block w-full rounded-[1.7rem]" />
                </div>
                {mobile.caption && <figcaption className="mt-3 text-center text-sm text-fg-muted">{mobile.caption}</figcaption>}
              </figure>
            )}
          </div>
          <div className="mt-14 flex flex-col gap-3 xs:flex-row">
            <Button href={project.liveUrl} icon="external" ariaLabel={`Visit the live site of ${project.title} (opens in a new tab)`}>
              Visit the live site
            </Button>
            <Button href={quoteHref(project.services[0])} variant="secondary">
              {QUOTE_CTA}
            </Button>
          </div>
        </div>
      </section>

      <nav aria-label="More projects" className="border-y border-line">
        <div className="container-page flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/work/" className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg">
            <ArrowLeft size={18} /> All projects
          </Link>
          <Link href={`/work/${next.slug}/`} className="group text-right">
            <span className="eyebrow block text-fg-muted">Next project</span>
            <span className="mt-2 inline-flex items-center gap-3 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-brand sm:text-3xl">
              {next.title} <ArrowRight size={24} />
            </span>
          </Link>
        </div>
      </nav>

      <CtaSection title="Want something like this for your business?" service={project.services[0]} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          headline: `${project.title} — ${project.category}`,
          description: project.summary,
          url: absoluteUrl(`/work/${project.slug}/`),
          image: absoluteUrl(projectImage(project.slug, "og.jpg")),
          genre: project.category,
          keywords: project.technologies.join(", "),
          creator: { "@id": businessId },
          sameAs: project.liveUrl,
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work/" },
          { name: project.title, path: `/work/${project.slug}/` },
        ])}
      />
    </>
  );
}

function CaseSection({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section data-reveal>
      <p className="font-mono text-sm text-brand-deep">{index}</p>
      <h2 className="text-h2 mt-3 !text-[clamp(1.6rem,3vw,2.25rem)]">{title}</h2>
      <div className="text-lead mt-5 space-y-4 text-ink-muted">{children}</div>
    </section>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check size={20} className="mt-1 shrink-0 text-brand-deep" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
