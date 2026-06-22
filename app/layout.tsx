import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RainOverlay } from "@/components/layout/RainOverlay";
import { GrainOverlay } from "@/components/layout/GrainOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Streetlight — Urban Noir Fiction",
  description:
    "Enter a rain-soaked urban noir universe of forgotten people, hidden systems, and stories buried beneath neon light.",
  keywords: [
    "urban noir",
    "fiction",
    "literary mystery",
    "streetlight",
    "the drowned streetlamp",
    "trevor kinyanjui",
  ],
  authors: [{ name: "Trevor Kinyanjui" }],
  openGraph: {
    title: "Streetlight — Urban Noir Fiction",
    description:
      "Enter a rain-soaked urban noir universe of forgotten people, hidden systems, and stories buried beneath neon light.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-streetlight-black text-white min-h-screen antialiased`}
      >
        <RainOverlay />
        <GrainOverlay />
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
