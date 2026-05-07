"use client";

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Search, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-6 max-w-[2000px] mx-auto w-full justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold tracking-tight text-lg text-foreground">PepVerify</span>
        </div>
        
        <div className="flex flex-1 items-center justify-between md:justify-end gap-4">
          <div className="w-full max-w-sm hidden md:flex items-center relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search suppliers, compounds, CIDs..."
              className="w-full bg-muted/50 pl-9 border-none focus-visible:ring-1 focus-visible:ring-primary h-9"
            />
          </div>
          <nav className="flex items-center gap-4">
            {/* Wallet adapter component handles its own dark mode depending on global classes, 
                but we might need to override some CSS to match our dark green aesthetic later. */}
            <WalletMultiButton className="!bg-primary/10 !text-primary hover:!bg-primary/20 !h-9 !px-4 !text-sm !font-medium !rounded-md !transition-colors !border !border-primary/20" />
          </nav>
        </div>
      </div>
    </header>
  );
}
