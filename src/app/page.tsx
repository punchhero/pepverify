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
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
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
      <section className="px-6 pt-16 pb-8 border-b border-border bg-gradient-to-b from-primary/5 to-transparent relative">
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="max-w-4xl relative z-10">
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <ShieldCheck className="w-3 h-3 mr-1" /> Solana Attestation Service
            </Badge>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            On-chain transparency for <br className="hidden md:block" />
            <span className="text-primary drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">research peptides.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            PepVerify is a decentralized verification platform providing immutable provenance for COAs, HPLC, and MS lab reports. Built for serious scientific transparency.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-4">
            <Link 
              href="/directory" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
            >
              Browse Directory
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              href="/submit" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border hover:border-primary/50"
            >
              Submit Evidence
            </Link>
          </motion.div>
        </div>
      </section>

      <motion.div variants={containerVariants} className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Verified Suppliers", value: verifiedSuppliersCount, desc: "+2 this week", icon: Users },
          { title: "Total Attestations", value: totalAttestations, desc: "Stored securely on-chain", icon: Database },
          { title: "Recent Scans", value: 14, desc: "In the last 24h", icon: Activity },
          { title: "Disputed Reports", value: 0, desc: "All evidence is verified", icon: ShieldCheck, isDestructive: true }
        ].map((metric, i) => (
          <motion.div key={i} variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <metric.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold font-mono ${metric.isDestructive ? 'text-emerald-500' : ''}`}>{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <section className="px-6">
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">Featured Suppliers</h2>
          <Link href="/directory" className="text-sm text-primary hover:underline flex items-center">
            View all <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </motion.div>
        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MOCK_SUPPLIERS.slice(0, 3).map((supplier) => (
            <motion.div key={supplier.id} variants={itemVariants} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
              <Card className="flex flex-col h-full hover:border-primary/50 transition-colors bg-card/60 backdrop-blur-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <CardDescription className="mt-1 flex items-center gap-2">
                        <span className="flex items-center text-emerald-500">
                          <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                        </span>
                        <span className="text-muted-foreground">• {supplier.attestationCount} Attestations</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold font-mono text-sm border border-primary/20 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                      {supplier.trustScore}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-2">{supplier.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {supplier.compoundsSupported.slice(0, 3).map(c => (
                      <Badge key={c} variant="secondary" className="text-[10px] bg-secondary/50">{c}</Badge>
                    ))}
                    {supplier.compoundsSupported.length > 3 && (
                      <Badge variant="outline" className="text-[10px] border-border/50">+{supplier.compoundsSupported.length - 3}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      <motion.section variants={itemVariants} className="px-6">
        <h2 className="text-xl font-bold tracking-tight mb-6">Recent Network Attestations</h2>
        <div className="rounded-md border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
          <div className="grid grid-cols-5 text-sm font-semibold text-muted-foreground border-b border-border p-4 bg-muted/20 uppercase tracking-wider text-[10px]">
            <div className="col-span-2">SAS Record Hash</div>
            <div>Verification Status</div>
            <div>Cryptographic Signer</div>
            <div className="text-right">Block Timestamp</div>
          </div>
          <div className="divide-y divide-border/50">
            {MOCK_ATTESTATIONS.map((att, index) => (
              <motion.div 
                key={att.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="grid grid-cols-5 text-sm p-4 items-center hover:bg-muted/10 transition-colors"
              >
                <div className="col-span-2 font-mono text-primary truncate pr-4 text-xs">
                  {att.sasAttestationId}
                </div>
                <div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] tracking-wide rounded-sm">
                    {att.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="font-mono text-muted-foreground text-xs">{att.signerWallet}</div>
                <div className="text-right font-mono text-muted-foreground text-xs">
                  {new Date(att.timestamp).toISOString().split('T')[0]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
