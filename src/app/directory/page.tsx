"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_SUPPLIERS } from "@/lib/data";
import { Search, ShieldCheck, Globe, Filter, Terminal, Dna } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = MOCK_SUPPLIERS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.compoundsSupported.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => b.trustScore - a.trustScore);

  return (
    <div className="flex flex-col bg-[#080808] bg-grid-fine text-[#F0F0F0] pb-12 min-h-full">
      <div className="px-8 py-8 border-b border-white/[0.06]">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-medium tracking-tight text-[#EAEAEA] mb-1.5 flex items-center gap-2">
              <Dna className="w-5 h-5 text-[#5E6AD2]" /> Supplier Directory
            </h1>
            <p className="text-[13px] text-[#A1A1AA]">// Verified research peptide suppliers indexed by trust score and attestations.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative w-full md:w-64 flex items-center group">
              <Search className="absolute left-3 w-3.5 h-3.5 text-[#5E6AD2]" />
              <input
                placeholder="Search name or compound..."
                className="h-9 w-full rounded-md border border-[#222] bg-[#0A0A0A] px-9 text-[13px] text-[#EAEAEA] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#5E6AD2]/50 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#222] bg-[#0A0A0A] px-3.5 text-[12px] font-medium text-[#EAEAEA] hover:bg-[#111] transition-colors shadow-sm">
              <Filter className="h-3.5 w-3.5 text-[#A1A1AA]" /> Filter
            </button>
          </div>
        </motion.div>

        {/* Directory Table */}
        <motion.div variants={fadeUp} className="rounded-xl border border-[#222] bg-[#0A0A0A] overflow-hidden mt-8 shadow-sm">
          <div className="grid grid-cols-12 text-[11px] font-medium text-[#A1A1AA] border-b border-[#222] bg-[#111]/50 p-3 px-4">
            <div className="col-span-4 pl-1">Supplier Entity</div>
            <div className="col-span-2 text-center">Trust Metric</div>
            <div className="col-span-3">Indexed Compounds</div>
            <div className="col-span-2 text-center">Network Attests</div>
            <div className="col-span-1 text-right pr-1">Action</div>
          </div>
          <div className="divide-y divide-[#222]">
            {filteredSuppliers.map((supplier, index) => (
              <motion.div 
                key={supplier.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.04 }}
                className="grid grid-cols-12 text-[13px] p-4 items-center hover:bg-[#111] transition-colors group"
              >
                <div className="col-span-4 flex flex-col gap-1 pl-1 border-r border-[#222]/50 pr-2">
                  <div className="font-medium text-[#EAEAEA] flex items-center gap-2">
                    {supplier.name}
                    {supplier.verified && <ShieldCheck className="h-3.5 w-3.5 text-[#2EA043]" />}
                  </div>
                  <div className="text-[12px] text-[#A1A1AA] flex items-center gap-1.5">
                    <Globe className="h-3 w-3" /> {supplier.shipsTo.join(", ")}
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <div className={`px-2 py-0.5 rounded-md flex items-center justify-center font-medium text-[12px]
                    ${supplier.trustScore >= 95 ? 'bg-[#5E6AD2]/10 text-[#5E6AD2] border border-[#5E6AD2]/20' : 
                      supplier.trustScore >= 88 ? 'bg-[#2EA043]/10 text-[#2EA043] border border-[#2EA043]/20' : 
                      'bg-[#E3B341]/10 text-[#E3B341] border border-[#E3B341]/20'}`}>
                    {supplier.trustScore}
                  </div>
                </div>

                <div className="col-span-3 flex flex-wrap gap-1.5">
                  {supplier.compoundsSupported.slice(0, 3).map(c => (
                    <span key={c} className="text-[11px] px-2 py-0.5 bg-[#111] rounded-md text-[#A1A1AA] border border-[#222]">
                      {c}
                    </span>
                  ))}
                  {supplier.compoundsSupported.length > 3 && (
                    <span className="text-[11px] px-2 py-0.5 border border-[#222] rounded-md text-[#666]">
                      +{supplier.compoundsSupported.length - 3}
                    </span>
                  )}
                </div>

                <div className="col-span-2 flex justify-center">
                  <span className="font-mono font-medium text-[13px] text-[#EAEAEA]">{supplier.attestationCount}</span>
                </div>

                <div className="col-span-1 flex justify-end pr-1">
                  <Link href={`/supplier/${supplier.id}`}>
                    <button className="text-[12px] font-medium text-[#EAEAEA] hover:bg-[#111] transition-colors border border-[#333] px-3 py-1.5 rounded-md shadow-sm">
                      Inspect
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredSuppliers.length === 0 && (
            <div className="p-8 text-center text-[#A1A1AA] text-[13px]">
              No suppliers found matching query: <span className="text-[#EAEAEA]">"{searchTerm}"</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
