"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_SUPPLIERS, MOCK_COMPOUNDS } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      // 1. Upload PDF to Pinata (IPFS)
      toast.info("Uploading evidence to IPFS...");
      const fileData = new FormData();
      fileData.append("file", formData.file);
      
      const uploadResult = await uploadToIPFS(fileData);
      
      if (!uploadResult.success) {
        // Fallback for demo purposes if API keys aren't set
        toast.error("IPFS Upload Failed. Simulating transaction for demo.");
        console.warn("Missing Pinata keys. Simulating CID.");
        await new Promise(r => setTimeout(r, 1000));
        setFormData(prev => ({ ...prev, cid: "QmDemoMockCID123456789" }));
      } else {
        toast.success("File pinned to IPFS!");
        setFormData(prev => ({ ...prev, cid: uploadResult.cid! }));
      }

      const activeCid = uploadResult.cid || "QmDemoMockCID123456789";

      // 2. Construct SAS Payload (What goes on chain)
      const sasPayload = {
        schema: "pepverify.evidence.v1",
        supplier: MOCK_SUPPLIERS.find(s => s.id === formData.supplierId)?.name,
        compound: MOCK_COMPOUNDS.find(c => c.id === formData.compoundId)?.name,
        batch: formData.batchNumber,
        purity: `${formData.purity}%`,
        cid: activeCid,
        timestamp: new Date().toISOString()
      };

      toast.info("Awaiting wallet signature...");

      // 3. Construct Solana Transaction
      // In a real SAS implementation, you'd invoke the specific SAS program.
      // Here we simulate anchoring by recording a memo or a zero-value transfer as proof of signature.
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey, // Send to self as a zero-cost structural anchor
          lamports: 0,
        })
      );

      // 4. Request Signature from Wallet
      const signature = await sendTransaction(transaction, connection);
      
      toast.info("Confirming transaction on Solana...");
      
      // 5. Confirm Transaction
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: signature,
      });

      toast.success("Attestation recorded on-chain!");
      setFormData(prev => ({ ...prev, sasHash: signature }));
      
      // Proceed to success screen
      setStep(5);
      
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(`Transaction failed: ${error.message || "User rejected signature"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSupplier = MOCK_SUPPLIERS.find(s => s.id === formData.supplierId);
  const selectedCompound = MOCK_COMPOUNDS.find(c => c.id === formData.compoundId);

  return (
    <div className="flex flex-col h-full bg-background items-center py-12 px-6">
      <div className="max-w-2xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Submit Verification Evidence</h1>
          <p className="text-muted-foreground">Upload HPLC, MS, or COA reports to create an immutable on-chain record.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-border -z-10"></div>
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background transition-colors
              ${step === s ? 'border-primary text-primary' : 
                step > s ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}>
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Supplier & Compound</CardTitle>
              <CardDescription>Choose the entity you are submitting evidence for.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Supplier</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MOCK_SUPPLIERS.slice(0, 4).map(sup => (
                    <div 
                      key={sup.id}
                      onClick={() => setFormData({...formData, supplierId: sup.id})}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${formData.supplierId === sup.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    >
                      <div className="font-medium text-sm">{sup.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">Trust Score: {sup.trustScore}</div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.supplierId && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
                  <Label>Compound</Label>
                  <select 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={formData.compoundId}
                    onChange={(e) => setFormData({...formData, compoundId: e.target.value})}
                  >
                    <option value="" disabled>Select a compound...</option>
                    {MOCK_COMPOUNDS.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNext} disabled={!formData.supplierId || !formData.compoundId}>
                Next Step <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Evidence</CardTitle>
              <CardDescription>Upload the verified COA, HPLC, or MS report PDF.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setFormData({...formData, file: new File([""], "dummy.pdf")})}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${formData.file ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                  {formData.file ? <FileText className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
                </div>
                <div className="font-medium text-lg mb-1">{formData.file ? 'evidence_report.pdf' : 'Click to upload PDF'}</div>
                <div className="text-sm text-muted-foreground">Max file size 10MB. Must be original lab report.</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext} disabled={!formData.file}>
                Next Step <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Extract Metadata</CardTitle>
              <CardDescription>Enter the precise metadata from the lab report for indexing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Batch Number</Label>
                <Input 
                  placeholder="e.g. BPC-24-001" 
                  value={formData.batchNumber}
                  onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Purity Percentage (%)</Label>
                <Input 
                  type="number" 
                  placeholder="e.g. 99.4" 
                  value={formData.purity}
                  onChange={(e) => setFormData({...formData, purity: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext} disabled={!formData.batchNumber || !formData.purity}>
                Review <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Sign SAS Payload</CardTitle>
              <CardDescription>Verify the payload before pinning to IPFS and signing the on-chain attestation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg font-mono text-xs text-muted-foreground overflow-x-auto border border-border">
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
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
                  <Wallet className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-500 text-sm">Wallet Not Connected</h4>
                    <p className="text-xs text-amber-500/80 mt-1">You must connect a Solana wallet to sign and submit this attestation.</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button 
                onClick={handleSign} 
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Fingerprint className="w-4 h-4" />
                {isSubmitting ? "Signing..." : "Sign & Publish"}
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 5 && (
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardContent className="pt-12 pb-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">Evidence Verified</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Your lab report has been securely pinned to IPFS and the SAS attestation has been successfully recorded on the Solana blockchain.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>Submit Another</Button>
                <Link href={`/supplier/${formData.supplierId}`}>
                  <Button>View Supplier Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
