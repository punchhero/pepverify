"use client";

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ShieldCheck } from "lucide-react";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#222] bg-[#0A0A0A]/80 backdrop-blur-md h-[52px] flex items-center">
      <div className="flex items-center justify-between px-6 w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded flex items-center justify-center border border-[#333] bg-[#111] group-hover:border-[#444] transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-[#EAEAEA]" />
          </div>
          <span className="text-[13px] font-medium tracking-tight text-[#EAEAEA]">PepTrace</span>
        </Link>

        <div className="flex items-center gap-3">
          <WalletMultiButton className="!bg-transparent !text-[#A1A1AA] hover:!text-[#EAEAEA] hover:!border-[#444] !h-[36px] !px-4 !text-[13px] !font-medium !rounded-md !transition-all !duration-200 !border !border-[#333]" />
        </div>
      </div>
    </header>
  );
}
