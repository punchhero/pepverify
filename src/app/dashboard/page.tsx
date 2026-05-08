"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, Users, Database, Filter, Search, Terminal, Cpu } from "lucide-react";
import { MOCK_SUPPLIERS } from "@/lib/data";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

export default function DashboardPage() {
  const verifiedCount = MOCK_SUPPLIERS.filter(s => s.verified).length;
  const totalAttests = MOCK_SUPPLIERS.reduce((acc, curr) => acc + curr.attestationCount, 0);
  const sortedSuppliers = [...MOCK_SUPPLIERS].sort((a, b) => b.trustScore - a.trustScore);

  return (
    <div className="flex flex-col bg-[#080808] bg-grid-fine text-[#F0F0F0] pb-12 min-h-full">
      {/* Page Header */}
      <div className="px-8 py-8 border-b border-white/[0.06]">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-mono font-semibold tracking-[-0.02em] text-white mb-1.5 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#5E6AD2]" /> SYSTEM_INDEX
            </h1>
            <p className="text-[13px] font-mono text-[#888]">// On-chain provenance for research compound suppliers.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative flex items-center group">
              <span className="absolute left-3 text-[#5E6AD2] font-mono text-[13px]">&gt;</span>
              <input
                type="text"
                placeholder="search_query..."
                className="h-9 w-64 rounded border border-[#333] bg-[#0C0C0C] px-7 font-mono text-[13px] text-white placeholder:text-[#666] focus:outline-none focus:border-[#5E6AD2]/50 transition-all"
              />
              <span className="absolute right-3 w-1.5 h-4 bg-[#5E6AD2] animate-pulse opacity-0 group-focus-within:opacity-100"></span>
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded border border-[#333] bg-[#0C0C0C] px-3.5 font-mono text-[12px] font-medium text-[#888] hover:text-white hover:border-[#5E6AD2]/50 transition-colors card-crosshair">
              <Filter className="w-3.5 h-3.5" /> [FILTER]
            </button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={container} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Indexed Suppliers", value: MOCK_SUPPLIERS.length, icon: Users, color: "text-white" },
            { label: "Verified Entities", value: verifiedCount, icon: ShieldCheck, color: "text-[#2EA043]" },
            { label: "On-Chain Attests", value: totalAttests, icon: Database, color: "text-[#5E6AD2]" },
            { label: "Network Scans", value: "2,419", icon: Activity, color: "text-white" },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="rounded border border-[#333] bg-[#0C0C0C] p-5 flex items-center justify-between card-crosshair hover:border-[#5E6AD2]/30 transition-colors">
                <div>
                  <p className="text-[10px] font-mono text-[#666] font-medium mb-1.5 uppercase tracking-wider">{stat.label}</p>
                  <p className={`text-[24px] font-semibold font-mono tracking-[-0.03em] ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className="w-4 h-4 text-[#444]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Supplier Table */}
      <div className="px-8 pt-8">
        <motion.div variants={fadeUp} className="rounded border border-[#333] bg-[#0C0C0C] overflow-hidden card-crosshair relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5E6AD2]/20 to-transparent"></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#333] bg-[#141414]/50">
                  <th className="px-5 py-3.5 text-[10px] font-mono font-medium text-[#666] w-12 text-center uppercase tracking-widest">ID</th>
                  <th className="px-5 py-3.5 text-[10px] font-mono font-medium text-[#666] uppercase tracking-widest">Entity_Name</th>
                  <th className="px-5 py-3.5 text-[10px] font-mono font-medium text-[#666] text-center uppercase tracking-widest">Trust_Metric</th>
                  <th className="px-5 py-3.5 text-[10px] font-mono font-medium text-[#666] uppercase tracking-widest">Compounds_Indexed</th>
                  <th className="px-5 py-3.5 text-[10px] font-mono font-medium text-[#666] text-center uppercase tracking-widest">Network_Attests</th>
                  <th className="px-5 py-3.5 text-[10px] font-mono font-medium text-[#666] uppercase tracking-widest">Shipping_Zone</th>
                  <th className="px-5 py-3.5 text-[10px] font-mono font-medium text-[#666] text-right uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {sortedSuppliers.map((supplier, index) => (
                  <motion.tr
                    key={supplier.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.04 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-5 py-4 text-center border-r border-[#333]/50">
                      <span className="text-[11px] font-mono text-[#5E6AD2]">0{index + 1}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#141414] border border-[#333] flex items-center justify-center text-[12px] font-bold font-mono text-[#666] shrink-0">
                          {supplier.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[13px] font-mono font-medium text-white flex items-center gap-1.5 mb-0.5">
                            {supplier.name}
                            {supplier.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#2EA043]" />}
                          </div>
                          <a href={supplier.website} target="_blank" rel="noopener noreferrer"
                            className="text-[12px] text-[#666] hover:text-[#5E6AD2] transition-colors">
                            {supplier.website.replace("https://", "")}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-block font-mono font-semibold text-[13px] px-2 py-0.5 rounded
                        ${supplier.trustScore >= 95 ? 'bg-[#5E6AD2]/10 text-[#5E6AD2] border border-[#5E6AD2]/20' :
                          supplier.trustScore >= 88 ? 'bg-[#2EA043]/10 text-[#2EA043] border border-[#2EA043]/20' :
                          'bg-[#E3B341]/10 text-[#E3B341] border border-[#E3B341]/20'}`}>
                        {supplier.trustScore}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 flex-wrap">
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
                    </td>
                    <td className="px-5 py-4 text-center font-mono text-[13px] font-medium text-[#ccc]">
                      {supplier.attestationCount}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-mono text-[#666] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#2EA043] inline-block"></span>
                        {supplier.shipsTo.join(", ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/supplier/${supplier.id}`} className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#5E6AD2] hover:text-[#7C85E0] transition-colors border border-[#5E6AD2]/20 px-2 py-1 rounded-sm">
                        [INSPECT] <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-[#333] bg-[#141414] flex justify-between items-center">
            <p className="text-[10px] font-mono text-[#666]">SYSTEM.INDEXED_ENTITIES: {sortedSuppliers.length}</p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#2EA043]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2EA043] animate-pulse inline-block"></span>
              NETWORK_SYNC_ACTIVE
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
