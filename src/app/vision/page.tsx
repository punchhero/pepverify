import Link from "next/link";
import { ArrowRight, Dna, Activity, Terminal, ShieldCheck, Microscope, Database, Lock, Cpu, Network, Server, Users, Search } from "lucide-react";

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
            <Activity className="w-4 h-4" /> Protocol Whitepaper
          </p>
          <h1 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.05] text-[#EAEAEA] mb-8">
            The Future of Scientific Provenance.
          </h1>
          <p className="text-[18px] text-[#A1A1AA] max-w-2xl mx-auto leading-[1.6]">
            PepTrace brings decentralized cryptographic provenance to peptide research, shifting the ecosystem from &quot;trust-based&quot; to &quot;verification-based.&quot;
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        
        {/* 1. The Crisis of Trust */}
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#E3B341] pl-4">1. The Crisis of Trust</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>The distribution and sourcing of research peptides suffer from a systemic reproducibility and trust crisis. Suppliers operate in opaque environments where analytical testing results—such as Certificates of Analysis (COAs), High-Performance Liquid Chromatography (HPLC), and Mass Spectrometry (MS) reports—are frequently manipulated, reused across disparate batches, or quietly deleted.</p>
            <p>Without a decentralized source of truth, independent researchers are forced to rely on subjective, easily manipulated community forums for supplier validation, leading to compromised research integrity and potential safety hazards.</p>
            <p><strong>PepTrace introduces cryptographic provenance to the scientific supply chain.</strong> While verified suppliers anchor primary batch data, we empower researchers and consumers to submit their own independent third-party lab tests. To ensure maximum integrity, consumer-submitted evidence undergoes rigorous DAO moderation before being published to the public index.</p>
          </div>
        </div>

        {/* 2. What We Are Building */}
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-8 border-l-4 border-[#2DD4BF] pl-4">2. What We Are Building</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Terminal, title: "Premium DeSci Interface", desc: "A data-dense, academic dashboard replacing generic crypto-UI patterns with institutional-grade design." },
              { icon: Database, title: "The Evidence Vault", desc: "A decentralized-backed repository to search historical lab reports linked to specific batches." },
              { icon: ShieldCheck, title: "Zero-Trust Pipeline", desc: "Ingests 3rd-party reports, pins them to IPFS, and anchors them to Solana via Attestation Services." },
              { icon: Activity, title: "Algorithmic Trust Scoring", desc: "A dynamic leaderboard ranking suppliers based on the volume and recency of on-chain attestations." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl border border-[#222] bg-[#0A0A0A] hover:border-[#333] transition-colors">
                <Icon className="w-5 h-5 text-[#2DD4BF] mb-4" />
                <h3 className="text-[16px] font-medium text-[#EAEAEA] mb-2">{title}</h3>
                <p className="text-[13px] text-[#888] leading-[1.6]">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Why It Matters */}
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#EAEAEA] pl-4">3. Why It Matters</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>The current scientific supply chain is broken, resulting in severe consequences:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-[#EAEAEA]">
              <li><strong>Safety Hazards:</strong> Researchers unknowingly utilize contaminated or under-dosed compounds.</li>
              <li><strong>Wasted Capital & Time:</strong> Studies fail to replicate because the underlying materials were not what they claimed to be.</li>
              <li><strong>Information Asymmetry:</strong> Buyers rely on easily faked PDF reports or astroturfed forum reviews.</li>
            </ul>
            <p className="mt-4">PepTrace <strong>commoditizes truth</strong>. It creates an immutable timeline of evidence. If a supplier changes a formula or fakes a COA, the cryptographic hash will not match the historical on-chain record.</p>
          </div>
        </div>

        {/* 4. Ecosystem Benefits */}
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-8 border-l-4 border-[#2EA043] pl-4">4. Ecosystem Benefits</h2>
          <div className="space-y-8">
            <div className="p-6 rounded-xl border border-[#222] bg-[#0A0A0A]">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-5 h-5 text-[#2EA043]" />
                <h3 className="text-[18px] font-medium text-white">For Researchers</h3>
              </div>
              <ul className="space-y-2 text-[14px] text-[#A1A1AA]">
                <li><strong className="text-[#EAEAEA]">Zero-Trust Verification:</strong> Mathematical proof of document authenticity. You don&apos;t trust the supplier; you verify the cryptography.</li>
                <li><strong className="text-[#EAEAEA]">Tamper-Proof History:</strong> A permanent archive unaffected by website redesigns or deleted files.</li>
                <li><strong className="text-[#EAEAEA]">Objective Metrics:</strong> Evaluate suppliers based on immutable algorithmic scores.</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-[#222] bg-[#0A0A0A]">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#2EA043]" />
                <h3 className="text-[18px] font-medium text-white">For Legitimate Suppliers</h3>
              </div>
              <ul className="space-y-2 text-[14px] text-[#A1A1AA]">
                <li><strong className="text-[#EAEAEA]">Cryptographic Credibility:</strong> Prove superior quality with unassailable, timestamped evidence.</li>
                <li><strong className="text-[#EAEAEA]">Market Differentiation:</strong> Stand out by logging testing data on-chain to boost trust scores.</li>
                <li><strong className="text-[#EAEAEA]">Reduced Friction:</strong> Share verifiable testing histories instantly without easily forgeable PDFs.</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-[#222] bg-[#0A0A0A]">
              <div className="flex items-center gap-3 mb-4">
                <Network className="w-5 h-5 text-[#2EA043]" />
                <h3 className="text-[18px] font-medium text-white">For the DeSci Ecosystem</h3>
              </div>
              <ul className="space-y-2 text-[14px] text-[#A1A1AA]">
                <li><strong className="text-[#EAEAEA]">Composable Data:</strong> Verified metadata lives on public infrastructure, allowing DAOs and researchers to build upon it.</li>
                <li><strong className="text-[#EAEAEA]">Community Curation:</strong> Empowers the community to resolve disputes based on evidence, not authority.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5. Technical Architecture */}
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#5E6AD2] pl-4">5. Technical Architecture</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>PepTrace is engineered for high performance, utilizing a modern stack designed for rapid data retrieval, intense data density, and seamless Web3 interaction.</p>
            
            <h3 className="text-[18px] font-medium text-white mt-8 mb-4 flex items-center gap-2"><Cpu className="w-4 h-4 text-[#5E6AD2]" /> Protocol Workflow</h3>
            <ol className="list-decimal pl-6 space-y-2 text-[#EAEAEA]">
              <li><strong>Evidence Ingestion:</strong> A verified supplier or an independent researcher submits a 3rd-party analytical report.</li>
              <li><strong>Decentralized Storage:</strong> Uploaded to IPFS, generating a permanent Content Identifier (CID).</li>
              <li><strong>DAO Moderation:</strong> Submissions from independent researchers enter a pending state and must pass DAO community review to prevent spam and verify lab credentials before publication.</li>
              <li><strong>Cryptographic Anchoring:</strong> Once approved (or if submitted by a verified supplier), the metadata and CID are signed via the Solana Attestation Service (SAS) and recorded permanently.</li>
            </ol>

            <h3 className="text-[18px] font-medium text-white mt-8 mb-4 flex items-center gap-2"><Server className="w-4 h-4 text-[#5E6AD2]" /> Infrastructure</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#EAEAEA]">
              <li><strong>Blockchain:</strong> Solana for high throughput and micro-transaction viability.</li>
              <li><strong>Storage:</strong> IPFS integration via Pinata for immutable document hosting.</li>
              <li><strong>Database:</strong> Supabase (PostgreSQL) as a high-speed indexing layer with strict RLS.</li>
              <li><strong>Frontend:</strong> Next.js 15 (App Router), Strict TypeScript, Tailwind CSS v4, and framer-motion micro-animations.</li>
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
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#EAEAEA] text-[#0A0A0A] text-[14px] font-medium hover:bg-white transition-colors"
            >
              Access Terminal <ArrowRight className="w-4 h-4" />
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
