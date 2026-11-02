// About-page facts that need Sultan's confirmation.
// Anything left as `null` is simply not shown on the website — fill in a value
// and it appears automatically. See CONTENT-TODO.md.

export const profile: {
  /** e.g. "3+ years" — shown in the About facts strip. */
  experience: string | null;
  /** One or two sentences on education / professional background. */
  background: string | null;
  /** e.g. ["English", "Hindi", "Marathi"] */
  languages: string[] | null;
} = {
  experience: null,
  background: null,
  languages: null,
};

export const principles = [
  {
    title: "Clarity over decoration",
    description:
      "A beautiful website is one that helps people understand your business quickly. Every element has to earn its place.",
  },
  {
    title: "Performance is a feature",
    description:
      "Many of your customers will visit on a phone and mobile data. Fast-loading pages are respectful of their time — and better for search.",
  },
  {
    title: "Accessible by default",
    description:
      "Readable contrast, keyboard navigation, proper labels and semantic structure, so your website works for everyone.",
  },
  {
    title: "Honest scope",
    description:
      "I recommend what your business actually needs — and say so when something isn’t worth building yet.",
  },
];

export const qualityChecklist = [
  "Responsive layouts tested on mobile, tablet and desktop",
  "Every link, button and form checked before launch",
  "Optimised images and fonts for fast loading",
  "Search-friendly titles, descriptions, sitemap and structured data",
  "Accessible colour contrast, labels and keyboard navigation",
  "Clean, maintainable code that can grow with your business",
];

export const capabilities = [
  { title: "Web design", description: "Layout, typography, colour and interaction design tailored to your brand." },
  { title: "Front-end development", description: "Responsive, accessible interfaces built with modern HTML, CSS, JavaScript, TypeScript, React and Next.js." },
  { title: "Web applications", description: "Interactive tools, calculators and data-driven features that run in the browser." },
  { title: "Technical SEO", description: "Structured content, metadata, sitemaps and performance that search engines reward." },
  { title: "Testing & QA", description: "Hands-on experience with test automation tools such as Selenium, Appium and TestNG." },
  { title: "Deployment", description: "Hosting on platforms such as GitHub Pages and Cloudflare, set up to be simple to maintain." },
];
