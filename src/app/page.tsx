"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Database, Globe, Lock, Zap, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { MOCK_SUPPLIERS } from "@/lib/data";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const topSuppliers = [...MOCK_SUPPLIERS].sort((a, b) => b.trustScore - a.trustScore).slice(0, 3);

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Lab Report Submitted",
    description: "A supplier uploads a third-party COA, HPLC-UV, or LC-MS report PDF to the PepVerify platform.",
    icon: FileText,
  },
  {
    step: "02",
    title: "IPFS Pinning",
    description: "The document is pinned to the InterPlanetary File System via Pinata, generating a permanent, tamper-proof Content Identifier (CID).",
    icon: Database,
  },
  {
    step: "03",
    title: "On-Chain Attestation",
    description: "The report metadata and CID are signed by the submitter's Solana wallet and recorded via the Solana Attestation Service (SAS).",
    icon: Lock,
  },
  {
    step: "04",
    title: "Permanent Verification",
    description: "The evidence is now immutable and publicly verifiable. Trust scores update algorithmically based on the on-chain record.",
    icon: CheckCircle2,
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Cryptographic Provenance",
    description: "Every lab report is signed by the submitter's Solana wallet. Forgery is cryptographically impossible.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Database,
    title: "Permanent IPFS Storage",
    description: "Original PDFs are pinned to IPFS via Pinata. No central server can delete or alter the evidence.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Solana Attestation Service",
    description: "SAS creates an immutable on-chain record of what was verified, by whom, and when. Sub-second finality.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: Globe,
    title: "Algorithmic Trust Scores",
    description: "Supplier trust is derived from objective on-chain evidence — not forums, reviews, or paid placements.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Landing Nav */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-primary/15 border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-semibold text-sm tracking-tight">PepVerify</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#suppliers" className="hover:text-foreground transition-colors">Suppliers</a>
            <a href="#governance" className="hover:text-foreground transition-colors">Governance</a>
            <a href="#whitepaper" className="hover:text-foreground transition-colors">Whitepaper</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-sm font-medium bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90 transition-colors"
            >
              Open App <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 text-center relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial="hidden" animate="show" variants={stagger} className="relative z-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card text-xs text-muted-foreground mb-8 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Built on Solana Attestation Service
            <ChevronRight className="w-3 h-3" />
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
            Scientific evidence,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/60">
              permanently verified.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            PepVerify anchors research peptide lab reports to the Solana blockchain. 
            Zero-trust verification for COAs, HPLC, and LC-MS results — permanently stored on IPFS, 
            cryptographically signed, algorithmically trusted.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all duration-200"
            >
              Access the Platform <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-border/60 bg-card text-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        {/* Hero stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          className="mt-20 grid grid-cols-3 gap-px bg-border/40 border border-border/40 rounded-xl overflow-hidden max-w-2xl mx-auto"
        >
          {[
            { label: "Suppliers Indexed", value: MOCK_SUPPLIERS.length.toString() },
            { label: "On-Chain Attests", value: MOCK_SUPPLIERS.reduce((a, s) => a + s.attestationCount, 0).toString() },
            { label: "Compounds Tracked", value: "10" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card py-5 px-4">
              <div className="text-2xl font-bold font-mono text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-border/40">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Core Infrastructure</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Trust built on cryptography, <br />not reputation.
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every verification event creates an immutable, publicly auditable record. No exceptions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((feat) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                className="p-6 rounded-xl border border-border/50 bg-card hover:border-border transition-colors group"
              >
                <div className={`w-9 h-9 rounded-lg ${feat.bg} flex items-center justify-center mb-4`}>
                  <feat.icon className={`w-4.5 h-4.5 ${feat.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24 border-t border-border/40">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Provenance Workflow</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              From lab report to blockchain
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A four-step cryptographic chain of custody that makes evidence permanent and publicly verifiable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WORKFLOW_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="relative p-6 rounded-xl border border-border/50 bg-card"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-muted border border-border/60 flex items-center justify-center">
                    <step.icon className="w-4.5 h-4.5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-primary">{step.step}</span>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-px bg-border hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Suppliers */}
      <section id="suppliers" className="max-w-6xl mx-auto px-6 py-24 border-t border-border/40">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Verified Suppliers</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Top-ranked by evidence.</h2>
            </div>
            <Link href="/directory" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              View all suppliers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topSuppliers.map((supplier, i) => (
              <motion.div key={supplier.id} variants={fadeUp}>
                <Link href={`/supplier/${supplier.id}`} className="block p-5 rounded-xl border border-border/50 bg-card hover:border-border hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-9 h-9 rounded-md bg-muted border border-border flex items-center justify-center text-sm font-bold text-muted-foreground">
                      {supplier.name.charAt(0)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {supplier.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                      <span className={`text-sm font-bold font-mono
                        ${supplier.trustScore >= 95 ? 'text-primary' :
                          supplier.trustScore >= 88 ? 'text-emerald-500' : 'text-amber-400'}`}>
                        {supplier.trustScore}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{supplier.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{supplier.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {supplier.compoundsSupported.slice(0, 3).map(c => (
                      <span key={c} className="text-[10px] font-medium px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                        {c}
                      </span>
                    ))}
                    {supplier.compoundsSupported.length > 3 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 border border-border/50 rounded text-muted-foreground">
                        +{supplier.compoundsSupported.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Governance Section */}
      <section id="governance" className="max-w-6xl mx-auto px-6 py-24 border-t border-border/40">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">DAO Governance</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Community-enforced scientific standards.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              PepVerify governance allows token holders to review disputed reports, vote on supplier verification tiers, 
              and allocate treasury funds toward independent community-funded testing. Trust is not just algorithmic — it&apos;s democratic.
            </p>
            <ul className="space-y-3">
              {[
                "Vote on Tier 1 Verified supplier status",
                "Review and flag disputed or fraudulent COAs",
                "Fund independent third-party testing",
                "Propose new compounds for the index",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/governance" className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                View Governance Hub <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="p-6 rounded-xl border border-border/50 bg-card space-y-3">
            {[
              { label: "Supplier: Peptide Sciences", status: "TIER 1 VERIFIED", votes: "142 votes", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
              { label: "COA Dispute: Batch TB-26-02B", status: "UNDER REVIEW", votes: "38 votes", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
              { label: "Fund: Community Testing Round", status: "PASSED", votes: "201 votes", color: "text-primary bg-primary/10 border-primary/20" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3.5 rounded-lg bg-muted/30 border border-border/40">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.votes}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-border/40">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-5">
            Trust should be earned <br />with evidence.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Join the network of researchers, suppliers, and governance participants building a more transparent peptide ecosystem on Solana.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              Access the Platform <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md border border-border/60 bg-card text-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              Submit Evidence
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">PepVerify</span>
            <span className="text-xs text-muted-foreground ml-2">Built on Solana. Secured by IPFS.</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <Link href="/directory" className="hover:text-foreground transition-colors">Directory</Link>
            <Link href="/governance" className="hover:text-foreground transition-colors">Governance</Link>
            <Link href="/submit" className="hover:text-foreground transition-colors">Submit Evidence</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
