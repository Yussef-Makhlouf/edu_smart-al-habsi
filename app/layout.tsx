import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const handicrafts = localFont({
  src: "./fonts/TheYearofHandicrafts-Regular.otf",
  variable: "--font-handicrafts",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al-Habsi Platform | منصة الحبسي التعليمية",
  description: "المنصة التعليمية الفاخرة للقادة والمتميزين.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <body
        className={`${handicrafts.variable} font-sans antialiased selection:bg-gold/30`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
