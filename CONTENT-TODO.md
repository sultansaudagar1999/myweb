# Content to confirm

Nothing below is shown as fake content on the site — items are either hidden until filled in, or written
in a way that is true today. Please confirm or provide:

## Needs your input
- [ ] **Location** — site says "Based in Pune, India" (footer, About, contact, SEO). Confirm, or edit `serviceArea` in `src/lib/site.ts`.
- [ ] **Years of experience** — `profile.experience` in `src/content/about.ts` (hidden while `null`).
- [ ] **Background / education** — `profile.background` (hidden while `null`).
- [ ] **Languages you work in** — `profile.languages` (hidden while `null`).
- [ ] **Testimonials** — none shown. Share genuine client feedback (with permission) to add a testimonials section.
- [ ] **More projects** — GitHub has `BalajiFurniture`, `MahaveerFurniture`, `sanjaynanakate`. Client work? Live URLs?
- [ ] **Driving school case study** — confirm the client brief; add any real outcomes you can share. Its admin panel is not mentioned (unverified).
- [ ] **Logo source file** — an SVG / transparent PNG would give a sharper header mark and favicon.

## Please review
- [ ] Working commitments stated on the site: "written proposal with scope, timeline and quote", "tested on desktop, tablet and mobile", "direct with the developer".
- [ ] Budget ranges in the enquiry form (`src/content/enquiry.ts`) — customer's budget only, not your prices.
- [ ] Technologies list (`src/content/home.ts`) — taken from your public repos (incl. Selenium, Appium, TestNG, Docker).
- [ ] Privacy Policy and Terms are sensible templates, not legal advice — have them reviewed if needed.

## Configuration
- [ ] `NEXT_PUBLIC_WEB3FORMS_KEY` (free) — see README.
- [ ] Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`.
