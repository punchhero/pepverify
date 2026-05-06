"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { MOCK_ATTESTATIONS, MOCK_REPORTS, MOCK_SUPPLIERS } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Fingerprint, Activity, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  const { connected, publicKey } = useWallet();
  const addressString = publicKey ? publicKey.toBase58() : "8Xb...3Fz"; // Mock if disconnected for demo
  const isMocked = !connected;

  // Find attestations by this wallet
  const userAttestations = MOCK_ATTESTATIONS.filter(a => a.signerWallet === (isMocked ? "8Xb...3Fz" : addressString));

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="px-6 py-12 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
                <Fingerprint className="w-10 h-10 text-primary" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2 font-mono">{addressString.slice(0, 4)}...{addressString.slice(-4)}</h1>
                <div className="flex items-center gap-3">
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 rounded-sm">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Level 4 Researcher
                  </Badge>
                  <span className="text-sm text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded border border-border/50">
                    Trust Score: 98
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center p-4 bg-background border border-border rounded-lg shadow-sm">
                <div className="text-2xl font-bold font-mono text-primary">{userAttestations.length}</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Attestations</div>
              </div>
              <div className="text-center p-4 bg-background border border-border rounded-lg shadow-sm">
                <div className="text-2xl font-bold font-mono text-emerald-500">100%</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> 
            Recent Evidence Submissions
          </h2>
          <Link href="/submit">
            <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-sm">
              <FileText className="w-4 h-4 mr-2" /> Upload Evidence
            </Button>
          </Link>
        </div>

        {userAttestations.length > 0 ? (
          <div className="rounded-md border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
            <div className="grid grid-cols-12 text-xs font-semibold text-muted-foreground border-b border-border p-4 bg-muted/20 uppercase tracking-wider">
              <div className="col-span-3">SAS Hash</div>
              <div className="col-span-3">Supplier</div>
              <div className="col-span-2 text-center">Compound</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Timestamp</div>
            </div>
            <div className="divide-y divide-border">
              {userAttestations.map((attestation) => {
                const report = MOCK_REPORTS.find(r => r.id === attestation.reportId);
                const supplier = MOCK_SUPPLIERS.find(s => s.id === report?.supplierId);
                
                return (
                  <div key={attestation.id} className="grid grid-cols-12 text-sm p-4 items-center hover:bg-muted/10 transition-colors">
                    <div className="col-span-3 font-mono text-primary truncate pr-4 text-xs">
                      {attestation.sasAttestationId}
                    </div>
                    <div className="col-span-3 font-medium text-foreground">
                      {supplier?.name}
                    </div>
                    <div className="col-span-2 text-center text-muted-foreground">
                      <Badge variant="outline" className="font-mono text-[10px] rounded-sm">
                        {report?.batchNumber.split("-")[0] || "Unknown"}
                      </Badge>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20 text-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </div>
                    </div>
                    <div className="col-span-2 text-right font-mono text-xs text-muted-foreground">
                      {new Date(attestation.timestamp).toISOString().split('T')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <Card className="bg-background/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <FileText className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium">No attestations found</p>
              <p className="text-sm text-muted-foreground max-w-md mt-2 mb-6">
                You haven't uploaded or verified any scientific reports yet. Contribute to the ecosystem by uploading your independent lab testing results.
              </p>
              <Link href="/submit">
                <Button>Submit First Report</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
