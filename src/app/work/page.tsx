import { CtaSection, JsonLd, ProjectShowcase } from "@/components/sections";
import { PageHero } from "@/components/ui";
import { projects } from "@/content/projects";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Portfolio — Websites & Web Applications",
  description:
    "Live websites and web apps by Sultan Saudagar — a Pune driving school website, the Loanly EMI calculator and the BeforeBuy purchase calculator.",
  path: "/work/",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Work you can open, <span className="text-brand">use and judge.</span>
          </>
        }
        intro="A selection of real projects — a local business website and two web applications. Each one is live: hover a preview to scroll through it, open the live site, or read the case study."
      />
      <section className="overflow-x-clip pb-24 md:pb-32" aria-label="Projects">
        <div className="container-page flex flex-col gap-24 md:gap-32">
          {projects.map((project, i) => (
            <ProjectShowcase key={project.slug} project={project} index={i} flip={i % 2 === 1} headingLevel={2} />
          ))}
        </div>
      </section>
      <CtaSection title="Your project could be next." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Portfolio",
          url: absoluteUrl("/work/"),
          hasPart: projects.map((p) => ({
            "@type": "CreativeWork",
            name: p.title,
            url: absoluteUrl(`/work/${p.slug}/`),
          })),
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work", path: "/work/" }])} />
    </>
  );
}
