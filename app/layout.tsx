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

export const metadata: Metadata = {
  metadataBase: new URL("https://kingdoubleglazing.com.au"),
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-small.png',
    shortcut: '/icon-small.png',
  },
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
          message="24/7 Emergency Glass Repair — broken window? We come to you."
          cta="Call Now"
        />
        <div className="relative flex flex-col flex-1">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
