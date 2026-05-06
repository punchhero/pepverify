"use client";

import { MOCK_SUPPLIERS } from "@/lib/data";
import { Trophy, ShieldCheck, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  // Mock trend data
  const getTrend = (index: number) => {
    if (index === 0) return { type: "up", value: "+2", icon: ArrowUpRight, color: "text-emerald-500" };
    if (index === 1) return { type: "up", value: "+1", icon: ArrowUpRight, color: "text-emerald-500" };
    if (index === 2) return { type: "neutral", value: "-", icon: Minus, color: "text-muted-foreground" };
    if (index === 3) return { type: "down", value: "-1", icon: ArrowDownRight, color: "text-destructive" };
    return { type: "neutral", value: "-", icon: Minus, color: "text-muted-foreground" };
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="flex flex-col h-full bg-background/50"
    >
      <div className="px-6 py-8 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(6,182,212,0.15)] relative overflow-hidden">
              <Trophy className="w-8 h-8 text-primary" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
            </div>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight mb-2">Transparency Leaderboard</motion.h1>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
            Ranking the peptide research ecosystem by verifiable on-chain evidence, trust scores, and community governance.
          </motion.p>
        </div>
      </div>

      <div className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sortedSuppliers.slice(0, 3).map((supplier, index) => (
            <motion.div key={supplier.id} variants={itemVariants} whileHover={{ y: -5 }}>
              <Card className={`relative overflow-hidden h-full bg-card/60 backdrop-blur-md transition-colors ${index === 0 ? 'border-primary/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'hover:border-primary/30 border-border/50'}`}>
                {index === 0 && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
                )}
                <CardHeader className="text-center pb-2">
                  <div className="text-4xl font-bold text-muted/30 absolute top-4 right-4 -z-10 select-none font-mono">
                    #{index + 1}
                  </div>
                  <CardTitle className="text-xl flex flex-col items-center gap-2">
                    {supplier.name}
                    {supplier.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                  </CardTitle>
                  <CardDescription>Top Tier Supplier</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="text-4xl font-bold text-primary font-mono">{supplier.trustScore}</div>
                    <div className="text-sm text-muted-foreground ml-1 mt-auto pb-1 font-mono">/ 100</div>
                  </div>
                  <div className="flex justify-center gap-4 text-sm border-t border-border pt-4">
                    <div>
                      <span className="font-semibold block font-mono text-lg">{supplier.attestationCount}</span>
                      <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Attestations</span>
                    </div>
                    <div>
                      <span className="font-semibold block font-mono text-lg">{supplier.compoundsSupported.length}</span>
                      <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Compounds</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants}>
          <div className="bg-card/40 border border-border/50 rounded-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border/50 bg-muted/10 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Global Indexed Suppliers</h2>
                <p className="text-xs text-muted-foreground">Ordered by algorithmic trust score</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/20 text-muted-foreground border-b border-border/50">
                  <tr>
                    <th className="px-6 py-3 font-semibold tracking-wider w-16 text-center">Rank</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Supplier Entity</th>
                    <th className="px-6 py-3 font-semibold tracking-wider text-center">Trust Score</th>
                    <th className="px-6 py-3 font-semibold tracking-wider text-center">Attestations</th>
                    <th className="px-6 py-3 font-semibold tracking-wider text-center">Trend (7d)</th>
                    <th className="px-6 py-3 font-semibold tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
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
                        className="hover:bg-muted/10 transition-colors even:bg-muted/5"
                      >
                        <td className="px-6 py-3 whitespace-nowrap text-center font-mono text-muted-foreground font-semibold">
                          {index + 1}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap font-medium flex items-center gap-2">
                          {supplier.name}
                          {supplier.verified && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-center">
                          <Badge variant="outline" className={`font-mono text-xs rounded-sm border px-2 py-0.5
                            ${supplier.trustScore >= 90 ? 'bg-primary/5 text-primary border-primary/20' : 
                              supplier.trustScore >= 80 ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' : 
                              'bg-destructive/5 text-destructive border-destructive/20'}
                          `}>
                            {supplier.trustScore}
                          </Badge>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-center font-mono text-muted-foreground">
                          {supplier.attestationCount}
                        </td>
                        <td className={`px-6 py-3 whitespace-nowrap text-center font-mono text-xs ${trend.color}`}>
                          <div className="flex items-center justify-center gap-1">
                            <TrendIcon className="w-3 h-3" />
                            {trend.value}
                          </div>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-right">
                          <Link href={`/supplier/${supplier.id}`}>
                            <span className="text-primary hover:text-primary/80 transition-colors cursor-pointer text-[10px] uppercase tracking-wider font-bold border border-primary/20 px-3 py-1.5 rounded-sm bg-primary/5 hover:bg-primary/10">
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
