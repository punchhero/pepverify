"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, Users, Database } from "lucide-react";
import { MOCK_SUPPLIERS, MOCK_ATTESTATIONS } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function HomePage() {
  const verifiedSuppliersCount = MOCK_SUPPLIERS.filter(s => s.verified).length;
  const totalAttestations = MOCK_SUPPLIERS.reduce((acc, curr) => acc + curr.attestationCount, 0);

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="flex flex-col gap-12 pb-12 overflow-hidden"
    >
      {/* Hero Section */}
      <section className="px-6 pt-16 pb-12 border-b border-border/50 relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none translate-x-1/3 -translate-y-1/2"></div>
        
        <div className="max-w-4xl relative z-10">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/5 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              Decentralized Scientific Verification
            </div>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Immutable provenance for <br className="hidden md:block" />
            <span className="text-primary">biotech intelligence.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            PepVerify is an enterprise-grade attestation protocol. We cryptographically secure COA, HPLC, and MS lab reports directly to the Solana blockchain, ensuring zero-trust verification for research compounds.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-4">
            <Link 
              href="/directory" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Access Directory
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              href="/submit" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border/50 hover:border-border"
            >
              Submit Evidence
            </Link>
          </motion.div>
        </div>
      </section>

      <motion.div variants={containerVariants} className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Verified Entities", value: verifiedSuppliersCount, desc: "+2 this week", icon: Users },
          { title: "On-Chain Attestations", value: totalAttestations, desc: "Secured via SAS", icon: Database },
          { title: "Network Scans", value: 14, desc: "Last 24 hours", icon: Activity },
          { title: "Disputed Reports", value: 0, desc: "100% verification rate", icon: ShieldCheck, isDestructive: true }
        ].map((metric, i) => (
          <motion.div key={i} variants={itemVariants} whileHover={{ y: -2, transition: { duration: 0.2, ease: "easeOut" } }}>
            <Card className="bg-card border-border/50 hover:border-border transition-colors rounded-sm shadow-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">{metric.title}</CardTitle>
                <metric.icon className="w-4 h-4 text-muted-foreground/50" />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold font-mono ${metric.isDestructive ? 'text-emerald-500' : ''}`}>{metric.value}</div>
                <p className="text-xs text-muted-foreground/70 mt-1 font-mono">{metric.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <section className="px-6">
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-6 border-b border-border/50 pb-2">
          <h2 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Featured Suppliers</h2>
          <Link href="/directory" className="text-xs uppercase font-bold tracking-wider text-primary hover:text-primary/80 flex items-center">
            View All <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </motion.div>
        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MOCK_SUPPLIERS.slice(0, 3).map((supplier) => (
            <motion.div key={supplier.id} variants={itemVariants} whileHover={{ y: -2, transition: { duration: 0.2 } }}>
              <Card className="flex flex-col h-full hover:border-primary/30 transition-colors bg-card border-border/50 rounded-sm shadow-none">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg tracking-tight">{supplier.name}</CardTitle>
                      <CardDescription className="mt-2 flex items-center gap-3">
                        {supplier.verified && (
                          <span className="flex items-center text-emerald-500 text-xs font-semibold uppercase tracking-wider">
                            <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                          </span>
                        )}
                        <span className="text-muted-foreground text-xs font-mono">{supplier.attestationCount} Attests</span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-sm bg-muted/10 border border-border/50">
                      <span className="text-primary font-bold font-mono text-sm leading-none">{supplier.trustScore}</span>
                      <span className="text-[8px] text-muted-foreground uppercase tracking-widest mt-1">Trust</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 border-t border-border/20 pt-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{supplier.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.compoundsSupported.slice(0, 3).map(c => (
                      <span key={c} className="text-[10px] font-mono px-2 py-1 bg-secondary/50 rounded-sm text-secondary-foreground border border-border/50">{c}</span>
                    ))}
                    {supplier.compoundsSupported.length > 3 && (
                      <span className="text-[10px] font-mono px-2 py-1 border border-border/50 rounded-sm text-muted-foreground">+{supplier.compoundsSupported.length - 3}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      <motion.section variants={itemVariants} className="px-6">
        <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-2">
          <h2 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Network Ledger (Live)</h2>
        </div>
        <div className="border border-border/50 rounded-sm overflow-x-auto bg-card">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] uppercase bg-muted/20 text-muted-foreground border-b border-border/50 tracking-wider">
              <tr>
                <th className="px-4 py-3 font-semibold">SAS Cryptographic Hash</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Signer Identity</th>
                <th className="px-4 py-3 font-semibold text-right">Block Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {MOCK_ATTESTATIONS.map((att, index) => (
                <motion.tr 
                  key={att.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + (index * 0.05) }}
                  className="hover:bg-muted/10 transition-colors even:bg-muted/5"
                >
                  <td className="px-4 py-3 font-mono text-primary text-xs truncate max-w-[200px] hover:underline cursor-pointer">
                    {att.sasAttestationId}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      {att.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground text-xs">{att.signerWallet}</td>
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground text-xs">
                    {new Date(att.timestamp).toISOString().replace('T', ' ').substring(0, 19)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  );
}
