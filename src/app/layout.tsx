// /* eslint-disable @next/next/no-page-custom-font */
// import FloatingWhatsapp from "./_components/floating-whatsapp";
// import Footer from "./_components/footer";
// import Navbar from "./_components/navbar";
// // Ensure this import is EXACTLY like this
// import { Playfair_Display, Poppins } from "next/font/google"; 
// import "./globals.css";
// import type { ReactNode } from "react";

// export const metadata = {
//   title: "Obsidian Six",
//   description: "Building Brands From obsidian · Social Media Marketing · Paid Ads Management · Designing Services · Web Devlopment · Building Brands obsidian",
// };


// // Define fonts OUTSIDE the component
// const playfair = Playfair_Display({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-playfair', 
//   style: ['italic', 'normal'],
//   weight: ['400', '500', '700'],
// });

// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '600', '700'],
//   variable: '--font-poppins',
// });

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
//       <body
//         className="antialiased" 
//         cz-shortcut-listen="true"
//       >
//         <header>
//           <Navbar />
//         </header>
//         <main>{children}</main>
//         <footer>
//           <Footer />
//         </footer>
//         <FloatingWhatsapp />
//       </body>
//     </html>
//   );
// }

/* eslint-disable @next/next/no-page-custom-font */
import FloatingWhatsapp from "./_components/floating-whatsapp";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

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

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  style: ['italic', 'normal'],
  weight: ['400', '500', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
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
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        {/* Injecting Organization Schema sitewide */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased" cz-shortcut-listen="true">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
        <FloatingWhatsapp />
      </body>
    </html>
  );
}