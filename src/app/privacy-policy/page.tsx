import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";
import { mailLink, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the personal information you share through this website.`,
  path: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="2 November 2026">
      <p>
        This Privacy Policy explains how {site.name} (“I”, “me”) collects, uses and protects personal information when
        you visit this website or contact me about a project. I aim to collect only what is needed to respond to you.
      </p>

      <h2>Information I collect</h2>
      <p>When you submit the project enquiry form, I receive the information you choose to provide:</p>
      <ul>
        <li>Your name, business name, email address and WhatsApp or phone number</li>
        <li>Your business industry, required service, project description, budget range, timeline and reference website</li>
      </ul>
      <p>
        If you contact me by WhatsApp, email, phone or Instagram, I receive the details and messages you send through that
        service.
      </p>
      <p>
        Like most websites, the hosting provider may automatically process technical information such as your IP address,
        browser type and the pages requested, in order to deliver the website securely.
      </p>

      <h2>How I use your information</h2>
      <ul>
        <li>To read and respond to your enquiry</li>
        <li>To discuss your project and prepare a proposal and quotation</li>
        <li>To communicate with you about a project we agree to work on</li>
        <li>To keep basic business records</li>
      </ul>
      <p>I do not sell, rent or trade your personal information, and I do not use it for unrelated marketing.</p>

      <h2>Services that help run this website</h2>
      <ul>
        <li>
          <strong>Web3Forms</strong> processes enquiry form submissions and delivers them to my email inbox.
        </li>
        <li>
          <strong>GitHub Pages</strong> hosts this website.
        </li>
        <li>
          <strong>Google (Gmail)</strong> hosts the email inbox that receives enquiries.
        </li>
        <li>
          <strong>WhatsApp</strong> is used if you choose to contact me there.
        </li>
        {site.analytics.gaId && (
          <li>
            <strong>Google Analytics</strong> helps me understand how visitors use the website, using cookies and anonymised
            IP addresses.
          </li>
        )}
      </ul>
      <p>Each of these providers processes data under its own privacy policy.</p>

      <h2>Cookies and storage</h2>
      <p>
        {site.analytics.gaId
          ? "This website uses analytics cookies to measure visits. "
          : "This website does not use advertising or analytics cookies. "}
        The enquiry form uses your browser’s session storage only to prevent the same enquiry from being sent twice; this
        is cleared when you close the tab.
      </p>

      <h2>How long I keep information</h2>
      <p>
        I keep enquiry details for as long as needed to respond and, if we work together, for the duration of the project
        and reasonable record-keeping afterwards. You can ask me to delete your information at any time.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask to access, correct or delete the personal information I hold about you, or withdraw your consent to
        its use, in line with applicable law including India’s Digital Personal Data Protection Act, 2023. To make a
        request, email <a href={mailLink("Privacy request")}>{site.contact.email}</a>.
      </p>

      <h2>Security</h2>
      <p>
        This website is served over HTTPS and enquiries are transmitted securely. No method of transmission or storage is
        completely secure, but I take reasonable steps to protect your information.
      </p>

      <h2>Children</h2>
      <p>This website is intended for businesses and adults. I do not knowingly collect information from children.</p>

      <h2>Changes to this policy</h2>
      <p>I may update this policy from time to time. The “Last updated” date above shows when it last changed.</p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email <a href={mailLink("Privacy question")}>{site.contact.email}</a> or visit the{" "}
        <Link href="/contact/">contact page</Link>.
      </p>
    </LegalPage>
  );
}
