"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, Users, Database, Filter, Search } from "lucide-react";
import { MOCK_SUPPLIERS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

export default function HomePage() {
  const verifiedCount = MOCK_SUPPLIERS.filter(s => s.verified).length;
  const totalAttests = MOCK_SUPPLIERS.reduce((acc, curr) => acc + curr.attestationCount, 0);

  // Sort suppliers by trust score
  const sortedSuppliers = [...MOCK_SUPPLIERS].sort((a, b) => b.trustScore - a.trustScore);

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="flex flex-col h-full bg-background pb-12"
    >
      {/* Top Application Header (Replaces Marketing Hero) */}
      <div className="px-6 py-6 border-b border-border bg-card/50">
        <div className="max-w-[2000px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-1">Global Verification Index</h1>
              <p className="text-sm text-muted-foreground">Immutable provenance and trust scoring for research compound suppliers.</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search suppliers, compounds, or CIDs..." 
                  className="h-9 w-64 rounded-md border border-border bg-background px-9 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-card px-4 text-sm font-medium hover:bg-muted/50 transition-colors">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </button>
            </div>
          </div>

          {/* Core Network Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-background shadow-sm border-border/60">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Total Suppliers</p>
                  <p className="text-2xl font-bold font-mono">{MOCK_SUPPLIERS.length}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background shadow-sm border-border/60">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Verified Entities</p>
                  <p className="text-2xl font-bold font-mono text-emerald-500">{verifiedCount}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background shadow-sm border-border/60">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">On-Chain Attests</p>
                  <p className="text-2xl font-bold font-mono text-primary">{totalAttests}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Database className="w-4 h-4 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background shadow-sm border-border/60">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Network Scans</p>
                  <p className="text-2xl font-bold font-mono">2,419</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Data Table (CoinMarketCap Style) */}
      <div className="flex-1 px-6 py-6 max-w-[2000px] mx-auto w-full">
        <motion.div variants={itemVariants} className="bg-card border border-border shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-muted/30 border-b border-border/60">
                <tr>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground w-16 text-center">#</th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Supplier Name</th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-center">Trust Score</th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Key Compounds</th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-center">Verified Attests</th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Shipping Status</th>
                  <th className="px-6 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {sortedSuppliers.map((supplier, index) => (
                  <motion.tr 
                    key={supplier.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center font-mono text-muted-foreground font-semibold">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center text-xs font-bold text-muted-foreground">
                          {supplier.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground flex items-center gap-1.5">
                            {supplier.name}
                            {supplier.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                          </p>
                          <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                            {supplier.website.replace("https://", "")}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="outline" className={`font-mono text-sm px-2.5 py-0.5
                        ${supplier.trustScore >= 90 ? 'bg-primary/10 text-primary border-primary/20' : 
                          supplier.trustScore >= 80 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                          'bg-destructive/10 text-destructive border-destructive/20'}
                      `}>
                        {supplier.trustScore}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {supplier.compoundsSupported.slice(0, 3).map(c => (
                          <span key={c} className="text-[10px] font-mono px-1.5 py-0.5 bg-background border border-border rounded text-muted-foreground">
                            {c}
                          </span>
                        ))}
                        {supplier.compoundsSupported.length > 3 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-background border border-border rounded text-muted-foreground">
                            +{supplier.compoundsSupported.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-medium text-foreground">
                      {supplier.attestationCount}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {supplier.shipsTo[0]} {supplier.shipsTo.length > 1 && `+${supplier.shipsTo.length - 1}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/supplier/${supplier.id}`}>
                        <span className="inline-flex items-center text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                          Inspect <ArrowRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-border/60 bg-muted/10 text-xs text-muted-foreground flex justify-between items-center">
            <p>Showing 1 to {sortedSuppliers.length} of {sortedSuppliers.length} entities</p>
            <p className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Network Sync
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
