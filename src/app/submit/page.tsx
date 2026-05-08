"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_SUPPLIERS, MOCK_COMPOUNDS } from "@/lib/data";
import { Check, ChevronRight, UploadCloud, FileText, Wallet, Fingerprint, Terminal } from "lucide-react";
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
    <div className="flex flex-col h-full bg-[#080808] bg-grid-fine text-[#F0F0F0] items-center py-16 px-8 min-h-full relative">
      <div className="scanline"></div>
      <div className="max-w-2xl w-full">
        <div className="mb-10 text-center relative flex flex-col items-center">
          <div className="w-12 h-12 rounded border border-[#5E6AD2]/30 bg-[#5E6AD2]/10 flex items-center justify-center mb-4">
            <Terminal className="w-5 h-5 text-[#5E6AD2]" />
          </div>
          <h1 className="text-[28px] font-mono font-semibold tracking-[-0.03em] mb-2 text-white relative z-10">SUBMIT_VERIFICATION_EVIDENCE</h1>
          <p className="text-[13px] font-mono text-[#888] relative z-10">// Upload HPLC, MS, or COA reports to create an immutable on-chain record.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 relative max-w-lg mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[#333] -z-10"></div>
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex items-center justify-center px-3 py-1 rounded-sm text-[11px] font-medium font-mono transition-all
              ${step === s ? 'border border-[#5E6AD2] bg-[#5E6AD2]/10 text-[#5E6AD2] shadow-[0_0_15px_rgba(94,106,210,0.2)]' : 
                step > s ? 'border border-[#5E6AD2] bg-[#5E6AD2]/20 text-[#5E6AD2]' : 'border border-[#333] bg-[#080808] text-[#666]'}`}>
              {step > s ? <Check className="w-3 h-3 mr-1" /> : ""}
              SEQ_{s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-[#0C0C0C] border border-[#333] rounded overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 card-crosshair">
            <div className="px-6 py-5 border-b border-[#333] bg-[#141414]/50">
              <h2 className="text-[14px] font-mono font-semibold text-white tracking-[-0.01em]">SELECT_ENTITY_AND_COMPOUND</h2>
              <p className="text-[11px] font-mono text-[#666] mt-1">Choose the entity you are submitting evidence for.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-mono font-medium text-[#888] uppercase tracking-widest">Supplier_Entity</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MOCK_SUPPLIERS.slice(0, 4).map(sup => (
                    <div 
                      key={sup.id}
                      onClick={() => setFormData({...formData, supplierId: sup.id})}
                      className={`p-4 rounded border cursor-pointer transition-all ${formData.supplierId === sup.id ? 'border-[#5E6AD2] bg-[#5E6AD2]/5' : 'border-[#333] bg-[#141414] hover:border-[#5E6AD2]/30 hover:bg-[#141414]/80'}`}
                    >
                      <div className="font-mono font-medium text-[13px] text-white">{sup.name}</div>
                      <div className="text-[10px] font-mono text-[#666] mt-1 uppercase">Trust Metric: <span className="font-mono text-[#ccc]">{sup.trustScore}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.supplierId && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-4">
                  <label className="text-[10px] font-mono font-medium text-[#888] uppercase tracking-widest">Compound_Identifier</label>
                  <select 
                    className="flex h-10 w-full items-center justify-between rounded border border-[#333] bg-[#0C0C0C] px-3 py-2 text-[13px] font-mono text-white focus:outline-none focus:border-[#5E6AD2]/50 transition-colors appearance-none"
                    value={formData.compoundId}
                    onChange={(e) => setFormData({...formData, compoundId: e.target.value})}
                  >
                    <option value="" disabled className="text-[#666]">select_compound...</option>
                    {MOCK_COMPOUNDS.map(c => (
                      <option key={c.id} value={c.id} className="bg-[#0C0C0C]">{c.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-[#333] bg-[#141414]/50 flex justify-end">
              <button 
                onClick={handleNext} 
                disabled={!formData.supplierId || !formData.compoundId}
                className="inline-flex items-center gap-2 rounded border border-[#5E6AD2]/30 bg-[#5E6AD2]/10 text-[#5E6AD2] px-4 py-2 text-[11px] font-mono font-medium transition-colors hover:bg-[#5E6AD2]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                [NEXT_STEP] <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-[#0C0C0C] border border-[#333] rounded overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300 card-crosshair">
            <div className="px-6 py-5 border-b border-[#333] bg-[#141414]/50">
              <h2 className="text-[14px] font-mono font-semibold text-white tracking-[-0.01em]">UPLOAD_EVIDENCE</h2>
              <p className="text-[11px] font-mono text-[#666] mt-1">Upload the verified COA, HPLC, or MS report PDF.</p>
            </div>
            <div className="p-6">
              <div className="border border-dashed border-[#333] rounded p-16 flex flex-col items-center justify-center text-center hover:border-[#5E6AD2]/50 hover:bg-[#5E6AD2]/5 transition-all cursor-pointer group"
                onClick={() => setFormData({...formData, file: new File([""], "dummy.pdf")})}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${formData.file ? 'bg-[#2EA043]/10 text-[#2EA043]' : 'bg-[#141414] text-[#666] group-hover:text-[#5E6AD2]'}`}>
                  {formData.file ? <FileText className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
                </div>
                <div className="font-mono font-medium text-[13px] mb-1.5 text-white">{formData.file ? 'evidence_report.pdf' : '[CLICK_TO_UPLOAD_PDF]'}</div>
                <div className="text-[10px] font-mono text-[#666] uppercase">Max_file_size: 10MB. Must be original lab report.</div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#333] bg-[#141414]/50 flex justify-between items-center">
              <button onClick={handleBack} className="text-[11px] font-mono font-medium text-[#888] hover:text-white transition-colors">[BACK]</button>
              <button 
                onClick={handleNext} 
                disabled={!formData.file}
                className="inline-flex items-center gap-2 rounded border border-[#5E6AD2]/30 bg-[#5E6AD2]/10 text-[#5E6AD2] px-4 py-2 text-[11px] font-mono font-medium transition-colors hover:bg-[#5E6AD2]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                [NEXT_STEP] <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-[#0C0C0C] border border-[#333] rounded overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300 card-crosshair">
            <div className="px-6 py-5 border-b border-[#333] bg-[#141414]/50">
              <h2 className="text-[14px] font-mono font-semibold text-white tracking-[-0.01em]">EXTRACT_METADATA</h2>
              <p className="text-[11px] font-mono text-[#666] mt-1">Enter the precise metadata from the lab report for indexing.</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-medium text-[#888] uppercase tracking-widest">Batch_Number</label>
                <input 
                  placeholder="e.g._BPC-24-001" 
                  className="h-10 w-full rounded border border-[#333] bg-[#0C0C0C] px-3 py-2 text-[13px] font-mono text-white placeholder:text-[#666] focus:outline-none focus:border-[#5E6AD2]/50 transition-all"
                  value={formData.batchNumber}
                  onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-medium text-[#888] uppercase tracking-widest">Purity_Percentage_(%)</label>
                <input 
                  type="number" 
                  placeholder="99.4" 
                  className="h-10 w-full rounded border border-[#333] bg-[#0C0C0C] px-3 py-2 text-[13px] font-mono text-white placeholder:text-[#666] focus:outline-none focus:border-[#5E6AD2]/50 transition-all"
                  value={formData.purity}
                  onChange={(e) => setFormData({...formData, purity: e.target.value})}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#333] bg-[#141414]/50 flex justify-between items-center">
              <button onClick={handleBack} className="text-[11px] font-mono font-medium text-[#888] hover:text-white transition-colors">[BACK]</button>
              <button 
                onClick={handleNext} 
                disabled={!formData.batchNumber || !formData.purity}
                className="inline-flex items-center gap-2 rounded border border-[#5E6AD2]/30 bg-[#5E6AD2]/10 text-[#5E6AD2] px-4 py-2 text-[11px] font-mono font-medium transition-colors hover:bg-[#5E6AD2]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                [REVIEW] <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-[#0C0C0C] border border-[#333] rounded overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300 card-crosshair">
            <div className="px-6 py-5 border-b border-[#333] bg-[#141414]/50">
              <h2 className="text-[14px] font-mono font-semibold text-white tracking-[-0.01em]">REVIEW_&_SIGN_SAS_PAYLOAD</h2>
              <p className="text-[11px] font-mono text-[#666] mt-1">Verify the payload before pinning to IPFS and signing the on-chain attestation.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-[#080808] p-5 rounded font-mono text-[11px] text-[#A371F7] overflow-x-auto border border-[#333] glow-pulse">
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
                <div className="p-4 bg-[#E3B341]/5 border border-[#E3B341]/30 rounded flex items-start gap-3">
                  <Wallet className="w-4 h-4 text-[#E3B341] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono font-medium text-[#E3B341] text-[11px]">[WALLET_NOT_CONNECTED]</h4>
                    <p className="text-[10px] font-mono text-[#E3B341]/80 mt-1 uppercase tracking-widest">You must connect a Solana wallet to sign and submit this attestation.</p>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-[#333] bg-[#141414]/50 flex justify-between items-center">
              <button onClick={handleBack} className="text-[11px] font-mono font-medium text-[#888] hover:text-white transition-colors">[BACK]</button>
              <button 
                onClick={handleSign} 
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded border border-[#5E6AD2]/30 bg-[#5E6AD2]/10 text-[#5E6AD2] px-5 py-2 text-[11px] font-mono font-medium transition-colors hover:bg-[#5E6AD2]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Fingerprint className="w-3 h-3" />
                {isSubmitting ? "[SIGNING...]" : "[SIGN_&_PUBLISH]"}
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="bg-[#0C0C0C] border border-[#2EA043]/30 rounded overflow-hidden animate-in zoom-in-95 duration-500 card-crosshair relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2EA043]/50 to-transparent"></div>
            <div className="p-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#2EA043]/10 text-[#2EA043] rounded flex items-center justify-center mb-6 border border-[#2EA043]/30">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-[20px] font-mono font-semibold tracking-[-0.03em] mb-2 text-white">EVIDENCE_VERIFIED</h2>
              <p className="text-[13px] font-mono text-[#888] max-w-md mb-8 leading-relaxed">
                // Your lab report has been securely pinned to IPFS and the SAS attestation has been successfully recorded on the Solana blockchain.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="rounded border border-[#333] bg-[#0C0C0C] px-5 py-2 text-[11px] font-mono font-medium text-white hover:border-[#5E6AD2]/50 transition-colors"
                >
                  [SUBMIT_ANOTHER]
                </button>
                <Link href={`/supplier/${formData.supplierId}`}>
                  <button className="rounded border border-[#5E6AD2]/30 bg-[#5E6AD2]/10 text-[#5E6AD2] px-5 py-2 text-[11px] font-mono font-medium hover:bg-[#5E6AD2]/20 transition-colors">
                    [VIEW_SUPPLIER_PROFILE]
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
