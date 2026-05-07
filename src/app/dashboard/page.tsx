"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, Users, Database, Filter, Search, TrendingUp } from "lucide-react";
import { MOCK_SUPPLIERS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col bg-background pb-12">
      {/* Page Header */}
      <div className="px-6 py-6 border-b border-border/60">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground mb-1">Verification Index</h1>
            <p className="text-sm text-muted-foreground">On-chain provenance for research compound suppliers.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search suppliers or compounds..."
                className="h-9 w-60 rounded-md border border-border bg-card px-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
              />
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={container} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Indexed Suppliers", value: MOCK_SUPPLIERS.length, icon: Users, color: "" },
            { label: "Verified Entities", value: verifiedCount, icon: ShieldCheck, color: "text-emerald-500" },
            { label: "On-Chain Attests", value: totalAttests, icon: Database, color: "text-primary" },
            { label: "Network Scans", value: "2,419", icon: Activity, color: "" },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card className="bg-card border-border/60 shadow-none">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold font-mono tracking-tight ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className="w-4 h-4 text-muted-foreground/40" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Supplier Table */}
      <div className="px-6 pt-6">
        <motion.div variants={fadeUp} className="rounded-lg border border-border/60 bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/20">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-12">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Supplier</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Trust Score</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Key Compounds</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Attestations</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Coverage</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {sortedSuppliers.map((supplier, index) => (
                  <motion.tr
                    key={supplier.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.04 }}
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="px-4 py-3.5 text-center">
                      <span className="text-xs font-mono text-muted-foreground">{index + 1}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-muted border border-border/60 flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                          {supplier.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground flex items-center gap-1.5">
                            {supplier.name}
                            {supplier.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                          </div>
                          <a href={supplier.website} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary transition-colors">
                            {supplier.website.replace("https://", "")}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-block font-mono font-bold text-sm px-2.5 py-0.5 rounded-md
                        ${supplier.trustScore >= 95 ? 'bg-primary/10 text-primary' :
                          supplier.trustScore >= 88 ? 'bg-emerald-500/10 text-emerald-500' :
                          'bg-amber-500/10 text-amber-500'}`}>
                        {supplier.trustScore}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5 flex-wrap">
                        {supplier.compoundsSupported.slice(0, 3).map(c => (
                          <span key={c} className="text-[10px] font-medium px-1.5 py-0.5 bg-muted rounded text-muted-foreground border border-border/50">
                            {c}
                          </span>
                        ))}
                        {supplier.compoundsSupported.length > 3 && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 border border-border/50 rounded text-muted-foreground">
                            +{supplier.compoundsSupported.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center font-mono text-sm font-semibold text-foreground">
                      {supplier.attestationCount}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                        {supplier.shipsTo.join(", ")}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Link href={`/supplier/${supplier.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group-hover:text-primary">
                        Inspect <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-border/40 bg-muted/10 flex justify-between items-center">
            <p className="text-xs text-muted-foreground">{sortedSuppliers.length} entities indexed</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              Live network sync
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
