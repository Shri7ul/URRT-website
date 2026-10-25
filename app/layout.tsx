import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/content";
import { asset } from "@/lib/asset";

import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "UIU Rescue Rover Team — rescue robotics research in Bangladesh",
    template: "%s — URRT",
  },
  description: site.description,
  keywords: [
    "rescue robotics",
    "urban search and rescue",
    "UIU Rescue Rover Team",
    "URRT",
    "United International University",
    "RoboCup Rescue",
    "Bangladesh robotics",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "UIU Rescue Rover Team",
    description: site.description,
    images: [{ url: asset("/media/t1.webp"), width: 1600, height: 1204, alt: "AEGIS, the URRT rescue rover, with its manipulator raised." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UIU Rescue Rover Team",
    description: site.description,
    images: [asset("/media/t1.webp")],
  },
  alternates: { canonical: "/" },
  icons: {
    icon: asset("/media/aboutuslogo.webp"),
    apple: asset("/media/aboutuslogo.webp"),
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f1eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
