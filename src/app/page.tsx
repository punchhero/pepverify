"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, Users, Database } from "lucide-react";
import { MOCK_SUPPLIERS, MOCK_ATTESTATIONS } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const verifiedSuppliersCount = MOCK_SUPPLIERS.filter(s => s.verified).length;
  const totalAttestations = MOCK_SUPPLIERS.reduce((acc, curr) => acc + curr.attestationCount, 0);

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="px-6 pt-16 pb-8 border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/10">
            <ShieldCheck className="w-3 h-3 mr-1" /> Solana Attestation Service
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            On-chain transparency for <br className="hidden md:block" />
            <span className="text-primary">research peptides.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            PepVerify is a decentralized verification platform providing immutable provenance for COAs, HPLC, and MS lab reports. Built for serious scientific transparency.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/directory" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse Directory
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              href="/submit" 
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border"
            >
              Submit Evidence
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified Suppliers</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedSuppliersCount}</div>
            <p className="text-xs text-muted-foreground mt-1">+2 this week</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Attestations</CardTitle>
            <Database className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAttestations}</div>
            <p className="text-xs text-muted-foreground mt-1">Stored securely on-chain</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recent Scans</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">In the last 24h</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Disputed Reports</CardTitle>
            <ShieldCheck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">0</div>
            <p className="text-xs text-muted-foreground mt-1">All evidence is verified</p>
          </CardContent>
        </Card>
      </div>

      <section className="px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">Featured Suppliers</h2>
          <Link href="/directory" className="text-sm text-primary hover:underline flex items-center">
            View all <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MOCK_SUPPLIERS.slice(0, 3).map((supplier) => (
            <Card key={supplier.id} className="flex flex-col hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      <span className="flex items-center text-emerald-500">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                      </span>
                      • {supplier.attestationCount} Attestations
                    </CardDescription>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20">
                    {supplier.trustScore}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">{supplier.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {supplier.compoundsSupported.slice(0, 3).map(c => (
                    <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                  ))}
                  {supplier.compoundsSupported.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{supplier.compoundsSupported.length - 3}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="px-6">
        <h2 className="text-xl font-bold tracking-tight mb-6">Recent Network Attestations</h2>
        <div className="rounded-md border border-border bg-card">
          <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground border-b border-border p-4">
            <div className="col-span-2">SAS Record ID</div>
            <div>Status</div>
            <div>Signer</div>
            <div className="text-right">Timestamp</div>
          </div>
          {MOCK_ATTESTATIONS.map((att) => (
            <div key={att.id} className="grid grid-cols-5 text-sm p-4 border-b border-border last:border-0 items-center">
              <div className="col-span-2 font-mono text-primary truncate pr-4">
                {att.sasAttestationId}
              </div>
              <div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                  {att.status.toUpperCase()}
                </Badge>
              </div>
              <div className="font-mono text-muted-foreground">{att.signerWallet}</div>
              <div className="text-right text-muted-foreground">
                {new Date(att.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
