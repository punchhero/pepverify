"use client";

import { MOCK_SUPPLIERS } from "@/lib/data";
import { Trophy, ShieldCheck, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function LeaderboardPage() {
  const sortedSuppliers = [...MOCK_SUPPLIERS].sort((a, b) => b.trustScore - a.trustScore);

  const getTrend = (index: number) => {
    if (index === 0) return { type: "up", value: "+2", icon: ArrowUpRight, color: "text-[#2EA043]" };
    if (index === 1) return { type: "up", value: "+1", icon: ArrowUpRight, color: "text-[#2EA043]" };
    if (index === 2) return { type: "neutral", value: "-", icon: Minus, color: "text-[#666]" };
    if (index === 3) return { type: "down", value: "-1", icon: ArrowDownRight, color: "text-[#F85149]" };
    return { type: "neutral", value: "-", icon: Minus, color: "text-[#666]" };
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="flex flex-col h-full bg-[#080808] text-[#F0F0F0] pb-12 min-h-full"
    >
      <div className="px-8 py-10 border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#5E6AD2]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto w-full text-center relative z-10">
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-[#5E6AD2]/10 flex items-center justify-center border border-[#5E6AD2]/20">
              <Trophy className="w-6 h-6 text-[#5E6AD2]" />
            </div>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-[32px] font-semibold tracking-[-0.03em] mb-3 text-white">Transparency Leaderboard</motion.h1>
          <motion.p variants={itemVariants} className="text-[15px] text-[#888] max-w-2xl mx-auto leading-relaxed">
            Ranking the peptide research ecosystem by verifiable on-chain evidence, trust scores, and community governance.
          </motion.p>
        </div>
      </div>

      <div className="flex-1 px-8 py-12 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sortedSuppliers.slice(0, 3).map((supplier, index) => (
            <motion.div key={supplier.id} variants={itemVariants} whileHover={{ y: -4 }}>
              <div className={`relative overflow-hidden h-full rounded-2xl bg-[#0C0C0C] border transition-colors ${index === 0 ? 'border-[#5E6AD2]/40 shadow-[0_0_30px_rgba(94,106,210,0.1)]' : 'border-white/[0.06] hover:border-white/[0.12]'}`}>
                {index === 0 && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#5E6AD2]/0 via-[#5E6AD2] to-[#5E6AD2]/0" />
                )}
                <div className="p-6 text-center">
                  <div className="text-[40px] font-bold text-white/[0.03] absolute top-4 right-4 -z-0 select-none font-mono tracking-tighter">
                    #{index + 1}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white flex flex-col items-center gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        {supplier.name}
                        {supplier.verified && <ShieldCheck className="w-4 h-4 text-[#2EA043]" />}
                      </div>
                    </h3>
                    <p className="text-[12px] text-[#666] uppercase tracking-wider mb-6">Top Tier Supplier</p>
                    
                    <div className="flex justify-center items-end gap-1 mb-6">
                      <div className="text-[48px] font-semibold text-[#5E6AD2] font-mono leading-none tracking-[-0.04em]">{supplier.trustScore}</div>
                      <div className="text-[14px] text-[#666] font-mono pb-1">/ 100</div>
                    </div>
                    
                    <div className="flex justify-center gap-8 text-[13px] border-t border-white/[0.06] pt-5">
                      <div>
                        <span className="font-semibold block font-mono text-[18px] text-[#ccc]">{supplier.attestationCount}</span>
                        <span className="text-[#666] text-[10px] uppercase tracking-widest mt-1">Attestations</span>
                      </div>
                      <div>
                        <span className="font-semibold block font-mono text-[18px] text-[#ccc]">{supplier.compoundsSupported.length}</span>
                        <span className="text-[#666] text-[10px] uppercase tracking-widest mt-1">Compounds</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants}>
          <div className="bg-[#0C0C0C] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-white/[0.06] bg-white/[0.02] flex justify-between items-center">
              <div>
                <h2 className="text-[16px] font-semibold tracking-tight text-white mb-1">Global Indexed Suppliers</h2>
                <p className="text-[13px] text-[#666]">Ordered by algorithmic trust score</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/[0.01] border-b border-white/[0.06]">
                  <tr>
                    <th className="px-6 py-4 text-[12px] font-medium text-[#666] w-16 text-center">Rank</th>
                    <th className="px-6 py-4 text-[12px] font-medium text-[#666]">Supplier Entity</th>
                    <th className="px-6 py-4 text-[12px] font-medium text-[#666] text-center">Trust Score</th>
                    <th className="px-6 py-4 text-[12px] font-medium text-[#666] text-center">Attestations</th>
                    <th className="px-6 py-4 text-[12px] font-medium text-[#666] text-center">Trend (7d)</th>
                    <th className="px-6 py-4 text-[12px] font-medium text-[#666] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {sortedSuppliers.map((supplier, index) => {
                    const trend = getTrend(index);
                    const TrendIcon = trend.icon;
                    return (
                      <motion.tr 
                        key={supplier.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.03, duration: 0.3, ease: "easeOut" }}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-center font-mono text-[#555] text-[13px]">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-[14px] text-white flex items-center gap-2">
                          {supplier.name}
                          {supplier.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#2EA043]" />}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-block font-mono text-[13px] font-semibold px-2.5 py-0.5 rounded-md
                            ${supplier.trustScore >= 95 ? 'bg-[#5E6AD2]/10 text-[#5E6AD2]' : 
                              supplier.trustScore >= 88 ? 'bg-[#2EA043]/10 text-[#2EA043]' : 
                              'bg-[#E3B341]/10 text-[#E3B341]'}
                          `}>
                            {supplier.trustScore}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center font-mono text-[13px] text-[#ccc]">
                          {supplier.attestationCount}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-center font-mono text-[12px] ${trend.color}`}>
                          <div className="flex items-center justify-center gap-1">
                            <TrendIcon className="w-3 h-3" />
                            {trend.value}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Link href={`/supplier/${supplier.id}`}>
                            <span className="text-[#888] hover:text-white transition-colors cursor-pointer text-[12px] font-medium bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] px-3.5 py-1.5 rounded-lg">
                              View Record
                            </span>
                          </Link>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
