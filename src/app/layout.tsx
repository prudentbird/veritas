import "./globals.css";
import Providers from "./providers";
import type { Metadata } from "next";
import { Menu } from "~/components/menu";
import { Outfit, Inconsolata } from "next/font/google";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veritas",
  description: "Share the truth about fellow nads!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inconsolata.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Menu />
      </body>
    </html>
  );
}
