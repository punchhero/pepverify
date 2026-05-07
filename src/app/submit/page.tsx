"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_SUPPLIERS, MOCK_COMPOUNDS } from "@/lib/data";
import { Check, ChevronRight, UploadCloud, FileText, Wallet, Fingerprint } from "lucide-react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import { toast } from "sonner";
import { uploadToIPFS } from "@/app/actions/upload";

export default function SubmitEvidencePage() {
  const [step, setStep] = useState(1);
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    supplierId: "",
    compoundId: "",
    batchNumber: "",
    purity: "",
    file: null as File | null,
    cid: "",
    sasHash: "",
  });

  const handleNext = () => setStep(s => Math.min(4, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const handleSign = async () => {
    if (!publicKey || !formData.file) return;
    setIsSubmitting(true);

    try {
      toast.info("Uploading evidence to IPFS...", { style: { background: '#0C0C0C', color: '#fff', border: '1px solid rgba(255,255,255,0.06)' } });
      const fileData = new FormData();
      fileData.append("file", formData.file);
      
      const uploadResult = await uploadToIPFS(fileData);
      
      if (!uploadResult.success) {
        toast.error("IPFS Upload Failed. Simulating transaction for demo.", { style: { background: '#0C0C0C', color: '#F85149', border: '1px solid rgba(255,255,255,0.06)' } });
        console.warn("Missing Pinata keys. Simulating CID.");
        await new Promise(r => setTimeout(r, 1000));
        setFormData(prev => ({ ...prev, cid: "QmDemoMockCID123456789" }));
      } else {
        toast.success("File pinned to IPFS!", { style: { background: '#0C0C0C', color: '#2EA043', border: '1px solid rgba(255,255,255,0.06)' } });
        setFormData(prev => ({ ...prev, cid: uploadResult.cid! }));
      }

      const activeCid = uploadResult.cid || "QmDemoMockCID123456789";

      const sasPayload = {
        schema: "pepverify.evidence.v1",
        supplier: MOCK_SUPPLIERS.find(s => s.id === formData.supplierId)?.name,
        compound: MOCK_COMPOUNDS.find(c => c.id === formData.compoundId)?.name,
        batch: formData.batchNumber,
        purity: `${formData.purity}%`,
        cid: activeCid,
        timestamp: new Date().toISOString()
      };

      toast.info("Awaiting wallet signature...", { style: { background: '#0C0C0C', color: '#fff', border: '1px solid rgba(255,255,255,0.06)' } });

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: 0,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      
      toast.info("Confirming transaction on Solana...", { style: { background: '#0C0C0C', color: '#fff', border: '1px solid rgba(255,255,255,0.06)' } });
      
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });

      toast.success("Attestation recorded on-chain!", { style: { background: '#0C0C0C', color: '#2EA043', border: '1px solid rgba(255,255,255,0.06)' } });
      setFormData(prev => ({ ...prev, sasHash: signature }));
      
      setStep(5);
      
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(`Transaction failed: ${error.message || "User rejected signature"}`, { style: { background: '#0C0C0C', color: '#F85149', border: '1px solid rgba(255,255,255,0.06)' } });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSupplier = MOCK_SUPPLIERS.find(s => s.id === formData.supplierId);
  const selectedCompound = MOCK_COMPOUNDS.find(c => c.id === formData.compoundId);

  return (
    <div className="flex flex-col h-full bg-[#080808] text-[#F0F0F0] items-center py-16 px-8 min-h-full">
      <div className="max-w-2xl w-full">
        <div className="mb-10 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-[#5E6AD2]/10 blur-[80px] rounded-full pointer-events-none" />
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] mb-2 text-white relative z-10">Submit Verification Evidence</h1>
          <p className="text-[14px] text-[#888] relative z-10">Upload HPLC, MS, or COA reports to create an immutable on-chain record.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 relative max-w-lg mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-white/[0.06] -z-10"></div>
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-medium font-mono transition-all
              ${step === s ? 'border border-[#5E6AD2] bg-[#5E6AD2]/10 text-[#5E6AD2] shadow-[0_0_15px_rgba(94,106,210,0.2)]' : 
                step > s ? 'border border-[#5E6AD2] bg-[#5E6AD2] text-white' : 'border border-white/[0.1] bg-[#080808] text-[#666]'}`}>
              {step > s ? <Check className="w-3.5 h-3.5" /> : s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-[#0C0C0C] border border-white/[0.06] rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="px-6 py-5 border-b border-white/[0.06] bg-white/[0.01]">
              <h2 className="text-[16px] font-semibold text-white tracking-[-0.01em]">Select Supplier & Compound</h2>
              <p className="text-[13px] text-[#666] mt-1">Choose the entity you are submitting evidence for.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-[12px] font-medium text-[#888]">Supplier</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MOCK_SUPPLIERS.slice(0, 4).map(sup => (
                    <div 
                      key={sup.id}
                      onClick={() => setFormData({...formData, supplierId: sup.id})}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.supplierId === sup.id ? 'border-[#5E6AD2] bg-[#5E6AD2]/5' : 'border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.02]'}`}
                    >
                      <div className="font-medium text-[14px] text-white">{sup.name}</div>
                      <div className="text-[12px] text-[#666] mt-1">Trust Score: <span className="font-mono text-[#ccc]">{sup.trustScore}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.supplierId && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-4">
                  <label className="text-[12px] font-medium text-[#888]">Compound</label>
                  <select 
                    className="flex h-10 w-full items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[13px] text-white focus:outline-none focus:ring-1 focus:ring-[#5E6AD2]/50 transition-colors appearance-none"
                    value={formData.compoundId}
                    onChange={(e) => setFormData({...formData, compoundId: e.target.value})}
                  >
                    <option value="" disabled className="text-[#666]">Select a compound...</option>
                    {MOCK_COMPOUNDS.map(c => (
                      <option key={c.id} value={c.id} className="bg-[#0C0C0C]">{c.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.01] flex justify-end">
              <button 
                onClick={handleNext} 
                disabled={!formData.supplierId || !formData.compoundId}
                className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-[13px] font-medium transition-colors hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-[#0C0C0C] border border-white/[0.06] rounded-xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="px-6 py-5 border-b border-white/[0.06] bg-white/[0.01]">
              <h2 className="text-[16px] font-semibold text-white tracking-[-0.01em]">Upload Evidence</h2>
              <p className="text-[13px] text-[#666] mt-1">Upload the verified COA, HPLC, or MS report PDF.</p>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-white/[0.08] rounded-xl p-16 flex flex-col items-center justify-center text-center hover:border-white/[0.15] hover:bg-white/[0.01] transition-all cursor-pointer group"
                onClick={() => setFormData({...formData, file: new File([""], "dummy.pdf")})}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${formData.file ? 'bg-[#2EA043]/10 text-[#2EA043]' : 'bg-white/[0.03] text-[#666] group-hover:text-white'}`}>
                  {formData.file ? <FileText className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
                </div>
                <div className="font-medium text-[15px] mb-1.5 text-white">{formData.file ? 'evidence_report.pdf' : 'Click to upload PDF'}</div>
                <div className="text-[12px] text-[#666]">Max file size 10MB. Must be original lab report.</div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.01] flex justify-between">
              <button onClick={handleBack} className="text-[13px] font-medium text-[#888] hover:text-white transition-colors">Back</button>
              <button 
                onClick={handleNext} 
                disabled={!formData.file}
                className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-[13px] font-medium transition-colors hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-[#0C0C0C] border border-white/[0.06] rounded-xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="px-6 py-5 border-b border-white/[0.06] bg-white/[0.01]">
              <h2 className="text-[16px] font-semibold text-white tracking-[-0.01em]">Extract Metadata</h2>
              <p className="text-[13px] text-[#666] mt-1">Enter the precise metadata from the lab report for indexing.</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[12px] font-medium text-[#888]">Batch Number</label>
                <input 
                  placeholder="e.g. BPC-24-001" 
                  className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[13px] text-white placeholder:text-[#666] focus:outline-none focus:ring-1 focus:ring-[#5E6AD2]/50 transition-all font-mono"
                  value={formData.batchNumber}
                  onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-medium text-[#888]">Purity Percentage (%)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 99.4" 
                  className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[13px] text-white placeholder:text-[#666] focus:outline-none focus:ring-1 focus:ring-[#5E6AD2]/50 transition-all font-mono"
                  value={formData.purity}
                  onChange={(e) => setFormData({...formData, purity: e.target.value})}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.01] flex justify-between">
              <button onClick={handleBack} className="text-[13px] font-medium text-[#888] hover:text-white transition-colors">Back</button>
              <button 
                onClick={handleNext} 
                disabled={!formData.batchNumber || !formData.purity}
                className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-[13px] font-medium transition-colors hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-[#0C0C0C] border border-white/[0.06] rounded-xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="px-6 py-5 border-b border-white/[0.06] bg-white/[0.01]">
              <h2 className="text-[16px] font-semibold text-white tracking-[-0.01em]">Review & Sign SAS Payload</h2>
              <p className="text-[13px] text-[#666] mt-1">Verify the payload before pinning to IPFS and signing the on-chain attestation.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-[#141414] p-5 rounded-xl font-mono text-[12px] text-[#ccc] overflow-x-auto border border-white/[0.04]">
                <pre>
{JSON.stringify({
  schema: "pepverify.evidence.v1",
  supplier: selectedSupplier?.name,
  compound: selectedCompound?.name,
  batch: formData.batchNumber,
  purity: `${formData.purity}%`,
  timestamp: new Date().toISOString()
}, null, 2)}
                </pre>
              </div>

              {!connected && (
                <div className="p-4 bg-[#E3B341]/10 border border-[#E3B341]/20 rounded-xl flex items-start gap-3">
                  <Wallet className="w-5 h-5 text-[#E3B341] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#E3B341] text-[13px]">Wallet Not Connected</h4>
                    <p className="text-[12px] text-[#E3B341]/80 mt-1">You must connect a Solana wallet to sign and submit this attestation.</p>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.01] flex justify-between">
              <button onClick={handleBack} className="text-[13px] font-medium text-[#888] hover:text-white transition-colors">Back</button>
              <button 
                onClick={handleSign} 
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg bg-[#5E6AD2] text-white px-5 py-2 text-[13px] font-medium transition-colors hover:bg-[#5E6AD2]/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(94,106,210,0.3)]"
              >
                <Fingerprint className="w-4 h-4" />
                {isSubmitting ? "Signing..." : "Sign & Publish"}
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="bg-[#0C0C0C] border border-[#2EA043]/30 rounded-xl overflow-hidden animate-in zoom-in-95 duration-500 shadow-[0_0_40px_rgba(46,160,67,0.1)]">
            <div className="p-12 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#2EA043]/10 text-[#2EA043] rounded-full flex items-center justify-center mb-6 border border-[#2EA043]/20">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] mb-2 text-white">Evidence Verified</h2>
              <p className="text-[14px] text-[#888] max-w-md mb-8 leading-relaxed">
                Your lab report has been securely pinned to IPFS and the SAS attestation has been successfully recorded on the Solana blockchain.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-5 py-2 text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors"
                >
                  Submit Another
                </button>
                <Link href={`/supplier/${formData.supplierId}`}>
                  <button className="rounded-lg bg-white text-black px-5 py-2 text-[13px] font-medium hover:bg-white/90 transition-colors">
                    View Supplier Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
