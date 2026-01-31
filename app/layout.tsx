
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { SocialSidebar } from "@/components/ui/SocialSidebar";
import { MobileConsultationCTA } from "@/components/ui/MobileConsultationCTA";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dawid Chlewicki | Trener Personalny Gdańsk | Zbuduj Formę Życia",
  description: "Profesjonalne treningi personalne i plany żywieniowe w Gdańsku. Pomagam osiągnąć wymarzoną sylwetkę, zredukować wagę i poprawić zdrowie bez zbędnych restrykcji. Sprawdź metamorfozy moich podopiecznych!",
  keywords: ["trener personalny Gdańsk", "trening personalny", "dieta online", "odchudzanie", "Dawid Chlewicki", "metamorfozy", "siłownia Gdańsk", "plany treningowe"],
  authors: [{ name: "Dawid Chlewicki" }],
  creator: "Dawid Chlewicki",
  publisher: "DC Trener",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://dctrener.pl", // Placeholder URL, best practice to have one
    siteName: "Dawid Chlewicki - Trener Personalny",
    title: "Dawid Chlewicki | Trener Personalny Gdańsk",
    description: "Zbuduj formę życia z profesjonalnym trenerem. Indywidualne podejście, skuteczne plany treningowe i dietetyczne.",
    images: [
      {
        url: "/og-image.jpg", // We don't have this yet, but good to have in structure or use logo/hero
        width: 1200,
        height: 630,
        alt: "Dawid Chlewicki Trener Personalny",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <SocialSidebar />
        <MobileConsultationCTA />
        <JsonLd />
      </body>
    </html>
  );
}
