"use client";

import { use } from "react";
import { MOCK_SUPPLIERS, MOCK_REPORTS, MOCK_ATTESTATIONS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, ShieldAlert, FileText, CheckCircle2, Globe, ExternalLink, Hash } from "lucide-react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const supplierId = resolvedParams.id;
  
  const supplier = MOCK_SUPPLIERS.find(s => s.id === supplierId);
  
  if (!supplier) {
    notFound();
  }

  const reports = MOCK_REPORTS.filter(r => r.supplierId === supplierId);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-6 py-8 border-b border-border bg-card">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 max-w-6xl mx-auto w-full">
          <div className="flex gap-6">
            <div className="hidden md:flex w-20 h-20 rounded-xl bg-muted items-center justify-center border border-border">
              <span className="text-3xl font-bold text-muted-foreground">{supplier.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{supplier.name}</h1>
                {supplier.verified && (
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
                  <Globe className="w-3 h-3 mr-1" /> {supplier.website.replace("https://", "")}
                </a>
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-border mr-1.5"></span>
                  {supplier.shipsTo.join(", ")}
                </span>
              </div>
              <p className="text-sm max-w-2xl leading-relaxed">{supplier.description}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 min-w-[200px]">
            <div className="rounded-lg border border-border bg-background p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Trust Score</p>
                <p className="text-2xl font-bold tracking-tight">{supplier.trustScore}</p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2
                ${supplier.trustScore >= 90 ? 'bg-primary/10 text-primary border-primary/20' : 
                  supplier.trustScore >= 80 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                  'bg-destructive/10 text-destructive border-destructive/20'}`}>
                {supplier.trustScore}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        <Tabs defaultValue="evidence" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="evidence">Evidence Vault</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Supported Compounds</CardTitle>
                <CardDescription>Peptides and compounds supplied by {supplier.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {supplier.compoundsSupported.map(c => (
                    <Badge key={c} variant="secondary" className="px-3 py-1.5 text-sm font-medium">
                      {c}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="evidence">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Verified Lab Reports</h3>
                <span className="text-sm text-muted-foreground">{reports.length} reports indexed</span>
              </div>
              
              {reports.length > 0 ? reports.map(report => {
                const compound = MOCK_COMPOUNDS.find(c => c.id === report.compoundId);
                const attestation = MOCK_ATTESTATIONS.find(a => a.reportId === report.id);
                
                return (
                  <Card key={report.id} className="overflow-hidden border-border/50 hover:border-border transition-colors">
                    <div className="flex flex-col md:flex-row">
                      {/* Left: Metadata */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xl font-bold tracking-tight text-primary">{compound?.name}</h4>
                            <Badge variant="outline" className="font-mono text-xs text-muted-foreground">
                              {report.batchNumber}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Purity</p>
                              <p className="font-semibold text-lg">{report.purityPercentage}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Testing Method</p>
                              <p className="font-medium">{report.testMethod}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Testing Lab</p>
                              <p className="font-medium">{report.labName}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Report Date</p>
                              <p className="font-medium">{new Date(report.reportDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                            <Hash className="w-3 h-3" /> 
                            <span className="truncate max-w-[120px] md:max-w-[200px]" title={report.ipfsCid}>
                              ipfs://{report.ipfsCid}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 gap-2">
                            <FileText className="w-3 h-3" /> View PDF
                          </Button>
                        </div>
                      </div>
                      
                      {/* Right: Attestation State */}
                      <div className="md:w-72 bg-muted/20 border-l border-border p-6 flex flex-col justify-center">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            {attestation?.status === "verified" ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <ShieldAlert className="w-5 h-5 text-amber-500" />
                            )}
                            <span className="font-semibold text-sm">
                              {attestation?.status === "verified" ? "SAS Verified" : "Pending Verification"}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs">
                              <span className="text-muted-foreground block mb-1">Attestation ID</span>
                              <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded break-all">
                                {attestation?.sasAttestationId}
                              </span>
                            </div>
                            <div className="text-xs">
                              <span className="text-muted-foreground block mb-1">Signer Wallet</span>
                              <span className="font-mono text-foreground">{attestation?.signerWallet}</span>
                            </div>
                            <div className="text-xs">
                              <span className="text-muted-foreground block mb-1">Timestamp</span>
                              <span>{new Date(attestation?.timestamp || "").toLocaleString()}</span>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full text-xs h-8 mt-2" size="sm">
                            <ExternalLink className="w-3 h-3 mr-2" /> View on Explorer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              }) : (
                <div className="text-center py-12 border border-dashed border-border rounded-lg text-muted-foreground">
                  No verifiable evidence has been uploaded for this supplier yet.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Provenance History</CardTitle>
                <CardDescription>Immutable record of all attestations and metadata changes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  {MOCK_ATTESTATIONS.filter(a => reports.some(r => r.id === a.reportId)).map((attestation, i) => (
                    <div key={attestation.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/20 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-border bg-card shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm text-emerald-500">Evidence Verified</h4>
                          <span className="text-xs text-muted-foreground">{new Date(attestation.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">SAS Attestation created on-chain</p>
                        <div className="text-[10px] font-mono bg-muted/50 p-2 rounded border border-border/50 break-all text-muted-foreground">
                          {attestation.sasAttestationId}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
