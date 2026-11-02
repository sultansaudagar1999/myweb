import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: { src: string; width: number; height: number; alt: string };
  /** Use the title as-is instead of appending " | Sultan Saudagar". */
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

const defaultImage = {
  src: "/og/og-default.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.title}. ${site.tagline}.`,
};

export function pageMetadata({ title, description, path, image = defaultImage, absoluteTitle, type = "website" }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  // Absolute URLs so a base path (project-repo deployment) is always included.
  const url = absoluteUrl(path);
  const img = { url: absoluteUrl(image.src), width: image.width, height: image.height, alt: image.alt };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img.url],
    },
  };
}

const personId = absoluteUrl("/#person");
const businessId = absoluteUrl("/#business");

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  jobTitle: site.title,
  url: absoluteUrl("/"),
  image: absoluteUrl("/images/profile/portrait-800.webp"),
  email: `mailto:${site.contact.email}`,
  telephone: site.contact.phoneE164,
  sameAs: [site.social.instagram.url, site.social.github.url],
  knowsAbout: ["Web design", "Web development", "Next.js", "React", "TypeScript", "Search engine optimisation"],
};

/** No street address is published — only the service area. */
export const businessSchema = {
  "@type": "ProfessionalService",
  "@id": businessId,
  name: site.name,
  description: site.description,
  slogan: site.tagline,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/brand/icon-512.png"),
  image: absoluteUrl("/og/og-default.jpg"),
  email: site.contact.email,
  telephone: site.contact.phoneE164,
  founder: { "@id": personId },
  areaServed: [
    { "@type": "City", name: site.serviceArea.city },
    { "@type": "Country", name: site.serviceArea.country },
  ],
  sameAs: [site.social.instagram.url, site.social.github.url],
};

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      businessSchema,
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: site.name,
        publisher: { "@id": businessId },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export { businessId, personId };
