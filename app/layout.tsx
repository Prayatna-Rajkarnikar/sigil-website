import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/component/Nav";
import Footer from "@/component/Footer";
import ScrollProgress from "@/component/ScrollProgress";
import MouseSpotlight from "@/component/MouseSpotlight";
import PageTransition from "@/component/PageTransition";
import { caveat, dmSerifDisplay, roboto } from "./font";
import { PRIMARY, PRIMARY_RGB } from "@/lib/theme";

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
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--primary:${PRIMARY};--primary-rgb:${PRIMARY_RGB};}`,
          }}
        />
      </head>
      <body
        className={`${roboto.className} ${caveat.variable} ${dmSerifDisplay.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ScrollProgress />
        <MouseSpotlight />
        <Nav />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
