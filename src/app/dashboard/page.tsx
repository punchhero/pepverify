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
    <div className="flex flex-col bg-[#080808] bg-hex-pattern text-[#F0F0F0] pb-12 min-h-full">
      {/* Page Header */}
      <div className="px-8 py-8 border-b border-white/[0.06]">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[22px] font-medium tracking-tight text-[#EAEAEA] mb-1.5 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-[#2DD4BF]" /> Clinical Data Index
            </h1>
            <p className="text-[13px] text-[#A1A1AA]">Cryptographic Provenance Protocol for Chemical Entities.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative flex items-center group">
              <Search className="absolute left-3 w-3.5 h-3.5 text-[#2DD4BF]" />
              <input
                type="text"
                placeholder="Search queries..."
                className="h-9 w-64 rounded-md border border-[#222] bg-[#0A0A0A] px-9 text-[13px] text-[#EAEAEA] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#2DD4BF]/50 transition-all shadow-sm"
              />
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-md border border-[#222] bg-[#0A0A0A] px-3.5 text-[12px] font-medium text-[#EAEAEA] hover:bg-[#111] transition-colors shadow-sm">
              <Filter className="w-3.5 h-3.5 text-[#A1A1AA]" /> Filter
            </button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={container} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Indexed Laboratories", value: MOCK_SUPPLIERS.length, icon: Users, color: "text-white" },
            { label: "Verified Entities", value: verifiedCount, icon: ShieldCheck, color: "text-[#2EA043]" },
            { label: "On-Chain Attests", value: totalAttests, icon: Database, color: "text-[#2DD4BF]" },
            { label: "Spectrometry Scans", value: "2,419", icon: Activity, color: "text-white" },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="rounded-lg border border-[#222] bg-[#0A0A0A] p-5 flex items-center justify-between shadow-sm hover:border-[#333] transition-colors">
                <div>
                  <p className="text-[12px] text-[#A1A1AA] font-medium mb-1.5">{stat.label}</p>
                  <p className={`text-[24px] font-medium tracking-tight ${stat.color === 'text-white' ? 'text-[#EAEAEA]' : stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className="w-4 h-4 text-[#555]" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="px-8 pt-8">
        <motion.div variants={fadeUp} className="rounded-xl border border-[#222] bg-[#0A0A0A] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#222] bg-[#111]/50">
                  <th className="px-5 py-3 text-[11px] font-medium text-[#A1A1AA] w-12 text-center">ID</th>
                  <th className="px-5 py-3 text-[11px] font-medium text-[#A1A1AA]">Entity Name</th>
                  <th className="px-5 py-3 text-[11px] font-medium text-[#A1A1AA] text-center">Trust Metric</th>
                  <th className="px-5 py-3 text-[11px] font-medium text-[#A1A1AA]">Compounds Indexed</th>
                  <th className="px-5 py-3 text-[11px] font-medium text-[#A1A1AA] text-center">Network Attests</th>
                  <th className="px-5 py-3 text-[11px] font-medium text-[#A1A1AA]">Shipping Zone</th>
                  <th className="px-5 py-3 text-[11px] font-medium text-[#A1A1AA] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {sortedSuppliers.map((supplier, index) => (
                  <motion.tr
                    key={supplier.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.04 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-5 py-4 text-center border-r border-[#222]/50">
                      <span className="text-[11px] font-mono text-[#A1A1AA]">0{index + 1}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded border border-[#333] bg-[#111] flex items-center justify-center text-[12px] font-medium text-[#EAEAEA] shrink-0">
                          {supplier.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[13px] font-medium text-[#EAEAEA] flex items-center gap-1.5 mb-0.5">
                            {supplier.name}
                            {supplier.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#2EA043]" />}
                          </div>
                          <a href={supplier.website} target="_blank" rel="noopener noreferrer"
                            className="text-[12px] text-[#A1A1AA] hover:text-[#2DD4BF] transition-colors">
                            {supplier.website.replace("https://", "")}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex items-center justify-center font-medium text-[12px] px-2 py-0.5 rounded-md
                        ${supplier.trustScore >= 95 ? 'bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20' :
                          supplier.trustScore >= 88 ? 'bg-[#2EA043]/10 text-[#2EA043] border border-[#2EA043]/20' :
                          'bg-[#E3B341]/10 text-[#E3B341] border border-[#E3B341]/20'}`}>
                        {supplier.trustScore}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 flex-wrap">
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
                    </td>
                    <td className="px-5 py-4 text-center font-mono text-[13px] font-medium text-[#EAEAEA]">
                      {supplier.attestationCount}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[12px] text-[#A1A1AA] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2EA043] inline-block"></span>
                        {supplier.shipsTo.join(", ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/supplier/${supplier.id}`} className="inline-flex items-center gap-1 text-[12px] font-medium text-[#EAEAEA] hover:bg-[#111] transition-colors border border-[#333] px-3 py-1.5 rounded-md shadow-sm">
                        Inspect <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-[#222] bg-[#0A0A0A] flex justify-between items-center">
            <p className="text-[11px] text-[#A1A1AA]">Indexed Entities: <span className="font-medium text-[#EAEAEA]">{sortedSuppliers.length}</span></p>
            <div className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2EA043] inline-block"></span>
              Network sync active
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
