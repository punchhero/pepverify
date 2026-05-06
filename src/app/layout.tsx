import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PepVerify | On-chain Transparency for Research Peptides",
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
      className={`${inter.variable} font-sans h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <WalletProvider>
          <AppLayout>{children}</AppLayout>
        </WalletProvider>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
