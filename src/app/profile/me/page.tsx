"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { MOCK_ATTESTATIONS, MOCK_REPORTS, MOCK_SUPPLIERS } from "@/lib/data";
import { ShieldCheck, Fingerprint, Activity, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { connected, publicKey } = useWallet();
  const addressString = publicKey ? publicKey.toBase58() : "8Xb...3Fz"; // Mock if disconnected for demo
  const isMocked = !connected;

  // Find attestations by this wallet
  const userAttestations = MOCK_ATTESTATIONS.filter(a => a.signerWallet === (isMocked ? "8Xb...3Fz" : addressString));

  return (
    <div className="flex flex-col h-full bg-[#080808] text-[#F0F0F0] overflow-y-auto min-h-full">
      <div className="px-8 py-12 border-b border-white/[0.06] bg-[#080808] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-[#5E6AD2]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-[#141414] border border-white/[0.08] flex items-center justify-center shadow-[0_0_30px_rgba(94,106,210,0.15)] relative overflow-hidden">
                <Fingerprint className="w-8 h-8 text-[#5E6AD2]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#5E6AD2]/10 to-transparent"></div>
              </div>
              <div>
                <h1 className="text-[28px] font-semibold tracking-tight mb-2 font-mono text-white">{addressString.slice(0, 4)}...{addressString.slice(-4)}</h1>
                <div className="flex items-center gap-3">
                  <span className="flex items-center text-[12px] font-medium bg-[#2EA043]/10 text-[#2EA043] border border-[#2EA043]/20 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Level 4 Researcher
                  </span>
                  <span className="text-[12px] text-[#888] font-mono bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                    Trust Score: 98
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-center p-4 bg-[#0C0C0C] border border-white/[0.06] rounded-xl w-32">
                <div className="text-[24px] font-semibold font-mono text-white">{userAttestations.length}</div>
                <div className="text-[10px] text-[#666] mt-1 uppercase tracking-widest">Attestations</div>
              </div>
              <div className="text-center p-4 bg-[#0C0C0C] border border-white/[0.06] rounded-xl w-32">
                <div className="text-[24px] font-semibold font-mono text-white">100%</div>
                <div className="text-[10px] text-[#666] mt-1 uppercase tracking-widest">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-12 max-w-5xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#888]" /> 
            Recent Evidence Submissions
          </h2>
          <Link href="/submit">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-[13px] font-medium hover:bg-white/90 transition-colors">
              <FileText className="w-4 h-4" /> Upload Evidence
            </button>
          </Link>
        </div>

        {userAttestations.length > 0 ? (
          <div className="rounded-xl border border-white/[0.06] bg-[#0C0C0C] overflow-hidden">
            <div className="grid grid-cols-12 text-[11px] font-medium text-[#666] border-b border-white/[0.06] p-4 bg-white/[0.01] uppercase tracking-widest">
              <div className="col-span-3">SAS Hash</div>
              <div className="col-span-3">Supplier</div>
              <div className="col-span-2 text-center">Compound</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Timestamp</div>
            </div>
            <div className="divide-y divide-white/[0.06]">
              {userAttestations.map((attestation) => {
                const report = MOCK_REPORTS.find(r => r.id === attestation.reportId);
                const supplier = MOCK_SUPPLIERS.find(s => s.id === report?.supplierId);
                
                return (
                  <div key={attestation.id} className="grid grid-cols-12 text-[13px] p-4 items-center hover:bg-white/[0.02] transition-colors">
                    <div className="col-span-3 font-mono text-[#5E6AD2] truncate pr-4 text-[12px]">
                      {attestation.sasAttestationId}
                    </div>
                    <div className="col-span-3 font-medium text-white">
                      {supplier?.name}
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className="font-mono text-[11px] bg-white/[0.04] border border-white/[0.06] text-[#888] px-2 py-0.5 rounded">
                        {report?.batchNumber.split("-")[0] || "Unknown"}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-[#2EA043] bg-[#2EA043]/10 px-2 py-0.5 rounded border border-[#2EA043]/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </div>
                    </div>
                    <div className="col-span-2 text-right font-mono text-[12px] text-[#666]">
                      {new Date(attestation.timestamp).toISOString().split('T')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="border border-white/[0.06] bg-[#0C0C0C] rounded-xl flex flex-col items-center justify-center py-20 text-center">
            <FileText className="w-12 h-12 text-[#444] mb-4" />
            <p className="text-[16px] font-medium text-white">No attestations found</p>
            <p className="text-[14px] text-[#888] max-w-md mt-2 mb-6">
              You haven't uploaded or verified any scientific reports yet. Contribute to the ecosystem by uploading your independent lab testing results.
            </p>
            <Link href="/submit">
              <button className="rounded-lg bg-white text-black px-4 py-2 text-[13px] font-medium hover:bg-white/90 transition-colors">Submit First Report</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
