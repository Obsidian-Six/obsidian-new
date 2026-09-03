

import FloatingWhatsapp from "./_components/floating-whatsapp";
import Footer from "./_components/footer";

import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import TabBlurProtection from "./_components/tab-blur-protection";
import HeaderToggle from "./_components/HeaderToggle";
import SmoothScroll from "./_components/SmoothScroll";


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
        {/* Microsoft Clarity Script */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "vhbmu4dqla");
            `
          }}
        />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1366919888153937');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1366919888153937&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="antialiased" cz-shortcut-listen="true">
         <SmoothScroll />
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