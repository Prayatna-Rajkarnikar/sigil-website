import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/component/Nav";
import Footer from "@/component/Footer";
import { fraunces, instrument, inter, mono } from "./font";

export const metadata: Metadata = {
  title: "Sigil — Issue No. 04",
  description:
    "A field manual for things that haven't happened yet. Sigil deploys autonomous AI actors into high-fidelity simulated environments — so strategy, doctrine, and operators are battle-tested before contact with reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrument.variable} ${inter.variable} ${mono.variable}`}
    >
      <body
        className={`${inter.className} antialiased bg-paper text-ink min-h-screen paper-grain`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
