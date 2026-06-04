

import FloatingWhatsapp from "./_components/floating-whatsapp";
import Footer from "./_components/footer";

import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import TabBlurProtection from "./_components/tab-blur-protection";
import HeaderToggle from "./_components/HeaderToggle";


export const metadata = {
  title: "Obsidian Six",
  description: "Building Brands From obsidian · Social Media Marketing · Paid Ads Management · Designing Services · Web Devlopment · Building Brands obsidian",
  // ADD THIS BLOCK:
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://obsidiansix.com/",
  },
};


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});



export default function RootLayout({ children }: { children: ReactNode }) {
  // --- ADDED ORGANIZATION SCHEMA ---
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Obsidian Six",
    "url": "https://obsidiansix.com/",
    "logo": "https://obsidiansix.com/images/logo/logo2.png",
    "sameAs": [
      "https://www.linkedin.com/company/obsidian-six/",
      "https://www.instagram.com/obsidiansixofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91 8085652729",
        "contactType": "sales",
        "email": "info@obsidiansix.com",
        "areaServed": [
          "US",
          "IN",
          "AE",
          "GB"
        ],
        "availableLanguage": [
          "en",
          "hi"
        ]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91 89829 92729",
        "contactType": "customer service",
        "email": "hr@obsidiansix.com",
        "areaServed": [
          "US",
          "IN",
          "AE"
        ],
        "availableLanguage": [
          "en",
          "hi"
        ]
      }
    ]
  };


  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Injecting Organization Schema sitewide */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased" cz-shortcut-listen="true">
        <HeaderToggle />
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
        <FloatingWhatsapp />
        <TabBlurProtection />
      </body>
    </html>
  );
}