"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_SUPPLIERS } from "@/lib/data";
import { Search, ShieldCheck, Globe, Filter } from "lucide-react";
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
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col bg-[#080808] text-[#F0F0F0] pb-12 min-h-full">
      <div className="px-8 py-8 border-b border-white/[0.06]">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-white mb-1.5">Supplier Directory</h1>
            <p className="text-[14px] text-[#888]">Verified research peptide suppliers indexed by trust score and attestations.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666]" />
              <input
                placeholder="Search by name or compound..."
                className="h-9 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-9 text-[13px] text-white placeholder:text-[#666] focus:outline-none focus:ring-1 focus:ring-[#5E6AD2]/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="inline-flex h-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 text-[#888] hover:text-white hover:bg-white/[0.06] transition-colors">
              <Filter className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Directory Table */}
        <motion.div variants={fadeUp} className="rounded-xl border border-white/[0.06] bg-[#0C0C0C] overflow-hidden mt-8">
          <div className="grid grid-cols-12 text-[12px] font-medium text-[#666] border-b border-white/[0.06] bg-white/[0.02] p-4">
            <div className="col-span-4 pl-1">Supplier</div>
            <div className="col-span-2 text-center">Trust Score</div>
            <div className="col-span-3">Top Compounds</div>
            <div className="col-span-2 text-center">Attestations</div>
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
                <div className="col-span-4 flex flex-col gap-1 pl-1">
                  <div className="font-medium text-white flex items-center gap-2">
                    {supplier.name}
                    {supplier.verified && <ShieldCheck className="h-3.5 w-3.5 text-[#2EA043]" />}
                  </div>
                  <div className="text-[12px] text-[#666] flex items-center gap-1.5">
                    <Globe className="h-3 w-3" /> {supplier.shipsTo.join(", ")}
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold font-mono text-[13px]
                    ${supplier.trustScore >= 95 ? 'bg-[#5E6AD2]/10 text-[#5E6AD2]' : 
                      supplier.trustScore >= 88 ? 'bg-[#2EA043]/10 text-[#2EA043]' : 
                      'bg-[#E3B341]/10 text-[#E3B341]'}`}>
                    {supplier.trustScore}
                  </div>
                </div>

                <div className="col-span-3 flex flex-wrap gap-1.5">
                  {supplier.compoundsSupported.slice(0, 3).map(c => (
                    <span key={c} className="text-[11px] font-medium px-2 py-0.5 bg-white/[0.04] rounded-md text-[#888] border border-white/[0.06]">
                      {c}
                    </span>
                  ))}
                  {supplier.compoundsSupported.length > 3 && (
                    <span className="text-[11px] font-medium px-2 py-0.5 border border-white/[0.06] rounded-md text-[#666]">
                      +{supplier.compoundsSupported.length - 3}
                    </span>
                  )}
                </div>

                <div className="col-span-2 flex justify-center">
                  <span className="font-mono font-medium text-[13px] text-[#ccc]">{supplier.attestationCount}</span>
                </div>

                <div className="col-span-1 flex justify-end pr-1">
                  <Link href={`/supplier/${supplier.id}`}>
                    <button className="text-[12px] font-medium text-[#666] hover:text-white transition-colors group-hover:text-[#5E6AD2]">
                      View
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredSuppliers.length === 0 && (
            <div className="p-8 text-center text-[#666] text-[13px]">
              No suppliers found matching your criteria.
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
