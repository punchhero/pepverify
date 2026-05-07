"use client";

import { Landmark, AlertTriangle, Users, Wallet, ShieldQuestion } from "lucide-react";
import { motion } from "framer-motion";

export default function GovernancePage() {
  const activeProposals = [
    {
      id: "PIP-42",
      title: "Verify Core Peptides as Tier 1 Supplier",
      description: "Core Peptides has met the 50 verified attestations threshold. Propose elevating to Tier 1 trusted status.",
      type: "Verification",
      status: "Active",
      timeRemaining: "2 days",
      forVotes: 142000,
      againstVotes: 12000,
      quorum: 75,
    },
    {
      id: "PIP-43",
      title: "Update Purity Standards for GLP-1 Analogues",
      description: "Require LC-MS testing in addition to HPLC for all GLP-1 analogue attestations moving forward.",
      type: "Standard",
      status: "Active",
      timeRemaining: "5 days",
      forVotes: 85000,
      againstVotes: 42000,
      quorum: 45,
    }
  ];

  const disputes = [
    {
      id: "DIS-09",
      target: "Science.bio - Batch SEM-23",
      reason: "Conflicting 3rd party testing results submitted by user",
      status: "Under Review",
      reporterStake: "5,000 PEP",
      date: "2024-05-02"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#080808] text-[#F0F0F0] pb-12 min-h-full">
      <div className="px-8 py-10 border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-[#A371F7]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#A371F7]/10 flex items-center justify-center border border-[#A371F7]/20">
              <Landmark className="w-5 h-5 text-[#A371F7]" />
            </div>
            <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-white">Governance Hub</h1>
          </div>
          <p className="text-[14px] text-[#888] mb-8 max-w-2xl">Participate in platform governance, vote on supplier verifications, and resolve evidence disputes.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0C0C0C] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-[12px] font-medium text-[#666] flex items-center justify-between mb-2">
                Treasury Balance
                <Wallet className="w-4 h-4 text-[#444]" />
              </h3>
              <div className="text-[24px] font-semibold tracking-[-0.03em] text-white">1,420,500 PEP</div>
              <p className="text-[12px] text-[#555] mt-1">~$214,000 USD equivalent</p>
            </div>
            <div className="bg-[#0C0C0C] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-[12px] font-medium text-[#666] flex items-center justify-between mb-2">
                Active Voters
                <Users className="w-4 h-4 text-[#444]" />
              </h3>
              <div className="text-[24px] font-semibold tracking-[-0.03em] text-white">1,245</div>
              <p className="text-[12px] text-[#555] mt-1">Unique wallets in last 30 days</p>
            </div>
            <div className="bg-[#0C0C0C] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-[12px] font-medium text-[#666] flex items-center justify-between mb-2">
                Open Disputes
                <AlertTriangle className="w-4 h-4 text-[#444]" />
              </h3>
              <div className="text-[24px] font-semibold tracking-[-0.03em] text-[#E3B341]">1</div>
              <p className="text-[12px] text-[#555] mt-1">Requires committee review</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-10 max-w-5xl mx-auto w-full">
        {/* Simple Tabs replacement for minimal look */}
        <div className="flex items-center gap-6 border-b border-white/[0.06] mb-8 pb-3">
          <button className="text-[14px] font-medium text-white border-b-2 border-white pb-3 -mb-[14px]">Active Proposals</button>
          <button className="text-[14px] font-medium text-[#666] hover:text-[#ccc] transition-colors pb-3 -mb-[14px]">Dispute Resolution</button>
          <button className="text-[14px] font-medium text-[#666] hover:text-[#ccc] transition-colors pb-3 -mb-[14px]">Voting History</button>
        </div>

        <div className="space-y-6">
          {activeProposals.map(proposal => {
            const totalVotes = proposal.forVotes + proposal.againstVotes;
            const forPercent = Math.round((proposal.forVotes / totalVotes) * 100) || 0;
            
            return (
              <div key={proposal.id} className="bg-[#0C0C0C] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold bg-[#A371F7]/10 text-[#A371F7] border border-[#A371F7]/20 px-2 py-0.5 rounded-md">{proposal.id}</span>
                      <span className="text-[11px] font-medium bg-white/[0.04] text-[#888] border border-white/[0.06] px-2 py-0.5 rounded-md">{proposal.type}</span>
                    </div>
                    <div className="text-[12px] text-[#666]">Ends in {proposal.timeRemaining}</div>
                  </div>
                  <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-white mb-2">{proposal.title}</h2>
                  <p className="text-[14px] text-[#888] leading-relaxed mb-6">{proposal.description}</p>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-[13px] mb-1.5">
                        <span className="font-medium text-white">For ({forPercent}%)</span>
                        <span className="text-[#666] font-mono">{proposal.forVotes.toLocaleString()} PEP</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2EA043]" style={{ width: `${forPercent}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[13px] mb-1.5">
                        <span className="font-medium text-white">Against ({100 - forPercent}%)</span>
                        <span className="text-[#666] font-mono">{proposal.againstVotes.toLocaleString()} PEP</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <div className="h-full bg-[#F85149]" style={{ width: `${100 - forPercent}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
                  <div className="text-[13px] text-[#666]">
                    Current Quorum: <span className={proposal.quorum >= 50 ? "text-[#2EA043] font-medium font-mono" : "font-mono"}>{proposal.quorum}%</span> / 50% required
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg text-[13px] font-medium border border-white/[0.08] text-[#888] hover:text-white hover:bg-white/[0.06] transition-colors">
                      Vote Against
                    </button>
                    <button className="px-4 py-2 rounded-lg text-[13px] font-medium bg-white text-black hover:bg-white/90 transition-colors">
                      Vote For
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
