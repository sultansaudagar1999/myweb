"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { budgetOptions, industryOptions, serviceOptions, timelineOptions } from "@/content/enquiry";
import {
  type Enquiry,
  type FieldErrors,
  enquiryWhatsAppLink,
  fingerprint,
  isEnquiryConfigured,
  submitEnquiry,
  validateEnquiry,
} from "@/lib/enquiry";
import { mailLink, site } from "@/lib/site";
import { ArrowRight, Check, WhatsApp } from "./icons";

const empty: Enquiry = {
  name: "",
  business: "",
  email: "",
  phone: "",
  industry: "",
  service: "",
  description: "",
  budget: "",
  timeline: "",
  reference: "",
};

const SENT_KEY = "ss-enquiries-sent";
const MIN_FILL_MS = 2500;

type Status = "idle" | "submitting" | "success" | "error" | "duplicate" | "whatsapp";

function readSent(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(SENT_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function EnquiryForm() {
  const [data, setData] = useState<Enquiry>(empty);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(Date.now());
  const botRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  // Pre-select a service from ?service=<slug> (links from service pages).
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("service");
    if (param && serviceOptions.some((o) => o.value === param)) setData((d) => ({ ...d, service: param }));
  }, []);

  useEffect(() => {
    if (status === "success" || status === "whatsapp") resultRef.current?.focus();
  }, [status]);

  const update = (field: keyof Enquiry) => (e: { target: { value: string } }) => {
    const next = { ...data, [field]: e.target.value };
    setData(next);
    if (submitted) setErrors(validateEnquiry(next, consent));
  };

  const id = (field: string) => `${uid}-${field}`;
  const fieldProps = (field: keyof Enquiry) => ({
    id: id(field),
    name: field,
    value: data[field],
    onChange: update(field),
    "aria-invalid": errors[field] ? (true as const) : undefined,
    // Ids that don't exist (no error or no hint) are ignored by assistive tech.
    "aria-describedby": `${id(field)}-error ${id(field)}-hint`,
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setSubmitted(true);
    setServerError("");
    const found = validateEnquiry(data, consent);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    // Spam traps: a filled honeypot or an impossibly fast submission.
    const botcheck = botRef.current?.value ?? "";
    if (botcheck) {
      setStatus("success");
      return;
    }
    if (Date.now() - startedAt.current < MIN_FILL_MS) {
      setServerError("That was very quick! Please check your details and press send again.");
      setStatus("error");
      startedAt.current = 0;
      return;
    }

    if (!isEnquiryConfigured) {
      window.open(enquiryWhatsAppLink(data), "_blank", "noopener,noreferrer");
      setStatus("whatsapp");
      return;
    }

    const print = fingerprint(data);
    if (readSent().includes(print)) {
      setStatus("duplicate");
      return;
    }

    setStatus("submitting");
    const result = await submitEnquiry(data, botcheck);
    if (result.ok) {
      try {
        sessionStorage.setItem(SENT_KEY, JSON.stringify([...readSent(), print]));
      } catch {
        /* storage unavailable — duplicate protection falls back to the disabled button */
      }
      setStatus("success");
    } else {
      setServerError(result.error);
      setStatus("error");
    }
  }

  function reset() {
    setData(empty);
    setConsent(false);
    setErrors({});
    setSubmitted(false);
    setStatus("idle");
    startedAt.current = Date.now();
  }

  if (status === "success" || status === "whatsapp") {
    const firstName = data.name.trim().split(/\s+/)[0];
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-[24px] border border-line-strong bg-night-2 p-8 outline-none sm:p-12">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand text-night">
          <Check size={28} />
        </span>
        {status === "success" ? (
          <>
            <h3 className="text-h2 mt-8 !text-[clamp(1.75rem,3.2vw,2.5rem)]">
              Thank you{firstName ? `, ${firstName}` : ""}. Your enquiry has been sent.
            </h3>
            <p className="text-lead mt-5 text-fg-muted">
              I’ll review your project details and reply to <strong className="text-fg">{data.email || "your email"}</strong>
              {data.phone ? " or on WhatsApp" : ""} with any questions and next steps towards your custom quotation.
            </p>
            <p className="mt-4 text-fg-muted">Please check your spam or promotions folder if you don’t see my reply.</p>
          </>
        ) : (
          <>
            <h3 className="text-h2 mt-8 !text-[clamp(1.75rem,3.2vw,2.5rem)]">Almost there — send it on WhatsApp.</h3>
            <p className="text-lead mt-5 text-fg-muted">
              WhatsApp should have opened with your enquiry already written. Just press send. If it didn’t open, use the
              button below, or email me instead.
            </p>
          </>
        )}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={enquiryWhatsAppLink(data)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <WhatsApp size={18} /> {status === "success" ? "Continue on WhatsApp" : "Open WhatsApp"}
          </a>
          {status === "whatsapp" ? (
            <a href={mailLink(`Project enquiry — ${data.name}`)} className="btn btn-secondary">Email instead</a>
          ) : (
            <button type="button" onClick={reset} className="btn btn-secondary">Send another enquiry</button>
          )}
        </div>
      </div>
    );
  }

  const errorList = Object.entries(errors) as [keyof FieldErrors, string][];
  const submitting = status === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-required`} className="relative">
      {!isEnquiryConfigured && (
        <p className="mb-8 rounded-xl border border-brand/40 bg-brand/10 p-4 text-sm text-fg">
          Online submission is being set up. When you press send, your enquiry will open in WhatsApp, ready to send.
        </p>
      )}

      {submitted && errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-8 rounded-xl border border-danger/50 bg-danger/10 p-5 outline-none">
          <p className="font-semibold">Please fix {errorList.length === 1 ? "this" : `these ${errorList.length}`} to continue:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {errorList.map(([field, msg]) => (
              <li key={field}>
                <a href={`#${id(field)}`} className="underline underline-offset-2">{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p id={`${uid}-required`} className="mb-6 text-sm text-fg-muted">
        Fields marked <span aria-hidden className="text-brand">*</span>
        <span className="sr-only">with an asterisk</span> are required. Everything else is optional.
      </p>

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <Field label="Full name" required error={errors.name} htmlFor={id("name")}>
          <input {...fieldProps("name")} className="field" autoComplete="name" required maxLength={100} />
        </Field>
        <Field label="Business name" htmlFor={id("business")}>
          <input {...fieldProps("business")} className="field" autoComplete="organization" maxLength={120} />
        </Field>
        <Field label="Email address" required error={errors.email} htmlFor={id("email")}>
          <input {...fieldProps("email")} type="email" inputMode="email" className="field" autoComplete="email" required maxLength={160} />
        </Field>
        <Field label="WhatsApp / phone number" error={errors.phone} htmlFor={id("phone")} hint="Include country code if outside India.">
          <input {...fieldProps("phone")} type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="+91" maxLength={20} />
        </Field>
        <Field label="Business industry" htmlFor={id("industry")}>
          <select {...fieldProps("industry")} className="field">
            <option value="">Select an industry</option>
            {industryOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Required service" required error={errors.service} htmlFor={id("service")}>
          <select {...fieldProps("service")} className="field" required>
            <option value="">Select a service</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field
          label="Project description"
          required
          error={errors.description}
          htmlFor={id("description")}
          className="sm:col-span-2"
          hint="What does your business do, and what should the website or application achieve?"
        >
          <textarea {...fieldProps("description")} className="field" rows={6} required maxLength={3000} />
        </Field>
        <Field label="Estimated budget" htmlFor={id("budget")}>
          <select {...fieldProps("budget")} className="field">
            <option value="">Prefer not to say</option>
            {budgetOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Expected timeline" htmlFor={id("timeline")}>
          <select {...fieldProps("timeline")} className="field">
            <option value="">Select a timeline</option>
            {timelineOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Reference website" error={errors.reference} htmlFor={id("reference")} className="sm:col-span-2" hint="A website you like, or your current website.">
          <input {...fieldProps("reference")} type="url" inputMode="url" className="field" autoComplete="url" placeholder="example.com" maxLength={300} />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("botcheck")}>Leave this field empty</label>
        <input ref={botRef} id={id("botcheck")} name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-7">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-fg-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (submitted) setErrors(validateEnquiry(data, e.target.checked));
            }}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
            id={id("consent")}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[#2aa7ff]"
          />
          <span>
            I agree that {site.name} may use these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy-policy/" className="text-brand underline underline-offset-2">Privacy Policy</Link>.{" "}
            <span aria-hidden className="text-brand">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id={`${uid}-consent-error`} className="field-error">{errors.consent}</p>
        )}
      </div>

      {(status === "error" || status === "duplicate") && (
        <div role="alert" className="mt-7 rounded-xl border border-danger/50 bg-danger/10 p-5 text-sm">
          {status === "duplicate" ? (
            <p>
              You’ve already sent this enquiry — thank you! If you’d like to add something, message me on{" "}
              <a href={enquiryWhatsAppLink(data)} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a> or{" "}
              <a href={mailLink()} className="underline">email</a>.
            </p>
          ) : (
            <p>
              {serverError.startsWith("That was") ? serverError : "Sorry, your enquiry couldn’t be sent right now."}{" "}
              {!serverError.startsWith("That was") && (
                <>
                  Please try again, or send it on{" "}
                  <a href={enquiryWhatsAppLink(data)} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a> or by{" "}
                  <a href={mailLink(`Project enquiry — ${data.name}`)} className="underline">email</a>.
                </>
              )}
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary min-w-[14rem] disabled:cursor-wait disabled:opacity-70" disabled={submitting} aria-disabled={submitting}>
          {submitting ? (
            <>
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-night/30 border-t-night" />
              Sending…
            </>
          ) : isEnquiryConfigured ? (
            <>
              Send enquiry <ArrowRight size={18} />
            </>
          ) : (
            <>
              <WhatsApp size={18} /> Send via WhatsApp
            </>
          )}
        </button>
        <p className="text-sm text-fg-muted">Free and without obligation.</p>
      </div>
      <p aria-live="polite" className="sr-only">{submitting ? "Sending your enquiry" : ""}</p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {required ? (
          <span aria-hidden className="ml-1 text-brand">*</span>
        ) : (
          <span className="opt">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="field-error">{error}</p>
      ) : (
        hint && <p id={`${htmlFor}-hint`} className="field-hint">{hint}</p>
      )}
    </div>
  );
}
