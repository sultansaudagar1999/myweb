// Portfolio projects. Everything here was verified against the live site
// and, where public, its source repository. To add a project:
//   1. Add its URL to scripts/capture-screenshots.mjs and run `npm run screenshots -- <slug>`.
//   2. Add an entry below (keep `slug` identical to the screenshot folder).
// The listing, case-study page, sitemap and related-work links pick it up automatically.

import type { ServiceSlug } from "./services";

export type Screenshot = { src: string; alt: string; caption?: string; kind: "desktop" | "mobile" };

export type Project = {
  slug: string;
  title: string;
  category: string;
  industry: string;
  year?: string;
  liveUrl: string;
  repoUrl?: string;
  summary: string;
  cardDescription: string;
  /** Accent used for the project's frame glow — sampled from the project's own UI. */
  accent: string;
  services: ServiceSlug[];
  technologies: string[];
  hosting: string;
  overview: string;
  background: string;
  requirement: string[];
  solution: string;
  designApproach: string[];
  developmentApproach: string[];
  features: { title: string; description: string }[];
  gallery: Screenshot[];
};

const shot = (slug: string, file: string) => `/images/work/${slug}/${file}`;

export const projects: Project[] = [
  {
    slug: "saudagar-driving-school",
    title: "Saudagar Motor Driving School",
    category: "Business Website",
    industry: "Driving School · Local Services",
    liveUrl: "https://sultansaudagar1999.github.io/saudagar-driving-school/",
    repoUrl: "https://github.com/sultansaudagar1999/saudagar-driving-school",
    summary:
      "A conversion-focused website for a driving school in Dapodi, Pune — courses, transparent fees, real reviews and one-tap calling, all on a single fast page.",
    cardDescription:
      "Website for a Pune driving school with courses, a rate chart, Google reviews, a photo gallery and one-tap Call and WhatsApp buttons.",
    accent: "#E5484D",
    services: ["business-website-development"],
    technologies: ["HTML5", "CSS3", "JavaScript", "JSON content files", "Google Maps embed", "Google Reviews widget (Elfsight)"],
    hosting: "GitHub Pages",
    overview:
      "Saudagar Motor Driving School trains learners on two-wheelers and cars and helps them through the RTO licence process. The website gives the school a professional home online and makes it easy for a learner to go from “I need a licence” to calling the school.",
    background:
      "Local service businesses are usually found on a phone, often straight from Google search or Maps. Visitors want three answers quickly: what courses are offered, what they cost, and how to get in touch.",
    requirement: [
      "Present every course and its fee clearly, with no hidden surprises.",
      "Make calling or messaging the school possible from anywhere on the page.",
      "Build trust with real photos and genuine Google reviews.",
      "Show location, timings and directions for walk-in enquiries.",
      "Let the school update text, courses and fees without editing code.",
    ],
    solution:
      "A single, well-structured page that moves from a bold promise — “Learn Today. Drive Tomorrow.” — through reasons to choose the school, a training gallery, live Google reviews, popular courses, a full rate chart, FAQs and a contact section with an embedded map. Call Now and WhatsApp actions stay visible throughout.",
    designApproach: [
      "A dark, confident hero with an editorial serif headline (Fraunces) paired with a clean sans-serif (Manrope) for easy reading.",
      "Fees shown twice on purpose: highlighted course cards for quick decisions, and a complete rate chart for comparison.",
      "Real training photos instead of stock imagery, presented in a lightbox gallery.",
      "Large, thumb-friendly Call and WhatsApp buttons designed mobile-first.",
    ],
    developmentApproach: [
      "Hand-written HTML, CSS and JavaScript with no framework — a small, fast page that loads quickly on mobile data.",
      "All content (hero, courses, fees, FAQs, gallery, contact details) lives in JSON files and is rendered by a small script, so updates don’t require touching layout code.",
      "Testimonials come from a live Google Reviews widget; the section hides itself automatically when no reviews are configured.",
      "LocalBusiness structured data is generated from the same content files to support local search.",
    ],
    features: [
      { title: "Courses & rate chart", description: "Highlighted course cards plus a complete, transparent fee table." },
      { title: "One-tap contact", description: "Call Now and WhatsApp buttons in the header, hero and course cards." },
      { title: "Live Google reviews", description: "Real student reviews pulled from Google, not hand-picked quotes." },
      { title: "Training gallery", description: "Photos of real vehicles and lessons with an accessible lightbox." },
      { title: "Map, hours & enquiry", description: "Embedded Google Map, opening hours and a quick enquiry form." },
      { title: "Editable content", description: "Text, fees and FAQs are managed through structured JSON files." },
    ],
    gallery: [
      { kind: "desktop", src: shot("saudagar-driving-school", "desktop.webp"), alt: "Saudagar Motor Driving School homepage hero reading “Learn Today. Drive Tomorrow.” with Call Now and WhatsApp buttons", caption: "Homepage hero" },
      { kind: "desktop", src: shot("saudagar-driving-school", "detail-1.webp"), alt: "Training gallery section showing six photos of cars, two-wheelers and lessons", caption: "Training gallery" },
      { kind: "desktop", src: shot("saudagar-driving-school", "detail-2.webp"), alt: "Popular courses section with four course cards and fees", caption: "Popular courses" },
      { kind: "mobile", src: shot("saudagar-driving-school", "mobile.webp"), alt: "Driving school website on a mobile screen", caption: "Mobile view" },
    ],
  },
  {
    slug: "loanly",
    title: "Loanly",
    category: "Web Application",
    industry: "Personal Finance",
    liveUrl: "https://sultansaudagar1999.github.io/loanly/",
    repoUrl: "https://github.com/sultansaudagar1999/loanly",
    summary:
      "A premium loan and EMI calculator that shows the full picture — monthly payment, total interest, yearly breakdown and a month-by-month repayment schedule.",
    cardDescription:
      "Loan and EMI calculator web app with charts, a full repayment schedule, CSV export and dedicated calculators for personal, home and car loans.",
    accent: "#0B72E7",
    services: ["custom-web-application-development"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Recharts", "Lucide icons"],
    hosting: "GitHub Pages (static export)",
    overview:
      "Loanly is a web application for understanding a loan before signing for it. Enter an amount, rate and tenure and it instantly calculates the EMI, total interest and total payment, then shows exactly how every payment is split over the life of the loan.",
    background:
      "Most borrowers only ever see one number — the monthly EMI. How much of the total goes to interest, and how slowly the balance falls in the early years, usually stays hidden.",
    requirement: [
      "Instant, accurate EMI calculations as the user types or drags a slider.",
      "Visual explanation of principal versus interest, not just a table of figures.",
      "A complete repayment schedule that can be explored and exported.",
      "Dedicated calculators for different loan types and planning questions.",
      "A calm, trustworthy interface that works equally well on mobile.",
    ],
    solution:
      "A focused calculator experience with paired inputs and sliders, a live results panel, a principal-versus-interest chart, a yearly breakdown chart and an expandable repayment schedule with CSV export. Separate pages cover personal, home and car loans, interest, eligibility and prepayment.",
    designApproach: [
      "A minimal, light interface with a bold headline — “Know your loan before you take it.” — and generous white space.",
      "Results panel sits beside the inputs on desktop so the effect of every change is visible immediately.",
      "Charts are used only where they explain something a number cannot.",
      "Light and dark themes, with the preference remembered.",
    ],
    developmentApproach: [
      "Built with Next.js, React and TypeScript, exported as a static site so it runs on GitHub Pages with no server.",
      "Tailwind CSS for a consistent design system; Recharts for the breakdown charts.",
      "Each calculator has its own URL, so every loan type can be found and shared directly.",
      "Supports six currencies with locale-aware number formatting (for example, Indian lakh and crore grouping).",
    ],
    features: [
      { title: "Live EMI calculation", description: "Monthly payment, principal, total interest and total payment update instantly." },
      { title: "Principal vs. interest", description: "A donut chart and yearly bar chart make the cost of borrowing visible." },
      { title: "Repayment schedule", description: "Year-by-year table that expands into a month-by-month split." },
      { title: "CSV export", description: "Download the full schedule for spreadsheets or records." },
      { title: "Seven calculators", description: "Personal, home and car loans, EMI, interest, eligibility and prepayment." },
      { title: "Six currencies", description: "INR, USD, EUR, GBP, AED and AUD with correct local formatting." },
    ],
    gallery: [
      { kind: "desktop", src: shot("loanly", "desktop.webp"), alt: "Loanly homepage with the headline “Know your loan before you take it.”, calculator tabs and an EMI result of ₹20,517", caption: "Calculator and live results" },
      { kind: "desktop", src: shot("loanly", "detail-1.webp"), alt: "Yearly breakdown bar chart showing principal and interest per year with a falling balance line", caption: "Yearly breakdown chart" },
      { kind: "desktop", src: shot("loanly", "detail-2.webp"), alt: "Repayment schedule table with principal, interest, payment and balance for each year and an Export CSV button", caption: "Repayment schedule with CSV export" },
      { kind: "mobile", src: shot("loanly", "mobile.webp"), alt: "Loanly calculator on a mobile screen", caption: "Mobile view" },
    ],
  },
  {
    slug: "beforebuy",
    title: "BeforeBuy",
    category: "Web Application · PWA",
    industry: "Consumer Finance Tools",
    liveUrl: "https://plain-pine-2cb5.sultansaudagar1999.workers.dev/",
    summary:
      "A private, installable toolkit of purchase calculators that shows the real cost of buying something — before you spend.",
    cardDescription:
      "Installable web app with 16 purchase calculators — EMI, discounts, subscriptions, ownership cost, buy vs rent and more. No account, works offline.",
    accent: "#4338CA",
    services: ["custom-web-application-development"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Progressive Web App", "Local storage"],
    hosting: "Cloudflare Workers",
    overview:
      "BeforeBuy is a collection of everyday purchase calculators: EMI, discounts, subscriptions, cost per use, total ownership cost, price per GB, buy versus rent, affordability, GST and more — plus a side-by-side comparison of two purchases.",
    background:
      "Price tags rarely tell the whole story. Interest on instalments, recurring subscriptions, maintenance and resale value all change what something really costs.",
    requirement: [
      "Answer common “should I buy this?” questions with clear numbers.",
      "No sign-up and no data leaving the device.",
      "Fast and usable on a phone, including with a poor connection.",
      "Easy to switch between many calculators without losing context.",
    ],
    solution:
      "A lightweight web app with a calculator library, a dedicated compare page and helpful defaults such as “Try an example”. Results can be copied or saved locally, the currency can be switched, and the app can be installed to the home screen and used offline.",
    designApproach: [
      "A friendly indigo palette with clear iconography for each calculator type.",
      "Calculator inputs on one side and results on the other, with an explanation of how each figure is calculated.",
      "Trust messaging up front: free, private, no sign-up.",
      "Light and dark themes.",
    ],
    developmentApproach: [
      "Plain JavaScript with no framework, keeping the app small and fast.",
      "A web app manifest and service worker make it installable and available offline.",
      "Preferences and saved results are stored in the browser’s local storage — nothing is sent to a server.",
      "Deployed on Cloudflare Workers for fast global delivery.",
    ],
    features: [
      { title: "16 calculators", description: "EMI, discount, subscription, cost per use, ownership, buy vs rent, GST and more." },
      { title: "Compare two purchases", description: "Ownership cost per year, month and day for two options side by side." },
      { title: "Private by design", description: "No account and no server — your numbers stay on your device." },
      { title: "Works offline", description: "Installable as an app with offline support." },
      { title: "Copy & save results", description: "Copy a result or save it to a local history." },
      { title: "Multi-currency", description: "INR, USD, EUR and GBP with locale-aware formatting." },
    ],
    gallery: [
      { kind: "desktop", src: shot("beforebuy", "desktop.webp"), alt: "BeforeBuy homepage headline “Before You Buy” with a discount check example card", caption: "Homepage" },
      { kind: "desktop", src: shot("beforebuy", "detail-1.webp"), alt: "Purchase calculators page with a sidebar list of calculators and the EMI calculator form", caption: "Calculator library" },
      { kind: "desktop", src: shot("beforebuy", "detail-2.webp"), alt: "Compare two purchases page with input fields for product A and product B", caption: "Compare two purchases" },
      { kind: "mobile", src: shot("beforebuy", "mobile.webp"), alt: "BeforeBuy on a mobile screen", caption: "Mobile view" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsForService(service: ServiceSlug) {
  return projects.filter((p) => p.services.includes(service));
}

export const projectImage = (slug: string, file: "desktop.webp" | "full.webp" | "mobile.webp" | "og.jpg") =>
  shot(slug, file);
