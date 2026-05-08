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
    <div className="flex flex-col h-full bg-[#080808] bg-grid-pattern text-[#F0F0F0] overflow-y-auto min-h-full relative">
      <div className="scanline"></div>
      <div className="px-8 py-12 border-b border-[#333] bg-[#080808]/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-[#5E6AD2]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded bg-[#141414] border border-[#333] flex items-center justify-center shadow-[0_0_30px_rgba(94,106,210,0.15)] relative overflow-hidden">
                <Fingerprint className="w-8 h-8 text-[#5E6AD2]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#5E6AD2]/10 to-transparent"></div>
              </div>
              <div>
                <h1 className="text-[28px] font-semibold tracking-tight mb-2 font-mono text-white">{addressString.slice(0, 4)}...{addressString.slice(-4)}</h1>
                <div className="flex items-center gap-3">
                  <span className="flex items-center text-[11px] font-medium text-[#2EA043] bg-[#2EA043]/10 border border-[#2EA043]/20 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Level 4 Researcher
                  </span>
                  <span className="text-[11px] text-[#A1A1AA] bg-[#111] px-2 py-0.5 rounded-md border border-[#333]">
                    Trust Score: <span className="text-[#EAEAEA] font-medium">98</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-center p-4 bg-[#0A0A0A] border border-[#222] rounded-lg w-32 shadow-sm">
                <div className="text-[24px] font-medium text-[#EAEAEA]">{userAttestations.length}</div>
                <div className="text-[11px] text-[#A1A1AA] mt-1">Attestations</div>
              </div>
              <div className="text-center p-4 bg-[#0A0A0A] border border-[#222] rounded-lg w-32 shadow-sm">
                <div className="text-[24px] font-medium text-[#EAEAEA]">100%</div>
                <div className="text-[11px] text-[#A1A1AA] mt-1">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-12 max-w-5xl mx-auto w-full space-y-6 relative z-10">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-[15px] font-medium tracking-tight text-[#EAEAEA] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#A1A1AA]" /> 
            Recent Evidence Submissions
          </h2>
          <Link href="/submit">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-black text-[12px] font-medium hover:bg-white/90 transition-colors shadow-sm">
              <FileText className="w-3.5 h-3.5" /> Upload Evidence
            </button>
          </Link>
        </div>

        {userAttestations.length > 0 ? (
          <div className="rounded-xl border border-[#222] bg-[#0A0A0A] overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 text-[11px] font-medium text-[#A1A1AA] border-b border-[#222] p-3 px-4 bg-[#111]/50">
              <div className="col-span-3">SAS Hash</div>
              <div className="col-span-3">Supplier Entity</div>
              <div className="col-span-2 text-center">Compound</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Timestamp</div>
            </div>
            <div className="divide-y divide-[#222]">
              {userAttestations.map((attestation) => {
                const report = MOCK_REPORTS.find(r => r.id === attestation.reportId);
                const supplier = MOCK_SUPPLIERS.find(s => s.id === report?.supplierId);
                
                return (
                  <div key={attestation.id} className="grid grid-cols-12 text-[13px] p-3 px-4 items-center hover:bg-[#111] transition-colors">
                    <div className="col-span-3 font-mono text-[#5E6AD2] truncate pr-4 text-[12px]">
                      {attestation.sasAttestationId}
                    </div>
                    <div className="col-span-3 font-medium text-[#EAEAEA]">
                      {supplier?.name}
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className="text-[11px] bg-[#1A1A1A] border border-[#333] text-[#A1A1AA] px-2 py-0.5 rounded-md">
                        {report?.batchNumber.split("-")[0] || "Unknown"}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#2EA043]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </div>
                    </div>
                    <div className="col-span-2 text-right text-[12px] text-[#888]">
                      {new Date(attestation.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="border border-[#222] bg-[#0A0A0A] rounded-xl flex flex-col items-center justify-center py-20 text-center shadow-sm">
            <FileText className="w-10 h-10 text-[#444] mb-4" />
            <p className="text-[15px] font-medium text-[#EAEAEA]">No attestations found</p>
            <p className="text-[13px] text-[#A1A1AA] max-w-md mt-2 mb-6">
              You haven't uploaded or verified any scientific reports yet. Contribute to the ecosystem by uploading your independent lab testing results.
            </p>
            <Link href="/submit">
              <button className="rounded-md bg-white text-black px-4 py-2 text-[12px] font-medium hover:bg-white/90 transition-colors shadow-sm">Submit First Report</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
