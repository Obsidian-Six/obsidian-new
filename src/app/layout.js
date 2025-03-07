/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";

export const metadata = {
  title: "Obsidian Six",
  description: "Building Brands From obsidian · Social Media Marketing · Paid Ads Management · Designing Services · Web Devlopment · Building Brands obsidian",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`poppins antialiased`}
        cz-shortcut-listen="true"
        data-new-gr-c-s-check-loaded="14.1226.0"
        data-gr-ext-installed=""
      >
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        {children}
      </body>
    </html>
  );
}
