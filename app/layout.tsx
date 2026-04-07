import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { localBusinessSchema } from "@/lib/seo/schema/localBusiness";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// TODO: replace with real contact details from Tas
const PHONE = "03 9XXX XXXX";
const EMAIL = "info@kingdoubleglazing.com.au";
const ADDRESS = "Melbourne, VIC, Australia";

export const metadata: Metadata = {
  metadataBase: new URL("https://kingdoubleglazing.com.au"),
  title: {
    default: "King Double Glazing Melbourne | From $495/m² | Stop. Don't Overpay.",
    template: "%s | King Double Glazing",
  },
  description:
    "Melbourne's retrofit double glazing specialists. Upgrade your existing windows from $495/m². Instant online estimate. Transparent pricing. No surprises.",
  openGraph: {
    siteName: "King Double Glazing",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${barlowCondensed.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <EmergencyBanner
          phone={PHONE}
          message="24/7 Emergency Glass Repair — broken window? We come to you."
          cta="Call Now"
        />
        <Header phone={PHONE} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer phone={PHONE} email={EMAIL} address={ADDRESS} />
      </body>
    </html>
  );
}
