import Link from "next/link";
import { services } from "@/content/services";
import { mailLink, primaryNav, site, telLink, whatsappLink } from "@/lib/site";
import { GitHub, Instagram, Mail, Phone, WhatsApp } from "./icons";
import { Logo } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-night-2">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-3">
          <Link href="/" aria-label={`${site.name} — home`} className="inline-block rounded-xl">
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs text-fg-muted">
            {site.title}. {site.tagline}.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Social and messaging links">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp (opens in a new tab)"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-colors hover:border-brand hover:text-fg"
              >
                <WhatsApp size={18} />
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opens in a new tab)"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-colors hover:border-brand hover:text-fg"
              >
                <Instagram size={18} />
              </a>
            </li>
            <li>
              <a
                href={site.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in a new tab)"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-colors hover:border-brand hover:text-fg"
              >
                <GitHub size={18} />
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="eyebrow text-fg-muted">Explore</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <Link href="/" className="link-underline">Home</Link>
            </li>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="md:col-span-3">
          <h2 className="eyebrow text-fg-muted">Services</h2>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="link-underline">{s.shortTitle}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="eyebrow text-fg-muted">Contact</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={mailLink()} className="link-underline inline-flex items-center gap-2 [overflow-wrap:anywhere]">
                <Mail size={16} className="shrink-0 text-brand" /> {site.contact.email}
              </a>
            </li>
            <li>
              <a href={telLink} className="link-underline inline-flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-brand" /> {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
                <WhatsApp size={16} className="shrink-0 text-brand" /> WhatsApp
              </a>
            </li>
          </ul>
          <p className="mt-5 text-sm text-fg-muted">
            Based in {site.serviceArea.city}, {site.serviceArea.country}. Working with clients across India and beyond.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link href="/privacy-policy/" className="link-underline">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="link-underline">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
