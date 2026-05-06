"use client";

import { use } from "react";
import { MOCK_SUPPLIERS, MOCK_REPORTS, MOCK_ATTESTATIONS, MOCK_COMPOUNDS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, ShieldAlert, FileText, CheckCircle2, Globe, ExternalLink, Hash, TrendingUp, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

export default function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const supplierId = resolvedParams.id;
  
  const supplier = MOCK_SUPPLIERS.find(s => s.id === supplierId);
  
  if (!supplier) {
    notFound();
  }

  const reports = MOCK_REPORTS.filter(r => r.supplierId === supplierId).sort((a, b) => new Date(a.reportDate).getTime() - new Date(b.reportDate).getTime());

  // Generate trend data from reports
  const trendData = reports.map(r => {
    const compound = MOCK_COMPOUNDS.find(c => c.id === r.compoundId);
    return {
      date: new Date(r.reportDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      purity: r.purityPercentage,
      compound: compound?.name || 'Unknown',
      batch: r.batchNumber
    };
  });

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Institutional Hero Section */}
      <div className="px-6 py-10 border-b border-border/50 bg-card">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
            <span>Directory</span>
            <span className="text-border">/</span>
            <span className="text-primary">{supplier.id.substring(0, 8)}...</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">{supplier.name}</h1>
                {supplier.verified && (
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 mr-1" /> SAS Verified Entity
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6 font-mono">
                <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
                  <Globe className="w-3.5 h-3.5 mr-1.5" /> {supplier.website.replace("https://", "")}
                </a>
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-border mr-2"></span>
                  Ships: {supplier.shipsTo.join(", ")}
                </span>
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-border mr-2"></span>
                  Indexed: 2026-01-15
                </span>
              </div>
              <p className="text-sm max-w-3xl leading-relaxed text-muted-foreground/90">{supplier.description}</p>
            </div>
            
            {/* Bloomberg-style Metric Block */}
            <div className="flex gap-4 min-w-[300px]">
              <div className="flex-1 rounded-sm border border-border/50 bg-background/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Network Trust</p>
                  <Info className="w-3 h-3 text-muted-foreground/50" />
                </div>
                <div className="flex items-end gap-2">
                  <span className={`text-4xl font-bold font-mono leading-none tracking-tighter
                    ${supplier.trustScore >= 90 ? 'text-primary' : 
                      supplier.trustScore >= 80 ? 'text-emerald-500' : 
                      'text-destructive'}`}>
                    {supplier.trustScore}
                  </span>
                  <span className="text-xs text-muted-foreground mb-1 font-mono">/100</span>
                </div>
              </div>
              
              <div className="flex-1 rounded-sm border border-border/50 bg-background/50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Total Evidence</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold font-mono leading-none tracking-tighter text-foreground">
                    {supplier.attestationCount}
                  </span>
                  <span className="text-xs text-muted-foreground mb-1 font-mono">Scans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-[400px] h-10 p-1 bg-muted/20 border border-border/50 rounded-sm">
            <TabsTrigger value="overview" className="text-xs font-semibold uppercase tracking-wider rounded-sm data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm">Overview</TabsTrigger>
            <TabsTrigger value="evidence" className="text-xs font-semibold uppercase tracking-wider rounded-sm data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm">Evidence Vault</TabsTrigger>
            <TabsTrigger value="audit" className="text-xs font-semibold uppercase tracking-wider rounded-sm data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm">Audit Log</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Charts */}
              <div className="md:col-span-2 space-y-6">
                <Card className="border-border/50 shadow-none rounded-sm bg-card">
                  <CardHeader className="border-b border-border/20 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Purity Trend Analysis</CardTitle>
                        <CardDescription className="text-xs mt-1 font-mono">Historical LC-MS validation data</CardDescription>
                      </div>
                      <TrendingUp className="w-4 h-4 text-primary/50" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 pl-0">
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            stroke="rgba(255,255,255,0.2)" 
                            fontSize={10} 
                            tickMargin={10}
                            fontFamily="monospace"
                          />
                          <YAxis 
                            domain={['dataMin - 1', 100]} 
                            stroke="rgba(255,255,255,0.2)" 
                            fontSize={10} 
                            tickFormatter={(val) => `${val}%`}
                            fontFamily="monospace"
                            tickMargin={10}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#05080C', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '12px' }}
                            itemStyle={{ color: '#06B6D4' }}
                            labelStyle={{ color: '#94A3B8', marginBottom: '4px', fontFamily: 'monospace' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="purity" 
                            stroke="#06B6D4" 
                            strokeWidth={2}
                            dot={{ r: 4, fill: '#05080C', stroke: '#06B6D4', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#06B6D4', stroke: '#05080C', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Metadata */}
              <div className="space-y-6">
                <Card className="border-border/50 shadow-none rounded-sm bg-card">
                  <CardHeader className="border-b border-border/20 pb-4">
                    <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Indexed Compounds</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-2">
                      {supplier.compoundsSupported.map(c => (
                        <span key={c} className="px-2 py-1 bg-muted/20 border border-border/50 rounded-sm text-xs font-mono text-foreground">
                          {c}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50 shadow-none rounded-sm bg-card">
                  <CardHeader className="border-b border-border/20 pb-4">
                    <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Trust Methodology</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">On-Chain Evidence</span>
                      <span className="font-mono text-emerald-500 font-bold">+40 pts</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Consistent Purity (&gt;98%)</span>
                      <span className="font-mono text-emerald-500 font-bold">+35 pts</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Community Governance</span>
                      <span className="font-mono text-primary font-bold">+20 pts</span>
                    </div>
                    <div className="pt-2 border-t border-border/20 flex justify-between items-center">
                      <span className="text-xs font-bold uppercase">Total Score</span>
                      <span className="font-mono font-bold">{supplier.trustScore}/100</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="evidence">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Cryptographic Evidence Vault</h3>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded-sm border border-primary/20">{reports.length} Records</span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {reports.length > 0 ? reports.map((report, index) => {
                  const compound = MOCK_COMPOUNDS.find(c => c.id === report.compoundId);
                  const attestation = MOCK_ATTESTATIONS.find(a => a.reportId === report.id);
                  
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      key={report.id}
                    >
                      <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors bg-card shadow-none rounded-sm">
                        <div className="flex flex-col md:flex-row">
                          {/* Left: Document Metadata */}
                          <div className="flex-[2] p-5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-sm bg-muted/20 border border-border/50 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-bold tracking-tight text-foreground">{compound?.name}</h4>
                                    <p className="text-xs text-muted-foreground font-mono">Batch: {report.batchNumber}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold font-mono text-primary leading-none">{report.purityPercentage}%</div>
                                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Purity</div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/20">
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Testing Method</p>
                                  <p className="text-xs font-semibold">{report.testMethod}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Independent Lab</p>
                                  <p className="text-xs font-semibold">{report.labName}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Analysis Date</p>
                                  <p className="text-xs font-mono">{new Date(report.reportDate).toISOString().split('T')[0]}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right: Blockchain Provenance */}
                          <div className="flex-1 bg-muted/5 border-t md:border-t-0 md:border-l border-border/50 p-5 flex flex-col justify-between">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Network Status</span>
                                {attestation?.status === "verified" ? (
                                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] rounded-sm py-0 h-5">
                                    VERIFIED
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px] rounded-sm py-0 h-5">
                                    PENDING
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">IPFS Storage CID</span>
                                  <div className="flex items-center gap-1.5 font-mono text-xs bg-background border border-border/50 p-1.5 rounded-sm">
                                    <Hash className="w-3 h-3 text-muted-foreground" />
                                    <span className="truncate text-foreground" title={report.ipfsCid}>{report.ipfsCid}</span>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">SAS Transaction Hash</span>
                                  <div className="font-mono text-xs bg-background border border-border/50 p-1.5 rounded-sm truncate text-primary">
                                    {attestation?.sasAttestationId}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <Button variant="outline" className="w-full text-xs h-8 mt-4 bg-background hover:bg-muted/50 border-border/50 rounded-sm">
                              <ExternalLink className="w-3 h-3 mr-2" /> View Original Document
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                }) : (
                  <div className="text-center py-16 border border-dashed border-border/50 bg-card rounded-sm text-muted-foreground flex flex-col items-center">
                    <ShieldAlert className="w-8 h-8 mb-3 opacity-50" />
                    <p className="text-sm font-semibold">No evidence indexed</p>
                    <p className="text-xs mt-1">This supplier has not recorded any attestations on-chain.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="audit">
            <Card className="border-border/50 shadow-none bg-card rounded-sm">
              <CardHeader className="border-b border-border/20">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Immutable Audit Log</CardTitle>
                <CardDescription className="text-xs">Cryptographic timeline of supplier activity</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-[1px] before:bg-border/50">
                  {MOCK_ATTESTATIONS.filter(a => reports.some(r => r.id === a.reportId)).map((attestation, i) => (
                    <div key={attestation.id} className="relative flex items-start gap-4 pb-8 last:pb-0 group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-primary/30 text-primary z-10 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.1)] group-hover:border-primary transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm text-foreground">Evidence Recorded to Network</h4>
                          <span className="text-xs font-mono text-muted-foreground">{new Date(attestation.timestamp).toISOString().replace('T', ' ').substring(0, 19)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                          A new lab report was cryptographically signed by <span className="font-mono text-primary/80">{attestation.signerWallet.substring(0,12)}...</span> and anchored to the Solana blockchain via the SAS protocol.
                        </p>
                        <div className="inline-flex items-center gap-2 text-[10px] font-mono bg-muted/20 px-2 py-1 rounded border border-border/50 text-muted-foreground">
                          <span>TX:</span>
                          <span className="text-foreground">{attestation.sasAttestationId}</span>
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
