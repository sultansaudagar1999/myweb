import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { RevealObserver, ScrollPreviewSizer } from "@/components/client-effects";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Analytics, JsonLd, WhatsAppFloat } from "@/components/sections";
import { siteGraph } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap", weight: ["500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400", "500"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url + "/"),
  title: {
    default: `${site.name} — ${site.title} in Pune`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true },
  ...(site.analytics.gscVerification ? { verification: { google: site.analytics.gscVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#010617",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sora.variable} ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:font-semibold focus:text-night"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <RevealObserver />
        <ScrollPreviewSizer />
        <JsonLd data={siteGraph()} />
        <Analytics />
      </body>
    </html>
  );
}
