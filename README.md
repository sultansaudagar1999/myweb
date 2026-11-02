# Sultan Saudagar — Website

Personal brand and agency website for **Sultan Saudagar, Website Designer & Developer**.
Next.js 16 (static export) · React 19 · TypeScript · Tailwind CSS v4. Hosted on GitHub Pages.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local development server at http://localhost:3000 |
| `npm run build` | Static export to `out/` (plus a GitHub Pages prefetch fix) |
| `npm start` | Serve `out/` locally like GitHub Pages (http://localhost:4173) |
| `npm run typecheck` | TypeScript check |
| `npm run qa` | Automated QA against `npm start` (SEO, links, a11y, layout, form) |
| `npm run assets` | Regenerate logo mark, favicons, OG image and portrait sizes |
| `npm run screenshots` | Re-capture portfolio screenshots from the live sites |

## Where things live

- `src/lib/site.ts` — name, contact details, social links (single source of truth)
- `src/content/projects.ts` — portfolio projects and case studies
- `src/content/services.ts` — the six services and their pages
- `src/content/home.ts` — process, FAQs, technologies, trust section
- `src/content/about.ts` — About page facts (`null` values are hidden until filled in)
- `src/lib/enquiry.ts` — enquiry form submission (swap provider here only)
- `public/images/` — original logo and photo; everything else is generated from them

### Adding a project

1. Add `{ slug, url, details }` to `scripts/capture-screenshots.mjs`, then `npm run screenshots -- <slug>`.
2. Add an entry to `src/content/projects.ts` with the same `slug`.

Listing, case-study page, sitemap and related-work links update automatically.

## Enquiry form

GitHub Pages can't run server code, so the form posts to **Web3Forms** (free: 250 submissions/month).
The access key is designed to be public — it can only deliver to the email it was registered with.

1. Go to https://web3forms.com, enter `sultansaudagar1999@gmail.com`, copy the access key from the email.
2. In GitHub: Settings → Secrets and variables → Actions → **Variables** → add `NEXT_PUBLIC_WEB3FORMS_KEY`.

Until a key is set, the form still works: on submit it opens WhatsApp with the enquiry pre-written.

Spam protection: honeypot field, minimum fill time, duplicate-submission blocking.
Automatic confirmation emails to customers are not included (paid on Web3Forms; needs a custom domain elsewhere) —
customers see an on-screen confirmation and can continue on WhatsApp.

## Deploying to GitHub Pages

1. Create a public repo named **`sultansaudagar1999.github.io`** (gives the URL `https://sultansaudagar1999.github.io/`).
2. Push this project to its `main` branch.
3. Settings → Pages → Source: **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and deploys.

Using a different repo name (e.g. `portfolio`)? Add repo Variables `NEXT_PUBLIC_BASE_PATH=/portfolio` and
`NEXT_PUBLIC_SITE_URL=https://sultansaudagar1999.github.io`.

Custom domain later: add it in Settings → Pages, set `NEXT_PUBLIC_SITE_URL` to it, and add `public/CNAME`.

## Analytics & Search Console (optional)

- Google Analytics 4: set `NEXT_PUBLIC_GA_ID` (loads only when set).
- Search Console: choose "HTML tag" verification and set `NEXT_PUBLIC_GSC_VERIFICATION` to the `content` value,
  then submit `/sitemap.xml`.
