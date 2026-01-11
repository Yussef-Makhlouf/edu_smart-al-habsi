import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

const handicrafts = localFont({
  src: "./fonts/TheYearofHandicrafts-Regular.otf",
  variable: "--font-handicrafts",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al-Habsi Platform | منصة الحبسي التعليمية",
  description: "المنصة التعليمية الفاخرة للقادة والمتميزين.",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${handicrafts.variable} antialiased selection:bg-gold/30`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
