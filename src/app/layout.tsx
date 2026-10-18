import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Neemo – Personal Finance App for Filipinos | Budget & Savings Tracker",
    template: "%s | Neemo",
  },
  description:
    "The #1 personal finance app for Filipinos. Track your goals, plan your 13th month pay, paluwagan, and OFW remittances. Free, private, and built for Filipinos.",
  keywords: [
    "personal finance app Philippines",
    "budget app Filipino",
    "savings tracker Philippines",
    "expense tracker Philippines",
    "13th month pay planner",
    "paluwagan tracker",
    "OFW remittance tracker",
    "debt manager Philippines",
    "financial freedom Philippines",
    "budgeting app Philippines",
    "SSS PhilHealth Pag-IBIG tracker",
    "installment calculator Philippines",
  ],
  authors: [{ name: "Neemo" }],
  creator: "Neemo",
  metadataBase: new URL("https://neemo.app"),
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "Neemo",
    title: "Neemo – Do you know when you'll be financially free?",
    description:
      "Personal finance app built for Filipinos. Track goals, 13th month pay, paluwagan, OFW remittances. Free and private.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neemo - Personal Finance App for Filipinos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neemo – Personal Finance App for Filipinos",
    description:
      "The #1 personal finance app for Filipinos. Free, private, and built for the way you manage money.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://neemo.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Neemo",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Android, iOS",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "PHP",
  },
  description:
    "Personal finance app built for Filipinos. Track savings goals, 13th month pay, paluwagan, OFW padala, and more.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "12500",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
