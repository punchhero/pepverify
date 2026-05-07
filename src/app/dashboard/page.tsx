"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, Users, Database, Filter, Search, TrendingUp } from "lucide-react";
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
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col bg-[#080808] text-[#F0F0F0] pb-12 min-h-full">
      {/* Page Header */}
      <div className="px-8 py-8 border-b border-white/[0.06]">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-white mb-1.5">Verification Index</h1>
            <p className="text-[14px] text-[#888]">On-chain provenance for research compound suppliers.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666]" />
              <input
                type="text"
                placeholder="Search suppliers or compounds..."
                className="h-9 w-64 rounded-lg border border-white/[0.08] bg-white/[0.03] px-9 text-[13px] text-white placeholder:text-[#666] focus:outline-none focus:ring-1 focus:ring-[#5E6AD2]/50 transition-all"
              />
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 text-[13px] font-medium text-[#888] hover:text-white hover:bg-white/[0.06] transition-colors">
              <Filter className="w-3.5 h-3.5" /> Filter
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
              <div className="rounded-xl border border-white/[0.06] bg-[#0C0C0C] p-5 flex items-center justify-between">
                <div>
                  <p className="text-[12px] text-[#666] font-medium mb-1.5">{stat.label}</p>
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
        <motion.div variants={fadeUp} className="rounded-xl border border-white/[0.06] bg-[#0C0C0C] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-5 py-3.5 text-[12px] font-medium text-[#666] w-12 text-center">#</th>
                  <th className="px-5 py-3.5 text-[12px] font-medium text-[#666]">Supplier</th>
                  <th className="px-5 py-3.5 text-[12px] font-medium text-[#666] text-center">Trust Score</th>
                  <th className="px-5 py-3.5 text-[12px] font-medium text-[#666]">Key Compounds</th>
                  <th className="px-5 py-3.5 text-[12px] font-medium text-[#666] text-center">Attestations</th>
                  <th className="px-5 py-3.5 text-[12px] font-medium text-[#666]">Coverage</th>
                  <th className="px-5 py-3.5 text-[12px] font-medium text-[#666] text-right">Actions</th>
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
                    <td className="px-5 py-4 text-center">
                      <span className="text-[12px] font-mono text-[#555]">{index + 1}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/[0.06] flex items-center justify-center text-[12px] font-bold text-[#666] shrink-0">
                          {supplier.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-white flex items-center gap-1.5 mb-0.5">
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
                      <span className={`inline-block font-mono font-semibold text-[13px] px-2.5 py-0.5 rounded-md
                        ${supplier.trustScore >= 95 ? 'bg-[#5E6AD2]/10 text-[#5E6AD2]' :
                          supplier.trustScore >= 88 ? 'bg-[#2EA043]/10 text-[#2EA043]' :
                          'bg-[#E3B341]/10 text-[#E3B341]'}`}>
                        {supplier.trustScore}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 flex-wrap">
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
                    </td>
                    <td className="px-5 py-4 text-center font-mono text-[13px] font-medium text-[#ccc]">
                      {supplier.attestationCount}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[12px] text-[#666] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2EA043] inline-block"></span>
                        {supplier.shipsTo.join(", ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/supplier/${supplier.id}`} className="inline-flex items-center gap-1 text-[12px] font-medium text-[#666] hover:text-white transition-colors group-hover:text-[#5E6AD2]">
                        Inspect <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-white/[0.06] bg-white/[0.01] flex justify-between items-center">
            <p className="text-[12px] text-[#666]">{sortedSuppliers.length} entities indexed</p>
            <div className="flex items-center gap-2 text-[12px] text-[#666]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2EA043] animate-pulse inline-block"></span>
              Live network sync
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
