import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PepTrace | On-chain Transparency for Research Peptides",
  description: "A scientific transparency and verification platform for the peptide research ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} font-sans h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <WalletProvider>
          {children}
        </WalletProvider>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
