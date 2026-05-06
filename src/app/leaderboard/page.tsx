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
          <Card className="bg-card/40 backdrop-blur-sm border-border/50 overflow-hidden">
            <CardHeader>
              <CardTitle>Global Rankings</CardTitle>
              <CardDescription>All indexed suppliers ordered by algorithmic trust score</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t border-border">
                <div className="grid grid-cols-12 text-xs font-semibold text-muted-foreground border-b border-border p-4 bg-muted/20 uppercase tracking-wider">
                  <div className="col-span-1 text-center">Rank</div>
                  <div className="col-span-4">Supplier Name</div>
                  <div className="col-span-2 text-center">Trust Score</div>
                  <div className="col-span-2 text-center">Attestations</div>
                  <div className="col-span-2 text-center">Trend</div>
                  <div className="col-span-1"></div>
                </div>
                <div className="divide-y divide-border/50">
                  {sortedSuppliers.map((supplier, index) => {
                    const trend = getTrend(index);
                    const TrendIcon = trend.icon;
                    return (
                      <motion.div 
                        key={supplier.id} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-12 text-sm p-4 items-center hover:bg-muted/10 transition-colors"
                      >
                        <div className="col-span-1 text-center font-bold text-muted-foreground font-mono">
                          {index + 1}
                        </div>
                        <div className="col-span-4 font-semibold flex items-center gap-2">
                          {supplier.name}
                          {supplier.verified && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <Badge variant="outline" className={`font-mono text-xs rounded-sm border
                            ${supplier.trustScore >= 90 ? 'bg-primary/10 text-primary border-primary/20' : 
                              supplier.trustScore >= 80 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                              'bg-destructive/10 text-destructive border-destructive/20'}
                          `}>
                            {supplier.trustScore}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-center font-mono text-muted-foreground">
                          {supplier.attestationCount}
                        </div>
                        <div className={`col-span-2 flex items-center justify-center gap-1 font-mono ${trend.color}`}>
                          <TrendIcon className="w-3 h-3" />
                          <span className="text-xs">{trend.value}</span>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Link href={`/supplier/${supplier.id}`}>
                            <div className="text-primary hover:text-primary/80 transition-colors cursor-pointer text-xs uppercase tracking-wider font-semibold border border-primary/20 px-2 py-1 rounded-sm bg-primary/5 hover:bg-primary/10">
                              View
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
