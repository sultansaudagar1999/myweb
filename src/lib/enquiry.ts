// Enquiry submission adapter.
//
// The site is static (GitHub Pages), so submissions are sent to Web3Forms, which
// emails them to the business inbox. The access key is designed to be public: it
// can only deliver to the address it was registered with, so no secret is exposed.
//
// To move to another provider (e.g. a Cloudflare Worker), replace `submitEnquiry`
// only — the form component doesn't need to change.

import { serviceOptions } from "@/content/enquiry";
import { site, whatsappLink } from "./site";

export type Enquiry = {
  name: string;
  business: string;
  email: string;
  phone: string;
  industry: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
  reference: string;
};

export type FieldErrors = Partial<Record<keyof Enquiry | "consent", string>>;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export const isEnquiryConfigured = accessKey.length > 0;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(data: Enquiry, consent: boolean): FieldErrors {
  const errors: FieldErrors = {};
  if (data.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!data.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = "Please enter a valid email address, like name@example.com.";
  if (data.phone.trim()) {
    const digits = data.phone.replace(/\D/g, "");
    if (!/^[+\d\s()-]+$/.test(data.phone.trim()) || digits.length < 7 || digits.length > 15)
      errors.phone = "Please enter a valid phone number, including country code if outside India.";
  }
  if (!data.service) errors.service = "Please choose the service you need.";
  const desc = data.description.trim();
  if (desc.length < 20) errors.description = "Please describe your project in at least 20 characters.";
  else if (desc.length > 3000) errors.description = "Please keep the description under 3,000 characters.";
  if (data.reference.trim()) {
    const ref = data.reference.trim();
    try {
      const url = new URL(/^https?:\/\//i.test(ref) ? ref : `https://${ref}`);
      if (!url.hostname.includes(".")) throw new Error();
    } catch {
      errors.reference = "Please enter a valid website address, like example.com.";
    }
  }
  if (!consent) errors.consent = "Please confirm so I can use your details to reply.";
  return errors;
}

export function serviceLabel(value: string) {
  return serviceOptions.find((o) => o.value === value)?.label ?? value;
}

/** Stable fingerprint used to block accidental duplicate submissions. */
export function fingerprint(data: Enquiry) {
  const s = `${data.email.trim().toLowerCase()}|${data.service}|${data.description.trim()}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return String(h);
}

export function enquiryWhatsAppLink(data: Partial<Enquiry>) {
  const lines = [
    `Hi Sultan, I’m ${data.name?.trim() || "interested in working with you"}${data.business?.trim() ? ` from ${data.business.trim()}` : ""}.`,
    data.service ? `Service: ${serviceLabel(data.service)}` : "",
    data.description?.trim() ? `Project: ${data.description.trim()}` : "",
    data.budget ? `Budget: ${data.budget}` : "",
    data.timeline ? `Timeline: ${data.timeline}` : "",
  ].filter(Boolean);
  return whatsappLink(lines.join("\n"));
}

export async function submitEnquiry(data: Enquiry, botcheck: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isEnquiryConfigured) return { ok: false, error: "not-configured" };
  const payload = {
    access_key: accessKey,
    subject: `New project enquiry — ${serviceLabel(data.service)} — ${data.name.trim()}`,
    from_name: `${site.name} website`,
    replyto: data.email.trim(),
    botcheck,
    "Full name": data.name.trim(),
    "Business name": data.business.trim() || "—",
    Email: data.email.trim(),
    "WhatsApp / Phone": data.phone.trim() || "—",
    Industry: data.industry || "—",
    Service: serviceLabel(data.service),
    "Project description": data.description.trim(),
    "Estimated budget": data.budget || "—",
    "Expected timeline": data.timeline || "—",
    "Reference website": data.reference.trim() || "—",
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (res.ok && json.success) return { ok: true };
    return { ok: false, error: json.message || `Request failed (${res.status})` };
  } catch (err) {
    return { ok: false, error: err instanceof Error && err.name === "AbortError" ? "The request timed out." : "Network error." };
  } finally {
    clearTimeout(timeout);
  }
}
