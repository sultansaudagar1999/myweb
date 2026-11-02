import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";
import { mailLink, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for using the ${site.name} website.`,
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="2 November 2026">
      <p>
        These terms apply to your use of this website, operated by {site.name}. By using the website you agree to them. If
        you do not agree, please do not use the website.
      </p>

      <h2>About this website</h2>
      <p>
        This website provides information about the website design and development services offered by {site.name} and
        showcases examples of previous work. Information on this website is provided for general purposes and may change
        without notice.
      </p>

      <h2>Enquiries and quotations</h2>
      <p>
        Submitting an enquiry does not create a contract or any obligation for either party. Every project is quoted
        individually. A quotation is only valid once provided in writing, and any project work is governed by the scope,
        pricing, timeline and terms agreed in writing for that project.
      </p>
      <p>Response times are not guaranteed, although I aim to reply to every genuine enquiry.</p>

      <h2>Intellectual property</h2>
      <p>
        Unless stated otherwise, the content of this website — including text, design, the {site.name} name and logo, and
        photographs — belongs to {site.name}. You may not copy or reuse it for commercial purposes without permission.
      </p>
      <p>
        Portfolio projects are shown to demonstrate my work. Names, trademarks and content of those projects belong to their
        respective owners.
      </p>

      <h2>External links</h2>
      <p>
        This website links to external websites, including live portfolio projects, WhatsApp, Instagram and GitHub. I am
        not responsible for the content, availability or privacy practices of external websites.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Please do not misuse this website, including by submitting spam, false information or malicious content through
        the enquiry form, or attempting to disrupt the website.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        This website is provided “as is”. While I take care to keep information accurate, I make no warranties about its
        completeness or accuracy. To the extent permitted by law, I am not liable for any loss arising from use of this
        website.
      </p>

      <h2>Privacy</h2>
      <p>
        Your use of this website is also governed by the <Link href="/privacy-policy/">Privacy Policy</Link>.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={mailLink("Terms question")}>{site.contact.email}</a>.
      </p>
    </LegalPage>
  );
}
