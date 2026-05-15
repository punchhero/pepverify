import Link from "next/link";
import { ArrowRight, Dna, Microscope, FileText, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#080808] bg-hex-pattern text-[#F0F0F0] overflow-x-hidden relative">
      <div className="scanline"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-8 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#2DD4BF]/20 border border-[#2DD4BF]/30 flex items-center justify-center">
            <Dna className="w-3 h-3 text-[#2DD4BF]" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">PepTrace</span>
        </Link>
      </nav>

      <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-[#222]">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#2EA043]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#2EA043] mb-6 flex items-center justify-center gap-2">
            <Microscope className="w-4 h-4" /> System Protocol
          </p>
          <h1 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.05] text-[#EAEAEA] mb-8">
            Transparent Verification Methodology.
          </h1>
          <p className="text-[18px] text-[#A1A1AA] max-w-2xl mx-auto leading-[1.6]">
            PepTrace combines analytical evidence, community review, and cryptographic provenance to establish transparent scientific verification standards.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#2DD4BF] pl-4">1. Evidence Standards</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>All data on the PepTrace network must be backed by rigorous analytical evidence. The system accepts two primary tracks of document submission:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-[#EAEAEA]">
              <li><strong>Track 1: Verified Supplier Uploads.</strong> Suppliers with established cryptographic credibility can directly anchor Certificates of Analysis (COAs), HPLC, and LC-MS reports to the chain.</li>
              <li><strong>Track 2: Independent Submissions.</strong> Researchers and consumers are encouraged to submit their own independent third-party lab tests. These submissions enter a pending state and must pass DAO moderation before being published.</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-8 border-l-4 border-[#E3B341] pl-4">2. Verification Tiers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: FileText, title: "Pending Review", desc: "Evidence has been uploaded and anchored on-chain but awaits community and algorithmic verification.", color: "text-[#888]" },
              { icon: CheckCircle2, title: "Community Verified", desc: "Initial tests confirm validity, corroborated by decentralized reviewers or matching past heuristics.", color: "text-[#2DD4BF]" },
              { icon: ShieldAlert, title: "Tier 1 Verified", desc: "Supplier has a continuous, cryptographically verified history of >99% purity across multiple batches.", color: "text-[#2EA043]" },
              { icon: Microscope, title: "Disputed / Under Review", desc: "Evidence has been flagged for anomalies, conflicting reports, or suspicious metadata.", color: "text-[#E3B341]" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-6 rounded-xl border border-[#222] bg-[#0A0A0A] hover:border-[#333] transition-colors group">
                <Icon className={`w-5 h-5 mb-4 ${color}`} />
                <h3 className="text-[16px] font-medium text-[#EAEAEA] mb-2">{title}</h3>
                <p className="text-[13px] text-[#888] leading-[1.6]">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#A371F7] pl-4">3. DAO Moderation & Community Review</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>Verification is not a black box. The evidence review process is fully transparent and actively moderated by the scientific community through the PepTrace DAO.</p>
            <p>Before any independent consumer or researcher test is officially indexed and aggregated into a supplier&apos;s overall trust score, it is thoroughly reviewed by DAO members. This prevents spam, verifies lab accreditation, and ensures malicious actors cannot artificially inflate or suppress scores.</p>
            <p>Post-publication, public verification discussion happens directly on the evidence metadata layer. If a COA appears manipulated, the community flagging system initiates a dispute escalation.</p>
          </div>
        </div>

        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#5E6AD2] pl-4">4. Provenance System</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>PepTrace relies on a decentralized, immutable record architecture to guarantee evidence longevity.</p>
            <p>When analytical reports are submitted, they are timestamped and cryptographically signed on the Solana blockchain. This creates transparent audit trails and provenance chains.</p>
            <p>Once evidence is on-chain, it cannot be quietly deleted or modified. The timeline is mathematically absolute.</p>
          </div>
        </div>

        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#EAEAEA] pl-4">5. Scientific Integrity</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>Our core operating principle is transparency-first. There is zero tolerance for unverifiable claims.</p>
            <p>By enforcing an evidence-based methodology and open scientific standards, PepTrace ensures that researchers have the absolute certainty required to conduct reproducible, safe science.</p>
          </div>
        </div>

      </section>

      <section className="border-t border-[#222] bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-[32px] font-semibold tracking-tight text-white mb-6">
            Join the network building transparent peptide verification.
          </h2>
          <div className="flex justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#EAEAEA] text-[#0A0A0A] text-[14px] font-medium hover:bg-white transition-colors"
            >
              Access Terminal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
