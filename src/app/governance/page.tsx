import Link from "next/link";
import { ArrowRight, Dna, Terminal, Users, Database, ShieldAlert, Coins, Scale, Target, Microscope } from "lucide-react";

export default function GovernancePage() {
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
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#A371F7]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#A371F7] mb-6 flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4" /> Decentralized Organization
          </p>
          <h1 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.05] text-[#EAEAEA] mb-8">
            Community-Enforced Scientific Standards.
          </h1>
          <p className="text-[18px] text-[#A1A1AA] max-w-2xl mx-auto leading-[1.6]">
            PepTrace governance allows the community to participate in verification standards, dispute review, treasury allocation, and future protocol direction.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 space-y-24">
        
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#2EA043] pl-4">1. Governance Overview</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>Governance is designed to keep PepTrace radically transparent and aligned with the community of researchers, labs, and suppliers.</p>
            <p>Important protocol decisions, such as acceptable evidence types and supplier verification tier adjustments, will be publicly discussed and voted on. This ensures no central authority can arbitrarily manipulate the scientific index.</p>
            <p>We believe in progressive decentralization. Governance will evolve gradually as the protocol grows, starting with core parameter adjustments and eventually encompassing full treasury management.</p>
          </div>
        </div>

        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#5E6AD2] pl-4">2. TRACE Governance Token</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>The <strong>TRACE</strong> token will serve as the governance token of the PepTrace ecosystem.</p>
            <p>Token holders will be able to participate directly in governance proposals and protocol decisions. The governance framework strictly focuses on scientific standards and ecosystem coordination, protecting the integrity of the data.</p>
            <p>TRACE is intended purely for governance utility inside the protocol, acting as the sybil-resistant mechanism for reaching consensus on scientific truth.</p>
          </div>
        </div>

        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-8 border-l-4 border-[#E3B341] pl-4">3. Governance Responsibilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Target, title: "Verification Standards", desc: "Voting on acceptable testing methodologies and lab accreditation requirements." },
              { icon: ShieldAlert, title: "Supplier Tier Reviews", desc: "Auditing and upgrading/downgrading suppliers based on empirical track records." },
              { icon: Coins, title: "Treasury Allocation", desc: "Directing protocol resources to development, marketing, and infrastructure." },
              { icon: Scale, title: "Dispute Resolution", desc: "Reviewing flagged or contradictory Certificates of Analysis from the community." },
              { icon: Users, title: "Community Proposals", desc: "Submitting and voting on major architectural or UI/UX protocol upgrades." },
              { icon: Microscope, title: "Research Funding", desc: "Allocating grants for independent, third-party compound testing." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl border border-[#222] bg-[#0A0A0A] hover:border-[#333] transition-colors group">
                <Icon className="w-5 h-5 text-[#A371F7] mb-4" />
                <h3 className="text-[16px] font-medium text-[#EAEAEA] mb-2">{title}</h3>
                <p className="text-[13px] text-[#888] leading-[1.6]">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#2DD4BF] pl-4">4. Multisig & Treasury</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>Treasury transparency is a core tenet of the protocol. All protocol funds will be held in a transparent multisignature wallet visible on the blockchain.</p>
            <p>The transition to full community treasury control will happen via a gradual decentralization timeline, ensuring security while maintaining public accountability at every step.</p>
          </div>
        </div>

        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-6 border-l-4 border-[#EAEAEA] pl-4">5. Long-Term Goal</h2>
          <div className="space-y-4 text-[16px] text-[#A1A1AA] leading-[1.7]">
            <p>PepTrace aims to become a fully community-governed scientific verification network for peptide provenance and analytical evidence, resistant to capture and driven entirely by the pursuit of rigorous scientific truth.</p>
          </div>
        </div>

      </section>

      <section className="border-t border-[#222] bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-[32px] font-semibold tracking-tight text-white mb-6">
            Join the governance waitlist.
          </h2>
          <div className="flex justify-center">
            <Link
              href="/dao"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#EAEAEA] text-[#0A0A0A] text-[14px] font-medium hover:bg-white transition-colors"
            >
              Enter DAO <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
