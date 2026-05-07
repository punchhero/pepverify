"use client";

import { use } from "react";
import { MOCK_SUPPLIERS, MOCK_REPORTS, MOCK_ATTESTATIONS, MOCK_COMPOUNDS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, ShieldAlert, FileText, CheckCircle2, Globe, ExternalLink, Hash, TrendingUp, Info, Beaker } from "lucide-react";
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
      {/* Institutional Hero Section - Compact Etherscan Style */}
      <div className="px-6 py-6 border-b border-border/50 bg-card">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded border border-border bg-background flex items-center justify-center text-lg font-bold text-muted-foreground">
                  {supplier.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                    {supplier.name}
                    {supplier.verified && (
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    )}
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-1">
                    <span>Entity ID: {supplier.id}</span>
                    <span>•</span>
                    <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center">
                      <Globe className="w-3 h-3 mr-1" /> {supplier.website.replace("https://", "")}
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-sm max-w-3xl leading-relaxed text-muted-foreground mt-4">{supplier.description}</p>
            </div>
            
            {/* Minimal Metric Block */}
            <div className="flex gap-4 min-w-[300px]">
              <div className="flex-1 rounded-md border border-border/60 bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Trust Score</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold font-mono tracking-tight
                    ${supplier.trustScore >= 90 ? 'text-primary' : 
                      supplier.trustScore >= 80 ? 'text-emerald-500' : 
                      'text-destructive'}`}>
                    {supplier.trustScore}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">/100</span>
                </div>
              </div>
              
              <div className="flex-1 rounded-md border border-border/60 bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Total Evidence</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono tracking-tight text-foreground">
                    {supplier.attestationCount}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">Scans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 max-w-[400px] bg-muted/50 border border-border/50">
            <TabsTrigger value="overview" className="text-sm font-medium rounded-sm">Overview</TabsTrigger>
            <TabsTrigger value="evidence" className="text-sm font-medium rounded-sm">Scientific Evidence</TabsTrigger>
            <TabsTrigger value="audit" className="text-sm font-medium rounded-sm">Provenance Log</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Charts */}
              <div className="md:col-span-2 space-y-6">
                <Card className="border-border/60 shadow-sm bg-card rounded-md">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-semibold">Purity Trend Analysis</CardTitle>
                        <CardDescription className="text-xs mt-1">Aggregated historical LC-MS & HPLC validation data</CardDescription>
                      </div>
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 pl-0">
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            stroke="#64748B" 
                            fontSize={11} 
                            tickMargin={10}
                            fontFamily="monospace"
                          />
                          <YAxis 
                            domain={['dataMin - 1', 100]} 
                            stroke="#64748B" 
                            fontSize={11} 
                            tickFormatter={(val) => `${val}%`}
                            fontFamily="monospace"
                            tickMargin={10}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '6px', fontSize: '12px' }}
                            itemStyle={{ color: '#14B8A6' }}
                            labelStyle={{ color: '#94A3B8', marginBottom: '4px', fontFamily: 'monospace' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="purity" 
                            stroke="#14B8A6" 
                            strokeWidth={2}
                            dot={{ r: 4, fill: '#0F172A', stroke: '#14B8A6', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#14B8A6', stroke: '#0F172A', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Metadata */}
              <div className="space-y-6">
                <Card className="border-border/60 shadow-sm bg-card rounded-md">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <CardTitle className="text-base font-semibold">Compounds Supported</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-2">
                      {supplier.compoundsSupported.map(c => (
                        <span key={c} className="px-2 py-1 bg-muted/50 border border-border rounded text-xs font-medium text-foreground">
                          {c}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/60 shadow-sm bg-card rounded-md">
                  <CardHeader className="border-b border-border/40 pb-4">
                    <CardTitle className="text-base font-semibold">Verification Rubric</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">On-Chain Evidence</span>
                      <span className="font-mono text-emerald-500 font-medium">+40 pts</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Consistent Purity (&gt;98%)</span>
                      <span className="font-mono text-emerald-500 font-medium">+35 pts</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Community Governance</span>
                      <span className="font-mono text-primary font-medium">+20 pts</span>
                    </div>
                    <div className="pt-3 border-t border-border/40 flex justify-between items-center">
                      <span className="text-sm font-semibold text-foreground">Total Trust Index</span>
                      <span className="font-mono font-bold text-foreground">{supplier.trustScore}/100</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="evidence">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground">Cryptographic Evidence Vault</h3>
                <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded-sm border border-border">{reports.length} Records Indexed</span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {reports.length > 0 ? reports.map((report, index) => {
                  const compound = MOCK_COMPOUNDS.find(c => c.id === report.compoundId);
                  const attestation = MOCK_ATTESTATIONS.find(a => a.reportId === report.id);
                  
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      key={report.id}
                    >
                      <Card className="overflow-hidden border-border/60 hover:border-primary/50 transition-colors bg-card shadow-sm rounded-md group">
                        <div className="flex flex-col md:flex-row">
                          {/* Left: Document Metadata */}
                          <div className="flex-[2] p-5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded bg-muted border border-border flex items-center justify-center">
                                    <Beaker className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-semibold text-foreground">{compound?.name}</h4>
                                    <p className="text-xs text-muted-foreground font-mono">Lot: {report.batchNumber}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold font-mono text-foreground leading-none">{report.purityPercentage}%</div>
                                  <div className="text-xs text-muted-foreground mt-1">Purity</div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/40">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Methodology</p>
                                  <p className="text-sm font-medium">{report.testMethod}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Testing Facility</p>
                                  <p className="text-sm font-medium">{report.labName}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Analysis Date</p>
                                  <p className="text-sm font-mono">{new Date(report.reportDate).toISOString().split('T')[0]}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right: Blockchain Provenance */}
                          <div className="flex-1 bg-muted/20 border-t md:border-t-0 md:border-l border-border/60 p-5 flex flex-col justify-between">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">Network Status</span>
                                {attestation?.status === "verified" ? (
                                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs rounded-sm py-0 h-5 font-semibold">
                                    VERIFIED
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs rounded-sm py-0 h-5 font-semibold">
                                    PENDING
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">IPFS Storage Hash (CID)</span>
                                  <div className="flex items-center gap-1.5 font-mono text-xs bg-background border border-border p-1.5 rounded-sm">
                                    <Hash className="w-3 h-3 text-muted-foreground shrink-0" />
                                    <span className="truncate text-muted-foreground" title={report.ipfsCid}>{report.ipfsCid}</span>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">SAS Transaction Hash</span>
                                  <div className="font-mono text-xs bg-background border border-border p-1.5 rounded-sm truncate text-primary/80">
                                    {attestation?.sasAttestationId}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <Button variant="outline" className="w-full text-xs h-8 mt-4 bg-background hover:bg-muted/50 border-border group-hover:border-primary/50 transition-colors">
                              <FileText className="w-3 h-3 mr-2" /> View Original Report
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                }) : (
                  <div className="text-center py-16 border border-dashed border-border bg-card rounded-md text-muted-foreground flex flex-col items-center">
                    <ShieldAlert className="w-8 h-8 mb-3 opacity-50" />
                    <p className="text-sm font-medium">No scientific evidence indexed</p>
                    <p className="text-xs mt-1">This entity has not anchored any reports to the blockchain.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="audit">
            <Card className="border-border/60 shadow-sm bg-card rounded-md">
              <CardHeader className="border-b border-border/40">
                <CardTitle className="text-base font-semibold">Immutable Provenance Log</CardTitle>
                <CardDescription className="text-sm">Cryptographic timeline of all network activity for this entity.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-[1px] before:bg-border">
                  {MOCK_ATTESTATIONS.filter(a => reports.some(r => r.id === a.reportId)).map((attestation, i) => (
                    <div key={attestation.id} className="relative flex items-start gap-4 pb-8 last:pb-0 group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-primary/20 text-primary z-10 shrink-0 group-hover:border-primary transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm text-foreground">Evidence Anchored to Network</h4>
                          <span className="text-xs font-mono text-muted-foreground">{new Date(attestation.timestamp).toISOString().replace('T', ' ').substring(0, 19)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          A testing report was cryptographically signed by <span className="font-mono text-primary/80">{attestation.signerWallet.substring(0,12)}...</span> and verified via the SAS protocol.
                        </p>
                        <div className="inline-flex items-center gap-2 text-xs font-mono bg-muted/50 px-2 py-1 rounded border border-border text-muted-foreground">
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
