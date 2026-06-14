import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SR Fast Food Bolara — Chinese & Fast Food",
  description: "Authentic Chinese flavours & fast food. Soups, Fried Rice, Noodles, Starters & Chicken dishes at SR Fast Food Bolara.",
  keywords: ["SR Fast Food Bolara", "Chinese Food Bolara", "Fast Food Mangalore", "Fried Rice Bolara", "Noodles Mangalore", "Chicken Kabab Bolara"],
  openGraph: {
    title: "SR Fast Food Bolara — Chinese & Fast Food",
    description: "Authentic Chinese flavours & fast food. Soups, Fried Rice, Noodles, Starters & Chicken dishes at SR Fast Food Bolara.",
    type: "website",
    locale: "en_IN",
    siteName: "SR Fast Food Bolara",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "SR Fast Food Bolara",
    "description": "Authentic Chinese flavours & fast food. Soups, Fried Rice, Noodles, Starters & Chicken dishes at SR Fast Food Bolara.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "07, leevel junction, Bolar",
      "addressLocality": "Mangaluru",
      "addressRegion": "Karnataka",
      "postalCode": "575001",
      "addressCountry": "IN"
    },
    "servesCuisine": ["Chinese", "Fast Food"],
    "priceRange": "₹",
    "telephone": ["+917760288291", "+918310063867"],
    "openingHours": "Mo-Su 13:00-23:00",
    "menu": "https://sr-fast-food-bolara.vercel.app/"
  };

  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0D0D0D] text-[#F5F5F0] selection:bg-[#FF4D00] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

