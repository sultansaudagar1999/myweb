import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "./icons";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={asset("/brand/mark-128.webp")}
        alt=""
        width={40}
        height={40}
        className="size-10 rounded-[10px]"
        decoding="async"
      />
      <span className="font-display text-[1.05rem] font-semibold tracking-tight leading-none">
        Sultan <span className="text-brand">Saudagar</span>
      </span>
    </span>
  );
}

/** Small monospaced label with an optional index: "01 — Selected work". */
export function Eyebrow({ index, children, className = "" }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 text-brand [.paper_&]:text-brand-deep ${className}`}>
      {index && <span>{index}</span>}
      {index && <span aria-hidden className="h-px w-8 bg-current opacity-50" />}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
  titleClassName = "",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  const centered = align === "center";
  return (
    <header className={`${centered ? "mx-auto text-center items-center" : ""} flex max-w-3xl flex-col ${className}`}>
      <div data-reveal>
        <Eyebrow index={index} className={centered ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      </div>
      <h2 className={`text-h2 mt-5 ${titleClassName}`} data-reveal style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
        {title}
      </h2>
      {intro && (
        <p
          className="text-lead mt-5 text-fg-muted [.paper_&]:text-ink-muted"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {intro}
        </p>
      )}
    </header>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  className?: string;
  external?: boolean;
  icon?: "arrow" | "external" | "none";
  ariaLabel?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external,
  icon = "arrow",
  ariaLabel,
}: ButtonProps) {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const iconEl =
    icon === "arrow" ? <ArrowRight size={18} /> : icon === "external" ? <ArrowUpRight size={18} /> : null;
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {iconEl}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
      {iconEl}
    </Link>
  );
}

/** Screenshot inside a minimal browser frame. */
export function BrowserFrame({
  src,
  alt,
  url,
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`browser-frame ${className}`}>
      <div className="browser-frame__bar" aria-hidden>
        <span />
        <span />
        <span />
        {url && (
          <span className="!h-auto !w-auto !bg-transparent ml-3 truncate font-mono text-[11px] text-fg-muted">
            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        )}
      </div>
      <img
        src={asset(src)}
        alt={alt}
        className="block w-full"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
    </figure>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
      <div aria-hidden className="glow-brand pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 opacity-70" />
      <div className="container-page relative">
        <div className="hero-in max-w-4xl">
          <div>{typeof eyebrow === "string" ? <Eyebrow>{eyebrow}</Eyebrow> : eyebrow}</div>
          <h1 className="text-display mt-6">{title}</h1>
          {intro && <p className="text-lead mt-7 max-w-2xl text-fg-muted">{intro}</p>}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="eyebrow text-fg-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="link-underline hover:text-fg">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-brand">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

