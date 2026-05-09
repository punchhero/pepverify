"use client";

import Link from "next/link";
import { ArrowRight, Microscope, Terminal, Cpu, Activity, Dna, TestTube2, ShieldCheck, Database, CheckCircle2 } from "lucide-react";
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

const SCATTER_POINTS = Array.from({ length: 150 }).map((_, i) => {
  const rand1 = Math.sin(i * 123.45) * 10000;
  const rand2 = Math.cos(i * 678.9) * 10000;
  const r1 = rand1 - Math.floor(rand1);
  const r2 = rand2 - Math.floor(rand2);
  return {
    x: r1 * 100,
    y: r2 * 100,
    size: r1 * 2 + 1,
    color: r1 > 0.9 ? 'bg-[#2DD4BF]' : (r1 > 0.75 ? 'bg-[#3B82F6]' : 'bg-[#333]'),
    opacity: r2 * 0.6 + 0.2
  };
});

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#080808] bg-hex-pattern text-[#F0F0F0] overflow-x-hidden relative">
      <div className="scanline"></div>

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-8 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#2DD4BF]/20 border border-[#2DD4BF]/30 flex items-center justify-center">
            <Dna className="w-3 h-3 text-[#2DD4BF]" />
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
            className="inline-flex items-center gap-1.5 text-[13px] font-medium bg-[#EAEAEA] text-[#0A0A0A] px-4 py-2 rounded-md hover:bg-white transition-all duration-200 shadow-sm"
          >
            Open app <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-6 pt-14 pb-24 overflow-hidden">
        {/* Subtle grid and ambient glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none opacity-40">
          <div className="w-[800px] h-[800px] rounded-full bg-[#2DD4BF]/10 blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative z-10 text-left"
          >
            {/* Pill badge */}
            <motion.div variants={fade} className="inline-flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2 text-[12px] text-[#A1A1AA] border border-[#333] bg-[#111] px-3 py-1.5 rounded-full shadow-sm font-mono tracking-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2EA043] animate-pulse" />
                SAS: <span className="text-[#EAEAEA]">OPERATIONAL</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fade}
              className="text-[52px] md:text-[68px] font-semibold tracking-[-0.04em] leading-[1.0] text-[#EAEAEA] mb-8"
            >
              Verifiable Peptide Intelligence.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fade}
              className="text-[17px] md:text-[19px] text-[#888] max-w-lg mb-12 leading-[1.6] tracking-tight"
            >
              PepVerify bridges off-chain analytical chemistry with immutable on-chain ledgers. 
              Cryptographically secure provenance for COAs, HPLC, and LC-MS evidence.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fade} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#EAEAEA] text-[#0A0A0A] text-[14px] font-medium hover:bg-white transition-all duration-200 shadow-sm"
              >
                Access Terminal <Terminal className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-[#333] bg-transparent text-[#A1A1AA] text-[14px] font-medium hover:text-[#EAEAEA] hover:border-[#444] transition-all duration-200"
              >
                Read Whitepaper
              </a>
            </motion.div>
          </motion.div>

          {/* Minimalist Abstract Scatter Plot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block relative rounded-2xl overflow-hidden shadow-2xl h-[420px] w-full border border-[#222] bg-[#0A0A0A]"
          >
            {/* Fine background grid */}
            <div className="absolute inset-0 bg-grid-fine opacity-50" />
            
            {/* Reference axes */}
            <div className="absolute top-[35%] left-0 right-0 h-px bg-[#333]/40" />
            <div className="absolute top-[65%] left-0 right-0 h-px bg-[#333]/40" />
            <div className="absolute top-0 bottom-0 left-[50%] w-px bg-[#333]/40" />

            {/* Scatter Points */}
            {SCATTER_POINTS.map((p, i) => (
              <div 
                key={i} 
                className={`absolute rounded-full ${p.color}`} 
                style={{ 
                  left: `${p.x}%`, top: `${p.y}%`, 
                  width: `${p.size}px`, height: `${p.size}px`, 
                  opacity: p.opacity,
                  boxShadow: p.color !== 'bg-[#333]' ? `0 0 8px ${p.color === 'bg-[#2DD4BF]' ? '#2DD4BF' : '#3B82F6'}` : 'none'
                }} 
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-tr from-[#080808]/40 via-transparent to-[#080808]/80 pointer-events-none" />

            {/* Linear-style Pulse Card */}
            <div className="absolute left-6 bottom-6 bg-[#111]/90 backdrop-blur-md border border-[#333] rounded-xl p-5 w-72 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#222]">
                <span className="text-[13px] font-medium text-[#EAEAEA]">Network Consensus</span>
                <div className="flex items-center gap-1.5 bg-[#222] rounded-full px-2 py-0.5 border border-[#333]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2EA043] animate-pulse" />
                  <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">Live</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-[#A1A1AA]">BPC-157 Synthesis</span>
                    <span className="text-[#2DD4BF]">Verified</span>
                  </div>
                  <div className="h-1 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2DD4BF] w-[92%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-[#A1A1AA]">TB-500 Batch #09A</span>
                    <span className="text-[#E3B341]">Pending</span>
                  </div>
                  <div className="h-1 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-[#E3B341] w-[64%]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-0 border border-[#222] rounded-xl overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-md shadow-sm"
        >
          {[
            { n: `${MOCK_SUPPLIERS.length}`, label: "Suppliers Indexed" },
            { n: `${MOCK_SUPPLIERS.reduce((a, s) => a + s.attestationCount, 0)}`, label: "On-Chain Records" },
            { n: "10", label: "Compounds Tracked" },
          ].map((stat, i) => (
            <div key={stat.label} className={`px-8 py-4 ${i > 0 ? "border-l border-[#222]" : ""}`}>
              <div className="text-[22px] font-medium tracking-tight text-[#EAEAEA]">{stat.n}</div>
              <div className="text-[11px] text-[#A1A1AA] mt-0.5">{stat.label}</div>
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
          <motion.p variants={fade} className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#E3B341] mb-6 flex items-center justify-center gap-2">
            <Activity className="w-4 h-4" /> System Warning
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
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.05]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div variants={fade}>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#2DD4BF] mb-6 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Provenance Protocol
              </p>
              <h2 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.035em] leading-[1.05] text-white">
                From lab report to blockchain<br />in four steps.
              </h2>
            </motion.div>
            <motion.div variants={fade} className="relative h-[250px] w-full rounded-2xl overflow-hidden border border-[#222] shadow-xl hidden lg:block bg-[#0A0A0A] flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-60 mix-blend-screen px-8 py-4" stroke="#444" strokeWidth="0.5" fill="none" strokeLinejoin="round">
                <g transform="translate(0, 15)">
                  {/* Center Block */}
                  <path d="M100,70 L130,85 L100,100 L70,85 Z" fill="#111" />
                  <path d="M70,85 L70,115 L100,130 L100,100 Z" fill="#050505" />
                  <path d="M130,85 L130,115 L100,130 L100,100 Z" fill="#080808" />
                  {/* Glowing center indicator */}
                  <path d="M100,80 L110,85 L100,90 L90,85 Z" fill="#2DD4BF" opacity="0.8" />
                  
                  {/* Top Left Block */}
                  <path d="M60,50 L90,65 L60,80 L30,65 Z" fill="#0A0A0A" />
                  <path d="M30,65 L30,95 L60,110 L60,80 Z" fill="#050505" />
                  <path d="M90,65 L90,95 L60,110 L60,80 Z" fill="#000" />
                  
                  {/* Top Right Block */}
                  <path d="M140,50 L170,65 L140,80 L110,65 Z" fill="#0A0A0A" />
                  <path d="M110,65 L110,95 L140,110 L140,80 Z" fill="#050505" />
                  <path d="M170,65 L170,95 L140,110 L140,80 Z" fill="#000" />
                  
                  {/* Bottom Block */}
                  <path d="M100,110 L130,125 L100,140 L70,125 Z" fill="#0A0A0A" />
                  <path d="M70,125 L70,155 L100,170 L100,140 Z" fill="#050505" />
                  <path d="M130,125 L130,155 L100,170 L100,140 Z" fill="#000" />
                  
                  {/* Connections */}
                  <path d="M100,100 L60,80 M100,100 L140,80 M100,130 L100,140" stroke="#444" strokeDasharray="2 2" />
                </g>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#080808]/30 to-[#080808] pointer-events-none" />
              {/* FIG Label */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-[#555] tracking-widest">FIG 0.1</div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {[
              {
                n: "01", icon: TestTube2, title: "Report Submitted",
                body: "A supplier uploads a third-party COA, HPLC-UV, or LC-MS PDF to the platform.",
              },
              {
                n: "02", icon: Cpu, title: "IPFS Pinning",
                body: "The document is pinned to IPFS via Pinata — a permanent, tamper-proof Content Identifier is generated.",
              },
              {
                n: "03", icon: Activity, title: "On-Chain Attestation",
                body: "Metadata and CID are signed by the submitter's Solana wallet and anchored via the SAS protocol.",
              },
              {
                n: "04", icon: Microscope, title: "Permanent Record",
                body: "The evidence is now immutable. Trust scores update algorithmically. Anyone can verify the chain of custody.",
              },
            ].map(({ n, icon: Icon, title, body }) => (
              <motion.div
                key={n}
                variants={fade}
                className="p-7 rounded-xl border border-[#222] bg-[#0A0A0A] hover:border-[#333] hover:bg-[#111] transition-colors duration-300 group shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[12px] font-medium text-[#2DD4BF] bg-[#2DD4BF]/10 px-2 py-0.5 rounded-md tracking-wider">Step {n}</span>
                  <div className="w-px h-3 bg-[#333]" />
                  <Icon className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#EAEAEA] transition-colors" />
                </div>
                <h3 className="text-[17px] font-medium tracking-tight text-[#EAEAEA] mb-2">{title}</h3>
                <p className="text-[14px] text-[#A1A1AA] leading-[1.65]">{body}</p>
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
            <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#2EA043] mb-6 flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4" /> Core Infrastructure
            </p>
            <h2 className="text-[40px] md:text-[52px] font-semibold tracking-[-0.035em] leading-[1.05] text-white">
              Trust built on cryptography,<br />not reputation.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: ShieldCheck, title: "Cryptographic Provenance",
                body: "Every report is signed by the submitter's Solana wallet. Forgery is mathematically impossible.",
                accent: "#2DD4BF",
              },
              {
                icon: Database, title: "Permanent IPFS Storage",
                body: "Original PDFs are pinned to IPFS via Pinata. No central server can delete or alter evidence.",
                accent: "#2EA043",
              },
              {
                icon: Activity, title: "Solana Attestation Service",
                body: "SAS creates an immutable on-chain record — who verified it, what it said, and when. Sub-second finality.",
                accent: "#A371F7",
              },
              {
                icon: Microscope, title: "Algorithmic Trust Scores",
                body: "Supplier trust derives from on-chain evidence only — not forums, reviews, or paid placements.",
                accent: "#E3B341",
              },
            ].map(({ icon: Icon, title, body, accent }) => (
              <motion.div
                key={title}
                variants={fade}
                className="p-7 rounded-xl border border-[#222] bg-[#0A0A0A] hover:border-[#333] hover:bg-[#111] transition-colors duration-300 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg border flex items-center justify-center mb-5" style={{ backgroundColor: `${accent}10`, borderColor: `${accent}30` }}>
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <h3 className="text-[17px] font-medium tracking-tight text-[#EAEAEA] mb-2">{title}</h3>
                <p className="text-[14px] text-[#A1A1AA] leading-[1.65]">{body}</p>
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
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#2DD4BF] mb-4 flex items-center gap-2">
                <Dna className="w-4 h-4" /> Verified Suppliers
              </p>
              <h2 className="text-[36px] font-semibold tracking-[-0.03em] text-[#EAEAEA]">Ranked by on-chain evidence.</h2>
            </div>
            <Link href="/directory" className="text-[13px] font-medium text-[#A1A1AA] hover:text-[#EAEAEA] hover:border-[#444] bg-transparent transition-colors flex items-center gap-1.5 border border-[#333] px-4 py-2 rounded-md shadow-sm">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <div className="space-y-2">
            {topSuppliers.map((supplier, i) => (
              <motion.div key={supplier.id} variants={fade}>
                <Link
                  href={`/supplier/${supplier.id}`}
                  className="flex items-center justify-between p-5 rounded-xl border border-[#222] bg-[#0A0A0A] hover:border-[#333] hover:bg-[#111] transition-all duration-200 group shadow-sm"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-[12px] text-[#A1A1AA] w-5 text-center font-medium">0{i + 1}</span>
                    <div className="w-9 h-9 rounded-md bg-[#111] border border-[#222] flex items-center justify-center text-sm font-medium text-[#EAEAEA]">
                      {supplier.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-medium text-[#EAEAEA] tracking-tight">{supplier.name}</span>
                        {supplier.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#2EA043]" />}
                      </div>
                      <p className="text-[13px] text-[#666] mt-0.5 line-clamp-1">{supplier.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-1.5">
                      {supplier.compoundsSupported.slice(0, 3).map(c => (
                        <span key={c} className="text-[11px] px-2 py-0.5 rounded-md bg-[#111] text-[#A1A1AA] border border-[#222]">{c}</span>
                      ))}
                    </div>
                    <span className={`text-[15px] font-medium tracking-tight
                      ${supplier.trustScore >= 95 ? 'text-[#2DD4BF]' :
                        supplier.trustScore >= 88 ? 'text-[#2EA043]' : 'text-[#E3B341]'}`}>
                      {supplier.trustScore}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#EAEAEA] transition-colors" />
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
            <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#A371F7] mb-6 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> DAO Governance
            </p>
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
              <Link href="/governance" className="text-[13px] font-medium text-[#A1A1AA] hover:text-[#EAEAEA] hover:border-[#444] bg-transparent transition-colors flex items-center gap-1.5 border border-[#333] px-4 py-2 rounded-md inline-flex shadow-sm">
                Access Governance <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fade} className="space-y-3">
            {[
              { label: "Supplier: Peptide Sciences", status: "Tier 1 Verified", votes: "142 votes", c: "text-[#2DD4BF]", bg: "bg-[#2DD4BF]/10 border-[#2DD4BF]/20" },
              { label: "COA Dispute: Batch TB-26-02B", status: "Under Review", votes: "38 votes", c: "text-[#E3B341]", bg: "bg-[#E3B341]/10 border-[#E3B341]/20" },
              { label: "Fund: Community Testing Round", status: "Passed", votes: "201 votes", c: "text-[#2EA043]", bg: "bg-[#2EA043]/10 border-[#2EA043]/20" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border border-[#222] bg-[#0A0A0A] shadow-sm">
                <div>
                  <p className="text-[14px] font-medium text-[#EAEAEA]">{item.label}</p>
                  <p className="text-[12px] text-[#A1A1AA] mt-0.5">{item.votes}</p>
                </div>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-md border ${item.bg} ${item.c}`}>
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#EAEAEA] text-[#0A0A0A] text-[14px] font-medium hover:bg-white transition-all duration-200 shadow-sm"
            >
              Initialize <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-[#333] bg-transparent text-[#A1A1AA] text-[14px] font-medium hover:text-[#EAEAEA] hover:border-[#444] transition-all duration-200"
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
            <div className="w-5 h-5 rounded-md bg-[#2DD4BF]/20 border border-[#2DD4BF]/30 flex items-center justify-center">
              <Dna className="w-3 h-3 text-[#2DD4BF]" />
            </div>
            <span className="text-[13px] font-mono font-medium text-white">PepVerify</span>
            <span className="text-[12px] font-mono text-[#555] ml-1">v1.0.0</span>
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
