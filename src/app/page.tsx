"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Database, Lock, Zap, FileText, CheckCircle2 } from "lucide-react";
import { MOCK_SUPPLIERS } from "@/lib/data";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const topSuppliers = [...MOCK_SUPPLIERS].sort((a, b) => b.trustScore - a.trustScore).slice(0, 3);

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#080808] text-[#F0F0F0] overflow-x-hidden">

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-8 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#5E6AD2]/20 flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 text-[#5E6AD2]" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">PepVerify</span>
        </div>

        <div className="hidden md:flex items-center gap-7 text-[13px] text-[#888]">
          <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How it works</a>
          <a href="#suppliers" className="hover:text-white transition-colors duration-200">Suppliers</a>
          <a href="#governance" className="hover:text-white transition-colors duration-200">Governance</a>
          <Link href="/dashboard" className="hover:text-white transition-colors duration-200">Dashboard</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-[13px] text-[#888] hover:text-white transition-colors duration-200 hidden md:block">
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-all duration-200"
          >
            Open app <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-14 pb-24 overflow-hidden">
        {/* Gradient glow – Linear signature */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[900px] h-[600px] rounded-full bg-[#5E6AD2]/10 blur-[160px]" />
        </div>
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[400px] h-[400px] rounded-full bg-[#7C85E0]/8 blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-10 max-w-5xl mx-auto"
        >
          {/* Pill badge */}
          <motion.div variants={fade} className="inline-flex items-center gap-2 mb-10">
            <div className="flex items-center gap-2 text-[12px] text-[#888] border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse" />
              Built on Solana Attestation Service
            </div>
          </motion.div>

          {/* Headline — Linear style: massive, tight, bold */}
          <motion.h1
            variants={fade}
            className="text-[64px] md:text-[88px] font-semibold tracking-[-0.04em] leading-[0.95] text-white mb-8 max-w-4xl mx-auto"
          >
            Scientific evidence,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#7C85E0] to-[#5E6AD2]">
              permanently verified.
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={fade}
            className="text-[18px] md:text-[20px] text-[#666] max-w-xl mx-auto mb-12 leading-[1.55] tracking-[-0.01em]"
          >
            PepVerify anchors research peptide lab reports to the Solana blockchain. 
            Immutable provenance for COAs, HPLC, and LC-MS — cryptographically signed, forever.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fade} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-black text-[14px] font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
            >
              Access the Platform <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/[0.1] text-[#888] text-[14px] font-medium hover:text-white hover:border-white/20 active:scale-[0.98] transition-all duration-200"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        {/* Stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-0 border border-white/[0.07] rounded-2xl overflow-hidden bg-[#0F0F0F]"
        >
          {[
            { n: `${MOCK_SUPPLIERS.length}`, label: "Suppliers indexed" },
            { n: `${MOCK_SUPPLIERS.reduce((a, s) => a + s.attestationCount, 0)}`, label: "On-chain attestations" },
            { n: "10", label: "Compounds tracked" },
          ].map((stat, i) => (
            <div key={stat.label} className={`px-8 py-4 ${i > 0 ? "border-l border-white/[0.07]" : ""}`}>
              <div className="text-[22px] font-semibold tracking-[-0.03em] text-white">{stat.n}</div>
              <div className="text-[12px] text-[#555] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── PROBLEM STATEMENT ─── */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center border-t border-white/[0.05]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.p variants={fade} className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#5E6AD2] mb-6">
            The Problem
          </motion.p>
          <motion.h2 variants={fade} className="text-[42px] md:text-[56px] font-semibold tracking-[-0.035em] leading-[1.05] text-white mb-8">
            The peptide market runs on 
            <br />unverifiable claims.
          </motion.h2>
          <motion.p variants={fade} className="text-[18px] text-[#555] max-w-2xl mx-auto leading-[1.6]">
            COAs are forged. Testing reports are recycled across batches. Supplier reputation is based on forum posts, not science.
            Researchers have no way to verify what they are studying.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-24 border-t border-white/[0.05]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fade} className="text-center mb-20">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#5E6AD2] mb-6">Provenance Workflow</p>
            <h2 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.035em] leading-[1.05] text-white">
              From lab report to blockchain<br />in four steps.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                n: "01", icon: FileText, title: "Report Submitted",
                body: "A supplier uploads a third-party COA, HPLC-UV, or LC-MS PDF to the platform.",
              },
              {
                n: "02", icon: Database, title: "IPFS Pinning",
                body: "The document is pinned to IPFS via Pinata — a permanent, tamper-proof Content Identifier is generated.",
              },
              {
                n: "03", icon: Lock, title: "On-Chain Attestation",
                body: "Metadata and CID are signed by the submitter's Solana wallet and anchored via the SAS protocol.",
              },
              {
                n: "04", icon: CheckCircle2, title: "Permanent Record",
                body: "The evidence is now immutable. Trust scores update algorithmically. Anyone can verify the chain of custody.",
              },
            ].map(({ n, icon: Icon, title, body }) => (
              <motion.div
                key={n}
                variants={fade}
                className="p-7 rounded-2xl border border-white/[0.06] bg-[#0C0C0C] hover:border-white/[0.1] transition-colors duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#5E6AD2] tracking-wider">{n}</span>
                  <div className="w-px h-3 bg-white/10" />
                  <Icon className="w-4 h-4 text-[#555] group-hover:text-[#888] transition-colors" />
                </div>
                <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-white mb-2">{title}</h3>
                <p className="text-[14px] text-[#555] leading-[1.65]">{body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t border-white/[0.05]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fade} className="text-center mb-20">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#5E6AD2] mb-6">Core Infrastructure</p>
            <h2 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.035em] leading-[1.05] text-white">
              Trust built on cryptography,<br />not reputation.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: ShieldCheck, title: "Cryptographic Provenance",
                body: "Every report is signed by the submitter's Solana wallet. Forgery is mathematically impossible.",
                accent: "#5E6AD2",
              },
              {
                icon: Database, title: "Permanent IPFS Storage",
                body: "Original PDFs are pinned to IPFS via Pinata. No central server can delete or alter evidence.",
                accent: "#2EA043",
              },
              {
                icon: Zap, title: "Solana Attestation Service",
                body: "SAS creates an immutable on-chain record — who verified it, what it said, and when. Sub-second finality.",
                accent: "#A371F7",
              },
              {
                icon: CheckCircle2, title: "Algorithmic Trust Scores",
                body: "Supplier trust derives from on-chain evidence only — not forums, reviews, or paid placements.",
                accent: "#E3B341",
              },
            ].map(({ icon: Icon, title, body, accent }) => (
              <motion.div
                key={title}
                variants={fade}
                className="p-7 rounded-2xl border border-white/[0.06] bg-[#0C0C0C] hover:border-white/[0.1] transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: `${accent}15` }}>
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                </div>
                <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-white mb-2">{title}</h3>
                <p className="text-[14px] text-[#555] leading-[1.65]">{body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── SUPPLIERS ─── */}
      <section id="suppliers" className="max-w-5xl mx-auto px-6 py-24 border-t border-white/[0.05]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fade} className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#5E6AD2] mb-4">Verified Suppliers</p>
              <h2 className="text-[36px] font-semibold tracking-[-0.03em] text-white">Ranked by on-chain evidence.</h2>
            </div>
            <Link href="/directory" className="text-[13px] text-[#555] hover:text-white transition-colors flex items-center gap-1.5">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <div className="space-y-2">
            {topSuppliers.map((supplier, i) => (
              <motion.div key={supplier.id} variants={fade}>
                <Link
                  href={`/supplier/${supplier.id}`}
                  className="flex items-center justify-between p-5 rounded-2xl border border-white/[0.06] bg-[#0C0C0C] hover:border-white/[0.12] hover:bg-[#0F0F0F] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-[13px] font-mono text-[#333] w-5 text-center">{i + 1}</span>
                    <div className="w-9 h-9 rounded-xl bg-[#141414] border border-white/[0.06] flex items-center justify-center text-sm font-bold text-[#555]">
                      {supplier.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-medium text-white tracking-[-0.01em]">{supplier.name}</span>
                        {supplier.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#2EA043]" />}
                      </div>
                      <p className="text-[13px] text-[#444] mt-0.5 line-clamp-1">{supplier.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-1.5">
                      {supplier.compoundsSupported.slice(0, 3).map(c => (
                        <span key={c} className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-[#555] border border-white/[0.06]">{c}</span>
                      ))}
                    </div>
                    <span className={`text-[15px] font-semibold font-mono tracking-tight
                      ${supplier.trustScore >= 95 ? 'text-[#5E6AD2]' :
                        supplier.trustScore >= 88 ? 'text-[#2EA043]' : 'text-[#E3B341]'}`}>
                      {supplier.trustScore}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#333] group-hover:text-[#555] transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── GOVERNANCE ─── */}
      <section id="governance" className="max-w-5xl mx-auto px-6 py-24 border-t border-white/[0.05]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fade}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#A371F7] mb-6">DAO Governance</p>
            <h2 className="text-[36px] font-semibold tracking-[-0.03em] text-white mb-5 leading-[1.1]">
              Community-enforced scientific standards.
            </h2>
            <p className="text-[15px] text-[#555] leading-[1.7] mb-8">
              PepVerify governance allows token holders to review disputed reports, vote on supplier verification tiers, 
              and allocate treasury funds for independent testing.
            </p>
            <ul className="space-y-3">
              {[
                "Vote on Tier 1 Verified supplier status",
                "Review and flag disputed COAs",
                "Fund community-funded testing",
                "Propose new compounds for the index",
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-[#666]">
                  <CheckCircle2 className="w-4 h-4 text-[#A371F7] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/governance" className="text-[13px] font-medium text-[#A371F7] hover:text-[#B891F7] transition-colors flex items-center gap-1.5">
                View Governance Hub <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fade} className="space-y-2">
            {[
              { label: "Supplier: Peptide Sciences", status: "TIER 1 VERIFIED", votes: "142 votes", c: "text-[#5E6AD2]", bg: "bg-[#5E6AD2]/10 border-[#5E6AD2]/20" },
              { label: "COA Dispute: Batch TB-26-02B", status: "UNDER REVIEW", votes: "38 votes", c: "text-[#E3B341]", bg: "bg-[#E3B341]/10 border-[#E3B341]/20" },
              { label: "Fund: Community Testing Round", status: "PASSED", votes: "201 votes", c: "text-[#2EA043]", bg: "bg-[#2EA043]/10 border-[#2EA043]/20" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-[#0C0C0C]">
                <div>
                  <p className="text-[14px] font-medium text-white">{item.label}</p>
                  <p className="text-[12px] text-[#444] mt-0.5">{item.votes}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${item.bg} ${item.c}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center border-t border-white/[0.05]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fade} className="text-[52px] md:text-[68px] font-semibold tracking-[-0.04em] leading-[0.97] text-white mb-6">
            Built for the future.
            <br />Available today.
          </motion.h2>
          <motion.p variants={fade} className="text-[18px] text-[#555] max-w-lg mx-auto mb-12 leading-[1.55]">
            Join researchers, suppliers, and governance participants building a more transparent peptide ecosystem on Solana.
          </motion.p>
          <motion.div variants={fade} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black text-[14px] font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
            >
              Get started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/[0.1] text-[#888] text-[14px] font-medium hover:text-white hover:border-white/20 active:scale-[0.98] transition-all duration-200"
            >
              Submit Evidence
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#5E6AD2]/20 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-[#5E6AD2]" />
            </div>
            <span className="text-[13px] font-medium text-white">PepVerify</span>
            <span className="text-[12px] text-[#333] ml-1">— Built on Solana. Secured by IPFS.</span>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-[#444]">
            {[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Directory", href: "/directory" },
              { label: "Governance", href: "/governance" },
              { label: "Submit", href: "/submit" },
              { label: "Leaderboard", href: "/leaderboard" },
            ].map(l => (
              <Link key={l.href} href={l.href} className="hover:text-[#888] transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
