"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, QUOTE_CTA, quoteHref, site, telLink, whatsappLink } from "@/lib/site";
import { ArrowRight, Close, Menu, Phone, WhatsApp } from "./icons";
import { Logo } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Solid background once scrolled; tuck away on scroll down, return on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 12);
        setHidden(y > 320 && y > lastY + 4);
        if (y < lastY - 4 || y <= 320) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "border-b border-line bg-night/80 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} — home`} className="rounded-xl">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="relative rounded-full px-4 py-2 text-[0.95rem] text-fg-muted transition-colors hover:text-fg aria-[current=page]:text-fg"
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span aria-hidden className="absolute inset-x-4 -bottom-0.5 h-px bg-brand" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href={quoteHref()} className="btn btn-primary btn-sm hidden sm:inline-flex">
              {QUOTE_CTA}
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg md:hidden"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-night p-0 text-fg backdrop:bg-night/70 open:flex md:hidden"
      >
        <div className="container-page flex w-full flex-col">
          <div className="flex h-[4.5rem] items-center justify-between">
            <Logo />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              autoFocus
            >
              <Close size={20} />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10">
            <ul className="flex flex-col">
              {[{ label: "Home", href: "/" }, ...primaryNav].map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={(item.href === "/" ? pathname === "/" : isActive(item.href)) ? "page" : undefined}
                    className="flex items-center justify-between py-5 font-display text-3xl font-semibold tracking-tight aria-[current=page]:text-brand"
                  >
                    <span>{item.label}</span>
                    <span className="eyebrow text-fg-muted">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3 pb-8 pt-10">
            <Link href={quoteHref()} onClick={() => setOpen(false)} className="btn btn-primary w-full">
              {QUOTE_CTA} <ArrowRight size={18} />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <WhatsApp size={18} /> WhatsApp
              </a>
              <a href={telLink} className="btn btn-secondary">
                <Phone size={18} /> Call
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
