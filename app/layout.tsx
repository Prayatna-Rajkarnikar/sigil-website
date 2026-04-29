import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/component/Nav";
import Footer from "@/component/Footer";
import TacticalCursor from "@/component/TacticalCursor";
import { roboto } from "./font";

export const metadata: Metadata = {
  title: "Sigil — Agentic Decision Modeling",
  description:
    "Sigil deploys autonomous AI agents into high-fidelity simulated environments. Train your army, stress-test your models, rehearse your strategy — before the real world ever sees it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased bg-background text-foreground min-h-screen`}
      >
        <TacticalCursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
