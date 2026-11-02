import { EnquiryForm } from "@/components/enquiry-form";
import { GitHub, Instagram, Mail, Phone, WhatsApp } from "@/components/icons";
import { JsonLd } from "@/components/sections";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
import { breadcrumbSchema, businessId, pageMetadata } from "@/lib/seo";
import { absoluteUrl, asset, mailLink, site, telLink, whatsappLink } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact — Request a Free Website Quote",
  description:
    "Tell Sultan Saudagar about your website or web application project and request a free, custom quotation. Contact by enquiry form, WhatsApp, phone or email.",
  path: "/contact/",
});

const channels = [
  {
    label: "WhatsApp",
    value: site.contact.phoneDisplay,
    href: whatsappLink("Hi Sultan, I’d like to discuss a project."),
    icon: WhatsApp,
    note: "Quickest way to start a conversation",
    external: true,
  },
  { label: "Email", value: site.contact.email, href: mailLink("Project enquiry"), icon: Mail, note: "For detailed briefs and files" },
  { label: "Phone", value: site.contact.phoneDisplay, href: telLink, icon: Phone, note: "Tap to call on mobile" },
  {
    label: "Instagram",
    value: site.social.instagram.handle,
    href: site.social.instagram.url,
    icon: Instagram,
    note: "Follow along",
    external: true,
  },
  {
    label: "GitHub",
    value: site.social.github.handle,
    href: site.social.github.url,
    icon: GitHub,
    note: "Browse my code",
    external: true,
  },
];

const nextSteps = [
  { title: "I review your enquiry", description: "I read your details and, if needed, reply with a few questions." },
  { title: "We talk it through", description: "A short call or chat to understand your goals, audience and requirements." },
  { title: "You receive a proposal", description: "A clear, written proposal with scope, timeline and your custom quotation." },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 sm:pt-40" aria-labelledby="contact-title">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
        <div aria-hidden className="glow-brand pointer-events-none absolute -top-40 left-1/3 h-[560px] w-[860px] opacity-70" />
        <div className="container-page relative">
          <div className="hero-in max-w-4xl">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
            <p className="eyebrow mt-10 text-brand">Request a Free Quote</p>
            <h1 id="contact-title" className="text-display mt-5">
              Let’s talk about <span className="text-brand">your project.</span>
            </h1>
            <p className="text-lead mt-7 max-w-2xl text-fg-muted">
              Whether you have a detailed brief or just an idea, tell me what you’re planning. I’ll come back with
              questions, ideas and a custom quotation — free and without obligation.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-16 pb-24 md:pb-32" aria-label="Contact options">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <img
                  src={asset("/images/profile/headshot-160.webp")}
                  alt=""
                  width={160}
                  height={160}
                  className="size-16 rounded-full border border-line-strong object-cover"
                />
                <div>
                  <p className="font-display text-lg font-semibold">{site.name}</p>
                  <p className="text-sm text-fg-muted">{site.title}</p>
                </div>
              </div>
              <h2 className="eyebrow mt-10 text-fg-muted">Prefer to reach out directly?</h2>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {channels.map(({ label, value, href, icon: Icon, note, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 py-4"
                    >
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-night">
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-fg-muted">{label}</span>
                        <span className="block font-medium [overflow-wrap:anywhere]">{value}</span>
                        <span className="block text-xs text-fg-muted">{note}</span>
                        {external && <span className="sr-only">(opens in a new tab)</span>}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-fg-muted">
                Based in {site.serviceArea.city}, {site.serviceArea.country} — working with clients across India and
                internationally.
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8" id="enquiry">
            <div className="rounded-[24px] border border-line bg-night-2/60 p-6 sm:p-10">
              <Eyebrow>Project enquiry</Eyebrow>
              <h2 className="text-h2 mt-4 !text-[clamp(1.75rem,3vw,2.4rem)]">Tell me about your project</h2>
              <p className="mt-3 mb-10 text-fg-muted">It takes about two minutes. Share as much as you know — we’ll work out the rest together.</p>
              <EnquiryForm />
            </div>

            <div className="mt-14">
              <h2 className="eyebrow text-fg-muted">What happens next</h2>
              <ol className="mt-6 grid gap-6 sm:grid-cols-3">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="border-t border-line-strong pt-5">
                    <span className="font-mono text-sm text-brand">0{i + 1}</span>
                    <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-sm text-fg-muted">{s.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl("/contact/"),
          name: `Contact ${site.name}`,
          about: { "@id": businessId },
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }])} />
    </>
  );
}
