// Single source of truth for brand and contact details.
// Change a value here and it updates everywhere on the site.

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sultansaudagar1999.github.io").replace(/\/$/, "");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const site = {
  name: "Sultan Saudagar",
  title: "Website Designer & Developer",
  tagline: "Digital Solutions for Growing Businesses",
  description:
    "Sultan Saudagar designs and builds fast, modern websites and custom web applications for small businesses, startups and growing brands in Pune and across India.",
  url: siteUrl + basePath,
  basePath,
  locale: "en_IN",
  // Service area only — no physical office address is published.
  serviceArea: { city: "Pune", region: "Maharashtra", country: "India", countryCode: "IN" },
  contact: {
    phoneDisplay: "+91 97626 28372",
    phoneE164: "+919762628372",
    whatsappNumber: "919762628372",
    email: "sultansaudagar1999@gmail.com",
  },
  social: {
    instagram: { label: "Instagram", handle: "@__sultan__0044", url: "https://www.instagram.com/__sultan__0044" },
    github: { label: "GitHub", handle: "sultansaudagar1999", url: "https://github.com/sultansaudagar1999" },
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
} as const;

export const primaryNav = [
  { label: "Work", href: "/work/" },
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const QUOTE_CTA = "Request a Free Quote";

/** Prefix a /public asset path with the deployment base path. */
export function asset(path: string) {
  return `${basePath}${path}`;
}

/** Absolute URL for canonical links, sitemap and structured data. */
export function absoluteUrl(path = "/") {
  return `${site.url}${path}`;
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = `tel:${site.contact.phoneE164}`;
export const mailLink = (subject?: string) =>
  `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export function quoteHref(service?: string) {
  return service ? `/contact/?service=${service}#enquiry` : "/contact/#enquiry";
}
