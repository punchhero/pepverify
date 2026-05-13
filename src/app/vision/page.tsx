import Link from "next/link";
import { ArrowRight, Dna, Activity, Terminal, ShieldCheck, Microscope } from "lucide-react";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-[#080808] bg-hex-pattern text-[#F0F0F0] overflow-x-hidden relative">
      <div className="scanline"></div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-8 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#2DD4BF]/20 border border-[#2DD4BF]/30 flex items-center justify-center">
            <Dna className="w-3 h-3 text-[#2DD4BF]" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">PepTrace</span>
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-[#222]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#5E6AD2]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#5E6AD2] mb-6 flex items-center justify-center gap-2">
            <Activity className="w-4 h-4" /> Founder Manifesto
          </p>
          <h1 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.05] text-[#EAEAEA] mb-8">
            The Future of Scientific Provenance.
          </h1>
          <p className="text-[18px] text-[#A1A1AA] max-w-2xl mx-auto leading-[1.6]">
            PepTrace exists to bring transparency, verification, and community-enforced scientific standards to peptide research and supply infrastructure.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto px-6 py-24 space-y-24">
        
        {/* 1. The Problem */}
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#E3B341] pl-4">1. The Problem</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>The global market for research peptides operates in an opaque environment where trust is dangerously assumed rather than cryptographically verified.</p>
            <p>Verification standards are entirely fragmented. Suppliers self-report analytical results, and researchers are forced to rely on these claims without shared evidence systems.</p>
            <p>Crucial analytical documents—like Certificates of Analysis (COAs) and mass spectrometry testing—are routinely difficult to verify, occasionally manipulated, or reused across disparate batches. Scientific provenance is fundamentally broken.</p>
          </div>
        </div>

        {/* 2. Why This Matters */}
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#2EA043] pl-4">2. Why This Matters</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>Open verification creates intrinsic trust. When scientific evidence is publicly accessible and cryptographically sound, it elevates the quality of research globally.</p>
            <p>Immutable provenance mathematically reduces fraud. An unalterable timeline of batch testing protects researchers from contaminated or degraded compounds.</p>
            <p>We believe community standards scale significantly better than centralized trust authorities, particularly in niche scientific disciplines.</p>
          </div>
        </div>

        {/* 3. Why DeSci */}
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#5E6AD2] pl-4">3. Why Decentralized Science (DeSci)</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>Decentralized science (DeSci) enables permissionless, open participation from labs, researchers, and suppliers globally.</p>
            <p>Governance of scientific standards should be community-driven, transparent, and aligned with the pursuit of empirical truth.</p>
            <p>By leveraging decentralized infrastructure (like IPFS and Solana), PepTrace ensures all verification data is auditable, uncensorable, and permanent. In this ecosystem, scientific reputation must be earned through evidence, not marketing.</p>
          </div>
        </div>

        {/* 4. The Vision */}
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#2DD4BF] pl-4">4. The Vision</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>PepTrace aims to become the foundational public verification layer for peptide science.</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-[#EAEAEA]">
              <li>A transparent evidence network indexing all analytical testing.</li>
              <li>A community-governed scientific trust protocol.</li>
              <li>Open infrastructure for scientific provenance and reagent safety.</li>
            </ul>
          </div>
        </div>

      </section>

      {/* CTA */}
      <section className="border-t border-[#222] bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-[32px] font-semibold tracking-tight text-white mb-6">
            Help build the future of transparent scientific verification.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#EAEAEA] text-[#0A0A0A] text-[14px] font-medium hover:bg-white transition-colors"
            >
              Join Waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/governance"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-[#333] bg-transparent text-[#A1A1AA] text-[14px] font-medium hover:text-[#EAEAEA] hover:border-[#444] transition-colors"
            >
              Read Governance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
