/* eslint-disable @next/next/no-page-custom-font */
import FloatingWhatsapp from "./_components/floating-whatsapp";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Obsidian Six",
  description:
    "Building Brands From obsidian · Social Media Marketing · Paid Ads Management · Designing Services · Web Devlopment · Building Brands obsidian",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`poppins antialiased`}
        cz-shortcut-listen="true"
        data-new-gr-c-s-check-loaded="14.1226.0"
        data-gr-ext-installed=""
      >
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
