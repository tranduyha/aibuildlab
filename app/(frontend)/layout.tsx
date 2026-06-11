import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BackToTopButton from "@/components/BackToTopButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSiteSettings } from "@/lib/seo";
import "./globals.css";
import "./theme.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const siteSettings = getSiteSettings();

export const metadata: Metadata = {
  metadataBase: new URL(siteSettings.siteUrl),
  title: {
    default: siteSettings.name,
    template: `%s | ${siteSettings.name}`,
  },
  description: siteSettings.description,
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main className="page-content" id="main-content">
          {children}
        </main>
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}
