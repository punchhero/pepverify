"use client";

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ShieldCheck } from "lucide-react";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#080808]/90 backdrop-blur-xl h-14 flex items-center">
      <div className="flex items-center justify-between px-5 w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-5 h-5 rounded-md bg-[#5E6AD2]/20 flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 text-[#5E6AD2]" />
          </div>
          <span className="text-[13px] font-semibold tracking-tight text-white">PepVerify</span>
        </Link>

        <div className="flex items-center gap-3">
          <WalletMultiButton className="!bg-white/[0.06] !text-[#888] hover:!bg-white/[0.08] hover:!text-white !h-8 !px-3 !text-[12px] !font-medium !rounded-lg !transition-all !duration-200 !border !border-white/[0.08]" />
        </div>
      </div>
    </header>
  );
}
