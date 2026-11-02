// Services offered. Each entry renders a dedicated page at /services/<slug>/.
// Pricing is intentionally absent: every project is quoted individually.

export type ServiceSlug =
  | "business-website-development"
  | "custom-web-application-development"
  | "ecommerce-website-development"
  | "website-redesign"
  | "landing-page-development"
  | "website-maintenance-support";

export type Service = {
  slug: ServiceSlug;
  number: string;
  title: string;
  shortTitle: string;
  /** Used in <title> and meta description for search. */
  seoTitle: string;
  seoDescription: string;
  tagline: string;
  intro: string;
  whatItIs: string;
  problems: string[];
  audience: string[];
  deliverables: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  approach: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "business-website-development",
    number: "01",
    title: "Business Website Development",
    shortTitle: "Business Websites",
    seoTitle: "Business Website Development in Pune",
    seoDescription:
      "Professional, mobile-first business websites for small businesses, shops, schools and service providers in Pune and across India. Request a free, custom quote.",
    tagline: "A professional home for your business online — built to be found, trusted and contacted.",
    intro:
      "Your website is often the first place a customer meets your business. I design and build fast, clear websites that explain what you do, show why you can be trusted, and make it effortless to get in touch.",
    whatItIs:
      "A complete multi-page or single-page website for your business: your services, your story, your location and your contact details, designed around the questions your customers actually ask.",
    problems: [
      "Customers can’t find you on Google, or find an outdated listing instead.",
      "You rely only on social media and word of mouth, with nowhere to send people.",
      "Visitors can’t quickly see what you offer, what it costs or how to reach you.",
      "Your current site looks dated, loads slowly or breaks on mobile phones.",
    ],
    audience: ["Local shops & retailers", "Driving schools", "Restaurants & cafés", "Educational institutes", "Clinics & service providers", "Consultants & freelancers"],
    deliverables: [
      { title: "Custom design", description: "A design made for your brand — not a reused template." },
      { title: "Mobile-first build", description: "Looks and works properly on phones, tablets and desktops." },
      { title: "Contact made easy", description: "Click-to-call, WhatsApp, email and enquiry forms where they help." },
      { title: "Search-ready foundations", description: "Page titles, descriptions, structured data, sitemap and clean URLs." },
      { title: "Maps & location", description: "Embedded map, opening hours and directions for walk-in customers." },
      { title: "Launch support", description: "Help connecting your domain and publishing the site." },
    ],
    benefits: [
      { title: "Be found", description: "A site built with search engines in mind helps local customers discover you." },
      { title: "Look established", description: "A professional website builds confidence before the first conversation." },
      { title: "Get more enquiries", description: "Clear calls to action turn visitors into calls, messages and visits." },
    ],
    approach: [
      { title: "Understand your customers", description: "What they search for, what they need to know and what stops them contacting you." },
      { title: "Structure the content", description: "Plan pages and sections so the most important information comes first." },
      { title: "Design & build", description: "Create the visual design and develop it with performance and accessibility in mind." },
      { title: "Test & launch", description: "Check every page, link and form on desktop and mobile before going live." },
    ],
    faqs: [
      { question: "Do I need to provide the text and photos?", answer: "Your knowledge of the business is essential, but you don’t need finished copy. I can help structure and write the content with you, and advise on the photos that will work best." },
      { question: "Can I update the website myself later?", answer: "It depends on how the site is built. If you expect to update content often, tell me in your enquiry and I’ll propose an approach that makes that straightforward." },
    ],
  },
  {
    slug: "custom-web-application-development",
    number: "02",
    title: "Custom Web Application Development",
    shortTitle: "Web Applications",
    seoTitle: "Custom Web Application Development",
    seoDescription:
      "Custom web applications, calculators, tools and dashboards built with React, Next.js and TypeScript. Discuss your idea and get a tailored proposal.",
    tagline: "Turn a process, an idea or a spreadsheet into a fast, focused web application.",
    intro:
      "Some problems need more than a website. I build custom web applications — tools, calculators, portals and internal systems — that do one job exceptionally well and are a pleasure to use.",
    whatItIs:
      "Software that runs in the browser and is designed around your workflow: from interactive calculators and booking tools to dashboards and customer portals.",
    problems: [
      "Your team relies on spreadsheets, paperwork or repeated manual steps.",
      "Off-the-shelf software doesn’t fit the way your business actually works.",
      "You have a product idea and need a working version to test with real users.",
      "Customers need a tool or self-service experience you can’t offer today.",
    ],
    audience: ["Startups & founders", "Growing businesses", "Educational institutes", "Finance & service businesses", "Teams with manual processes"],
    deliverables: [
      { title: "Requirements & scope", description: "A clear definition of features, users and priorities before building." },
      { title: "Interface design", description: "Screens designed around real tasks, with clear feedback and states." },
      { title: "Modern front-end", description: "Built with technologies such as React, Next.js and TypeScript." },
      { title: "Data & integrations", description: "Connection to the services and data your application needs." },
      { title: "Testing", description: "Calculations, flows and edge cases checked before release." },
      { title: "Deployment", description: "Hosting set up on a suitable, cost-effective platform." },
    ],
    benefits: [
      { title: "Save time", description: "Automate repetitive work and reduce errors from manual steps." },
      { title: "Fit your process", description: "Software shaped around how you work — not the other way round." },
      { title: "Room to grow", description: "Start focused, then add features as your needs become clear." },
    ],
    approach: [
      { title: "Discovery", description: "Map the users, tasks and data the application must handle." },
      { title: "Prototype the core", description: "Design and build the most important flow first to validate it early." },
      { title: "Build iteratively", description: "Add features in small, testable steps with regular check-ins." },
      { title: "Test & release", description: "Verify accuracy and usability, then deploy and monitor." },
    ],
    faqs: [
      { question: "Can you start from a rough idea?", answer: "Yes. Many applications start as a rough idea or a spreadsheet. The first step is turning it into a clear, prioritised scope so the first version is useful and achievable." },
      { question: "Which technologies do you use?", answer: "I choose technology to suit the project. For most web applications I work with HTML, CSS, JavaScript, TypeScript, React and Next.js." },
    ],
  },
  {
    slug: "ecommerce-website-development",
    number: "03",
    title: "E-commerce Website Development",
    shortTitle: "E-commerce",
    seoTitle: "E-commerce Website Development",
    seoDescription:
      "E-commerce websites for small businesses and retailers in India — catalogues, carts, payments and orders planned around you. Request a custom quote.",
    tagline: "Sell online with a store that is easy to browse, easy to trust and easy to buy from.",
    intro:
      "Whether you’re taking a local shop online or launching a new product, I help you plan and build an online store that makes buying simple — on the phone your customers already use.",
    whatItIs:
      "An online store with a product catalogue, cart and checkout, built on the platform or stack that best suits your products, order volume and budget.",
    problems: [
      "You sell only in person or through messages and want to reach more customers.",
      "Taking orders over WhatsApp or phone is hard to manage as you grow.",
      "Your current store is slow, confusing or loses customers at checkout.",
      "You need a catalogue that’s easy for you to keep up to date.",
    ],
    audience: ["Local shops & retailers", "Home businesses", "Brands launching products", "Restaurants offering ordering", "Wholesalers & distributors"],
    deliverables: [
      { title: "Store planning", description: "Platform recommendation based on your products, volume and budget." },
      { title: "Product catalogue", description: "Categories, filters, search and clear product pages." },
      { title: "Cart & checkout", description: "A short, mobile-friendly path from product to payment." },
      { title: "Payment setup", description: "Integration with a payment provider suitable for your market." },
      { title: "Order notifications", description: "Order confirmations for you and your customers." },
      { title: "Store training", description: "A walkthrough so you can manage products and orders." },
    ],
    benefits: [
      { title: "Sell around the clock", description: "Customers can browse and order whenever suits them." },
      { title: "Reach further", description: "Serve customers beyond your neighbourhood." },
      { title: "Stay organised", description: "Orders in one place instead of scattered across chats." },
    ],
    approach: [
      { title: "Plan the store", description: "Products, payments, delivery and the right platform for you." },
      { title: "Design for buying", description: "Product pages and checkout designed to build confidence and reduce drop-off." },
      { title: "Build & integrate", description: "Develop the store and connect payments and notifications." },
      { title: "Test real orders", description: "Run through orders end to end before launch." },
    ],
    faqs: [
      { question: "Which e-commerce platform will you use?", answer: "That depends on your products, order volume and how you want to manage the store. I’ll recommend an option in your proposal and explain the trade-offs, including any platform or payment fees." },
      { question: "Are payment gateway fees included?", answer: "Payment providers and some platforms charge their own fees. These are separate from development and I’ll point them out clearly when we plan your store." },
    ],
  },
  {
    slug: "website-redesign",
    number: "04",
    title: "Website Redesign & Modernization",
    shortTitle: "Redesign & Modernization",
    seoTitle: "Website Redesign Services",
    seoDescription:
      "Website redesign and modernization: faster loading, mobile-friendly layouts, clearer messaging and better search foundations. Get a tailored proposal.",
    tagline: "Give an outdated website a fast, modern and mobile-friendly new life.",
    intro:
      "If your website no longer reflects the quality of your business, a redesign can change how customers see you. I modernise the design, speed and structure while keeping what already works.",
    whatItIs:
      "A review and rebuild of your existing website — new design, improved content structure and modern code — with care taken to keep your existing links and search visibility.",
    problems: [
      "The site looks dated next to competitors.",
      "Pages are slow or difficult to use on mobile phones.",
      "Visitors leave without calling or enquiring.",
      "The site is hard to update or built on technology that’s no longer maintained.",
    ],
    audience: ["Established businesses", "Schools & institutes", "Restaurants & hotels", "Any business with an older website"],
    deliverables: [
      { title: "Website review", description: "Assessment of design, content, speed, mobile usability and SEO basics." },
      { title: "New visual design", description: "A modern design that reflects your brand today." },
      { title: "Content restructure", description: "Clearer pages and calls to action based on what customers need." },
      { title: "Performance work", description: "Optimised images, fonts and code for faster loading." },
      { title: "Redirect plan", description: "Old URLs mapped to new ones to protect search visibility." },
      { title: "Careful launch", description: "Testing and a planned switch-over to minimise disruption." },
    ],
    benefits: [
      { title: "Make a better first impression", description: "A modern site signals a business that cares about quality." },
      { title: "Load faster", description: "Speed matters to visitors, especially on mobile data." },
      { title: "Convert more visitors", description: "Clearer structure and calls to action lead to more enquiries." },
    ],
    approach: [
      { title: "Audit", description: "Review the current site and identify what to keep, fix and remove." },
      { title: "Redesign", description: "Create a new design and content structure." },
      { title: "Rebuild", description: "Develop the new site with modern, maintainable code." },
      { title: "Migrate & launch", description: "Move content, set up redirects and launch carefully." },
    ],
    faqs: [
      { question: "Will I lose my Google rankings?", answer: "A redesign always carries some risk, which is why I plan redirects from old URLs and preserve important content. Rankings depend on many factors, so no one can honestly guarantee them, but a careful migration protects what you have." },
      { question: "Can you work with my existing hosting and domain?", answer: "Usually, yes. I’ll review your current setup during the audit and recommend whether to keep it or move." },
    ],
  },
  {
    slug: "landing-page-development",
    number: "05",
    title: "Landing Page Development",
    shortTitle: "Landing Pages",
    seoTitle: "Landing Page Design & Development",
    seoDescription:
      "High-converting landing pages for product launches, campaigns, events and lead generation — fast, focused and mobile-first. Request a free quote.",
    tagline: "One focused page, one clear goal — designed to turn visitors into leads.",
    intro:
      "A landing page has a single job: persuade a visitor to take one action. I design and build focused, fast pages for launches, campaigns, admissions, events and lead generation.",
    whatItIs:
      "A standalone page built around one offer and one call to action, often used with ads, social media campaigns or a new product launch.",
    problems: [
      "Ad traffic lands on a generic homepage and doesn’t convert.",
      "You need a page for a launch, event or admission season — quickly.",
      "Your offer is spread across several pages and the message gets lost.",
    ],
    audience: ["Startups launching products", "Institutes running admissions", "Businesses running ads", "Events & promotions", "Personal brands"],
    deliverables: [
      { title: "Conversion-focused structure", description: "Headline, benefits, proof and call to action in a deliberate order." },
      { title: "Custom design", description: "On-brand visuals designed for the specific campaign." },
      { title: "Lead capture", description: "Enquiry form, WhatsApp or call buttons connected to you." },
      { title: "Analytics-ready", description: "Prepared for analytics so you can measure results." },
      { title: "Fast loading", description: "Lightweight build for visitors arriving from ads on mobile." },
    ],
    benefits: [
      { title: "Clear message", description: "One page that explains one offer properly." },
      { title: "Measurable", description: "Easier to track how campaigns perform." },
      { title: "Quick to launch", description: "A focused scope means less to build and test." },
    ],
    approach: [
      { title: "Define the goal", description: "Agree the audience, offer and the single action you want." },
      { title: "Write & structure", description: "Plan the message and sections that lead to that action." },
      { title: "Design & build", description: "Create a fast, focused page." },
      { title: "Test & launch", description: "Verify forms, links and tracking before going live." },
    ],
    faqs: [
      { question: "Can the landing page be part of my existing website?", answer: "Often, yes — it can live on your current domain or as a separate page. I’ll recommend what works best for your campaign." },
    ],
  },
  {
    slug: "website-maintenance-support",
    number: "06",
    title: "Website Maintenance & Support",
    shortTitle: "Maintenance & Support",
    seoTitle: "Website Maintenance & Support",
    seoDescription:
      "Ongoing website maintenance and support: content updates, fixes, improvements and technical checks to keep your website working well. Request a custom quote.",
    tagline: "Keep your website accurate, secure and working well — without worrying about it.",
    intro:
      "A website isn’t finished at launch. Prices change, new services are added and technology moves on. I help keep your website up to date and working properly.",
    whatItIs:
      "Ongoing help with your website: content updates, fixes, small improvements and periodic technical checks, agreed around what your site actually needs.",
    problems: [
      "Your website shows old prices, timings or services.",
      "Something broke and you don’t know who to ask.",
      "You want small improvements but don’t have a developer.",
      "You’re unsure whether your site is still secure and working properly.",
    ],
    audience: ["Businesses without in-house developers", "Owners of sites I’ve built", "Owners of existing sites that need care"],
    deliverables: [
      { title: "Content updates", description: "Text, images, prices, services and contact details kept current." },
      { title: "Fixes", description: "Broken links, layout issues and errors investigated and resolved." },
      { title: "Improvements", description: "Small enhancements to design, speed or content." },
      { title: "Technical checks", description: "Periodic checks of forms, links, performance and dependencies." },
    ],
    benefits: [
      { title: "Peace of mind", description: "Someone who knows your website is a message away." },
      { title: "Always accurate", description: "Customers see current information." },
      { title: "Protect your investment", description: "Keep the site working as technology changes." },
    ],
    approach: [
      { title: "Review", description: "Understand the current website and its technology." },
      { title: "Agree the scope", description: "Decide what support you need and how requests will be handled." },
      { title: "Support", description: "Make updates and fixes as agreed, with clear communication." },
    ],
    faqs: [
      { question: "Can you maintain a website you didn’t build?", answer: "Often, yes. I’ll first review how the site is built and hosted, then tell you honestly whether I can support it well." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
