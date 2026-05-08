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
            <h1 className="text-[22px] font-mono font-semibold tracking-[-0.02em] text-white mb-1.5 flex items-center gap-2">
              <Dna className="w-5 h-5 text-[#5E6AD2]" /> SUPPLIER_DIRECTORY
            </h1>
            <p className="text-[13px] font-mono text-[#888]">// Verified research peptide suppliers indexed by trust score and attestations.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative w-full md:w-64 flex items-center group">
              <span className="absolute left-3 text-[#5E6AD2] font-mono text-[13px]">&gt;</span>
              <input
                placeholder="search_name_or_compound..."
                className="h-9 w-full rounded border border-[#333] bg-[#0C0C0C] px-7 font-mono text-[13px] text-white placeholder:text-[#666] focus:outline-none focus:border-[#5E6AD2]/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-3 w-1.5 h-4 bg-[#5E6AD2] animate-pulse opacity-0 group-focus-within:opacity-100"></span>
            </div>
            <button className="inline-flex h-9 items-center justify-center rounded border border-[#333] bg-[#0C0C0C] px-3.5 font-mono text-[12px] text-[#888] hover:text-white hover:border-[#5E6AD2]/50 transition-colors card-crosshair">
              <Filter className="h-3.5 w-3.5 mr-1.5" /> [FILTER]
            </button>
          </div>
        </motion.div>

        {/* Directory Table */}
        <motion.div variants={fadeUp} className="rounded border border-[#333] bg-[#0C0C0C] overflow-hidden mt-8 card-crosshair relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5E6AD2]/20 to-transparent"></div>
          <div className="grid grid-cols-12 text-[10px] font-mono font-medium text-[#666] border-b border-[#333] bg-[#141414]/50 p-4 uppercase tracking-widest">
            <div className="col-span-4 pl-1">Supplier_Entity</div>
            <div className="col-span-2 text-center">Trust_Metric</div>
            <div className="col-span-3">Indexed_Compounds</div>
            <div className="col-span-2 text-center">Network_Attests</div>
            <div className="col-span-1 text-right pr-1">Action</div>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {filteredSuppliers.map((supplier, index) => (
              <motion.div 
                key={supplier.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.04 }}
                className="grid grid-cols-12 text-[14px] p-4 items-center hover:bg-white/[0.02] transition-colors group"
              >
                <div className="col-span-4 flex flex-col gap-1 pl-1 border-r border-[#333]/30 pr-2">
                  <div className="font-mono font-medium text-white flex items-center gap-2">
                    {supplier.name}
                    {supplier.verified && <ShieldCheck className="h-3.5 w-3.5 text-[#2EA043]" />}
                  </div>
                  <div className="text-[10px] font-mono text-[#666] flex items-center gap-1.5 uppercase tracking-wider">
                    <Globe className="h-3 w-3" /> {supplier.shipsTo.join(", ")}
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <div className={`px-2 py-0.5 rounded border flex items-center justify-center font-bold font-mono text-[13px]
                    ${supplier.trustScore >= 95 ? 'bg-[#5E6AD2]/10 text-[#5E6AD2] border-[#5E6AD2]/20' : 
                      supplier.trustScore >= 88 ? 'bg-[#2EA043]/10 text-[#2EA043] border-[#2EA043]/20' : 
                      'bg-[#E3B341]/10 text-[#E3B341] border-[#E3B341]/20'}`}>
                    {supplier.trustScore}
                  </div>
                </div>

                <div className="col-span-3 flex flex-wrap gap-1.5">
                  {supplier.compoundsSupported.slice(0, 3).map(c => (
                    <span key={c} className="text-[10px] font-mono font-medium px-1.5 py-0.5 bg-[#141414] rounded text-[#888] border border-[#333]">
                      {c}
                    </span>
                  ))}
                  {supplier.compoundsSupported.length > 3 && (
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 border border-[#333] rounded text-[#666]">
                      +{supplier.compoundsSupported.length - 3}
                    </span>
                  )}
                </div>

                <div className="col-span-2 flex justify-center">
                  <span className="font-mono font-medium text-[13px] text-[#ccc]">{supplier.attestationCount}</span>
                </div>

                <div className="col-span-1 flex justify-end pr-1">
                  <Link href={`/supplier/${supplier.id}`}>
                    <button className="text-[11px] font-mono font-medium text-[#5E6AD2] hover:text-[#7C85E0] transition-colors border border-[#5E6AD2]/20 px-2 py-1 rounded-sm">
                      [INSPECT]
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredSuppliers.length === 0 && (
            <div className="p-8 text-center text-[#666] text-[13px] font-mono">
              [SYSTEM_WARNING] No suppliers found matching query: {searchTerm}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
