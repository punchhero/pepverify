"use client";

import { use } from "react";
import { MOCK_SUPPLIERS, MOCK_REPORTS, MOCK_ATTESTATIONS, MOCK_COMPOUNDS } from "@/lib/data";
import { ShieldCheck, ShieldAlert, FileText, CheckCircle2, Globe, Hash, TrendingUp, Beaker, Terminal } from "lucide-react";
import { notFound } from "next/navigation";
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
    <div className="flex flex-col h-full bg-[#080808] bg-grid-fine text-[#F0F0F0] overflow-y-auto min-h-full relative">
      <div className="scanline"></div>
      {/* Institutional Hero Section - Compact Etherscan Style */}
      <div className="px-8 py-8 border-b border-[#333] bg-[#080808]/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#5E6AD2]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded border border-[#333] bg-[#141414] flex items-center justify-center text-[16px] font-bold font-mono text-[#888]">
                  {supplier.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-[22px] font-mono font-semibold tracking-[-0.02em] text-white flex items-center gap-2">
                    {supplier.name}
                    {supplier.verified && (
                      <ShieldCheck className="w-4 h-4 text-[#2EA043]" />
                    )}
                  </h1>
                  <div className="flex items-center gap-2 text-[10px] text-[#666] font-mono mt-1 uppercase tracking-widest">
                    <span>ENTITY_ID: {supplier.id}</span>
                    <span>//</span>
                    <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#5E6AD2] transition-colors flex items-center border border-[#333] px-1.5 py-0.5 rounded">
                      <Globe className="w-3 h-3 mr-1" /> {supplier.website.replace("https://", "")}
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-[14px] max-w-3xl leading-relaxed text-[#888] mt-4">{supplier.description}</p>
            </div>
            
            {/* Minimal Metric Block */}
            <div className="flex gap-3 min-w-[300px]">
              <div className="flex-1 rounded border border-[#333] bg-[#0C0C0C] p-4 card-crosshair">
                <p className="text-[10px] font-mono font-medium uppercase tracking-widest text-[#666] mb-1">Trust_Metric</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-[28px] font-semibold font-mono tracking-[-0.03em]
                    ${supplier.trustScore >= 90 ? 'text-[#5E6AD2]' : 
                      supplier.trustScore >= 80 ? 'text-[#2EA043]' : 
                      'text-[#E3B341]'}`}>
                    {supplier.trustScore}
                  </span>
                  <span className="text-[10px] text-[#666] font-mono">/100</span>
                </div>
              </div>
              
              <div className="flex-1 rounded border border-[#333] bg-[#0C0C0C] p-4 card-crosshair">
                <p className="text-[10px] font-mono font-medium uppercase tracking-widest text-[#666] mb-1">Total_Evidence</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[28px] font-semibold font-mono tracking-[-0.03em] text-white">
                    {supplier.attestationCount}
                  </span>
                  <span className="text-[10px] text-[#666] font-mono">RECORDS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-8 py-8 max-w-6xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-6 border-b border-[#333] mb-8 pb-3">
          <button className="text-[12px] font-mono font-medium text-[#5E6AD2] border-b-2 border-[#5E6AD2] pb-3 -mb-[14px]">[OVERVIEW]</button>
          <button className="text-[12px] font-mono font-medium text-[#666] hover:text-[#ccc] transition-colors pb-3 -mb-[14px]">SCIENTIFIC_EVIDENCE</button>
          <button className="text-[12px] font-mono font-medium text-[#666] hover:text-[#ccc] transition-colors pb-3 -mb-[14px]">PROVENANCE_LOG</button>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Charts */}
            <div className="md:col-span-2 space-y-6">
              <div className="border border-[#333] bg-[#0C0C0C] rounded overflow-hidden card-crosshair">
                <div className="px-6 py-5 border-b border-[#333] bg-[#141414]/50 flex items-center justify-between">
                  <div>
                    <h3 className="text-[14px] font-mono font-semibold text-white tracking-[-0.01em]">PURITY_TREND_ANALYSIS</h3>
                    <p className="text-[11px] font-mono text-[#666] mt-1">// Aggregated historical LC-MS & HPLC validation data</p>
                  </div>
                  <TrendingUp className="w-4 h-4 text-[#666]" />
                </div>
                <div className="p-6">
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          stroke="#666" 
                          fontSize={11} 
                          tickMargin={10}
                          fontFamily="monospace"
                        />
                        <YAxis 
                          domain={['dataMin - 1', 100]} 
                          stroke="#666" 
                          fontSize={11} 
                          tickFormatter={(val) => `${val}%`}
                          fontFamily="monospace"
                          tickMargin={10}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                          itemStyle={{ color: '#5E6AD2' }}
                          labelStyle={{ color: '#888', marginBottom: '4px', fontFamily: 'monospace' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="purity" 
                          stroke="#5E6AD2" 
                          strokeWidth={2}
                          dot={{ r: 4, fill: '#080808', stroke: '#5E6AD2', strokeWidth: 2 }}
                          activeDot={{ r: 6, fill: '#5E6AD2', stroke: '#080808', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Cryptographic Evidence Vault */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[14px] font-mono font-semibold text-white flex items-center gap-2"><Terminal className="w-4 h-4" /> CRYPTOGRAPHIC_EVIDENCE_VAULT</h3>
                  <span className="text-[10px] font-mono text-[#888] bg-[#141414] px-2 py-1 rounded border border-[#333]">{reports.length} RECORDS_INDEXED</span>
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
                        <div className="overflow-hidden border border-[#333] hover:border-[#5E6AD2]/50 transition-colors bg-[#0C0C0C] rounded group flex flex-col md:flex-row card-crosshair">
                          {/* Left: Document Metadata */}
                          <div className="flex-[2] p-5 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded bg-[#141414] border border-[#333] flex items-center justify-center">
                                    <Beaker className="w-4 h-4 text-[#888]" />
                                  </div>
                                  <div>
                                    <h4 className="text-[14px] font-mono font-semibold text-white tracking-[-0.01em]">{compound?.name}</h4>
                                    <p className="text-[10px] text-[#666] font-mono mt-0.5 uppercase">Lot: {report.batchNumber}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-[20px] font-bold font-mono text-white leading-none">{report.purityPercentage}%</div>
                                  <div className="text-[10px] text-[#888] font-mono mt-1 uppercase tracking-widest">Purity</div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#333]">
                                <div>
                                  <p className="text-[10px] font-mono text-[#666] uppercase tracking-widest mb-1">Methodology</p>
                                  <p className="text-[12px] font-mono font-medium text-white">{report.testMethod}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-mono text-[#666] uppercase tracking-widest mb-1">Testing_Facility</p>
                                  <p className="text-[12px] font-mono font-medium text-white">{report.labName}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-mono text-[#666] uppercase tracking-widest mb-1">Analysis_Date</p>
                                  <p className="text-[12px] font-mono text-[#ccc]">{new Date(report.reportDate).toISOString().split('T')[0]}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right: Blockchain Provenance */}
                          <div className="flex-1 bg-[#141414]/20 border-t md:border-t-0 md:border-l border-[#333] p-5 flex flex-col justify-between relative">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#5E6AD2]/30 to-transparent"></div>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] text-[#666] uppercase tracking-widest">Network Status</span>
                                {attestation?.status === "verified" ? (
                                  <span className="bg-[#2EA043]/10 text-[#2EA043] border border-[#2EA043]/20 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
                                    VERIFIED
                                  </span>
                                ) : (
                                  <span className="bg-[#E3B341]/10 text-[#E3B341] border border-[#E3B341]/20 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
                                    PENDING
                                  </span>
                                )}
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <span className="text-[10px] font-mono text-[#666] uppercase tracking-widest block mb-1">IPFS_Storage_Hash_(CID)</span>
                                  <div className="flex items-center gap-1.5 font-mono text-[10px] bg-[#080808] border border-[#333] p-2 rounded truncate text-[#888]">
                                    <Hash className="w-3 h-3 text-[#666] shrink-0" />
                                    <span className="truncate" title={report.ipfsCid}>{report.ipfsCid}</span>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[10px] font-mono text-[#666] uppercase tracking-widest block mb-1">SAS_Transaction_Hash</span>
                                  <div className="font-mono text-[10px] bg-[#080808] border border-[#333] p-2 rounded truncate text-[#5E6AD2]">
                                    {attestation?.sasAttestationId}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <button className="w-full text-[11px] font-mono h-8 mt-5 font-medium rounded border border-[#333] text-[#888] bg-[#0C0C0C] hover:text-white hover:border-[#5E6AD2]/50 transition-colors flex items-center justify-center">
                              <FileText className="w-3.5 h-3.5 mr-2" /> [VIEW_ORIGINAL_REPORT]
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }) : (
                    <div className="text-center py-16 border border-white/[0.06] bg-[#0C0C0C] rounded-xl text-[#666] flex flex-col items-center">
                      <ShieldAlert className="w-8 h-8 mb-3 opacity-50" />
                      <p className="text-[14px] font-medium text-white mb-1">No scientific evidence indexed</p>
                      <p className="text-[13px]">This entity has not anchored any reports to the blockchain.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Metadata */}
            <div className="space-y-6">
              <div className="border border-[#333] bg-[#0C0C0C] rounded overflow-hidden card-crosshair">
                <div className="px-5 py-4 border-b border-[#333] bg-[#141414]/50">
                  <h3 className="text-[14px] font-mono font-semibold text-white tracking-[-0.01em]">COMPOUNDS_SUPPORTED</h3>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {supplier.compoundsSupported.map(c => (
                      <span key={c} className="px-2 py-1 bg-[#141414] border border-[#333] rounded text-[10px] font-mono font-medium text-[#ccc]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border border-[#333] bg-[#0C0C0C] rounded overflow-hidden card-crosshair">
                <div className="px-5 py-4 border-b border-[#333] bg-[#141414]/50">
                  <h3 className="text-[14px] font-mono font-semibold text-white tracking-[-0.01em]">VERIFICATION_RUBRIC</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-[#888]">On-Chain Evidence</span>
                    <span className="text-[#2EA043]">+40 pts</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-[#888]">Consistent Purity (&gt;98%)</span>
                    <span className="text-[#2EA043]">+35 pts</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-[#888]">Community Governance</span>
                    <span className="text-[#5E6AD2]">+20 pts</span>
                  </div>
                  <div className="pt-4 border-t border-[#333] flex justify-between items-center">
                    <span className="text-[11px] font-mono font-semibold text-white uppercase tracking-widest">Total_Trust_Index</span>
                    <span className="font-mono font-bold text-white text-[14px]">{supplier.trustScore}/100</span>
                  </div>
                </div>
              </div>

              <div className="border border-[#333] bg-[#0C0C0C] rounded overflow-hidden card-crosshair relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2EA043]/20 to-transparent"></div>
                <div className="px-5 py-4 border-b border-[#333] bg-[#141414]/50">
                  <h3 className="text-[14px] font-mono font-semibold text-white tracking-[-0.01em]">IMMUTABLE_PROVENANCE_LOG</h3>
                  <p className="text-[10px] font-mono text-[#666] mt-1 uppercase">// Cryptographic timeline of network activity.</p>
                </div>
                <div className="p-5">
                  <div className="space-y-0 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-[1px] before:bg-[#333]">
                    {MOCK_ATTESTATIONS.filter(a => reports.some(r => r.id === a.reportId)).slice(0,3).map((attestation, i) => (
                      <div key={attestation.id} className="relative flex items-start gap-4 pb-6 last:pb-0 group">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#080808] border border-[#2EA043]/50 text-[#2EA043] z-10 shrink-0 group-hover:border-[#2EA043] transition-colors shadow-[0_0_10px_rgba(46,160,67,0.1)]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex flex-col mb-1.5">
                            <h4 className="font-mono font-semibold text-[11px] text-white">EVIDENCE_ANCHORED</h4>
                            <span className="text-[10px] font-mono text-[#666]">{new Date(attestation.timestamp).toISOString().replace('T', ' ').substring(0, 19)}</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono bg-[#141414] px-1.5 py-0.5 rounded border border-[#333] text-[#888]">
                            <span>TX:</span>
                            <span className="text-[#ccc] truncate max-w-[120px]">{attestation.sasAttestationId}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
