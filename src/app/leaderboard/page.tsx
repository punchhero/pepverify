"use client";

import { MOCK_SUPPLIERS } from "@/lib/data";
import { Trophy, ShieldCheck, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function LeaderboardPage() {
  const sortedSuppliers = [...MOCK_SUPPLIERS].sort((a, b) => b.trustScore - a.trustScore);

  // Mock trend data
  const getTrend = (index: number) => {
    if (index === 0) return { type: "up", value: "+2", icon: ArrowUpRight, color: "text-emerald-500" };
    if (index === 1) return { type: "up", value: "+1", icon: ArrowUpRight, color: "text-emerald-500" };
    if (index === 2) return { type: "neutral", value: "-", icon: Minus, color: "text-muted-foreground" };
    if (index === 3) return { type: "down", value: "-1", icon: ArrowDownRight, color: "text-destructive" };
    return { type: "neutral", value: "-", icon: Minus, color: "text-muted-foreground" };
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-6 py-8 border-b border-border bg-card">
        <div className="max-w-4xl mx-auto w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Transparency Leaderboard</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ranking the peptide research ecosystem by verifiable on-chain evidence, trust scores, and community governance.
          </p>
        </div>
      </div>

      <div className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sortedSuppliers.slice(0, 3).map((supplier, index) => (
            <Card key={supplier.id} className={`relative overflow-hidden ${index === 0 ? 'border-primary/50 shadow-lg shadow-primary/5' : ''}`}>
              {index === 0 && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="text-4xl font-bold text-muted/30 absolute top-4 right-4 -z-10 select-none">
                  #{index + 1}
                </div>
                <CardTitle className="text-xl flex flex-col items-center gap-2">
                  {supplier.name}
                  {supplier.verified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                </CardTitle>
                <CardDescription>Top Tier Supplier</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="text-3xl font-bold text-primary">{supplier.trustScore}</div>
                  <div className="text-sm text-muted-foreground ml-1 mt-auto pb-1">/ 100</div>
                </div>
                <div className="flex justify-center gap-4 text-sm border-t border-border pt-4">
                  <div>
                    <span className="font-semibold block">{supplier.attestationCount}</span>
                    <span className="text-muted-foreground text-xs">Attestations</span>
                  </div>
                  <div>
                    <span className="font-semibold block">{supplier.compoundsSupported.length}</span>
                    <span className="text-muted-foreground text-xs">Compounds</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Global Rankings</CardTitle>
            <CardDescription>All indexed suppliers ordered by algorithmic trust score</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border-t border-border">
              <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground border-b border-border p-4 bg-muted/20">
                <div className="col-span-1 text-center">Rank</div>
                <div className="col-span-4">Supplier Name</div>
                <div className="col-span-2 text-center">Trust Score</div>
                <div className="col-span-2 text-center">Attestations</div>
                <div className="col-span-2 text-center">Trend</div>
                <div className="col-span-1"></div>
              </div>
              <div className="divide-y divide-border">
                {sortedSuppliers.map((supplier, index) => {
                  const trend = getTrend(index);
                  const TrendIcon = trend.icon;
                  return (
                    <div key={supplier.id} className="grid grid-cols-12 text-sm p-4 items-center hover:bg-muted/10 transition-colors">
                      <div className="col-span-1 text-center font-bold text-muted-foreground">
                        {index + 1}
                      </div>
                      <div className="col-span-4 font-semibold flex items-center gap-2">
                        {supplier.name}
                        {supplier.verified && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <Badge variant="outline" className={`
                          ${supplier.trustScore >= 90 ? 'bg-primary/10 text-primary border-primary/20' : 
                            supplier.trustScore >= 80 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                            'bg-destructive/10 text-destructive border-destructive/20'}
                        `}>
                          {supplier.trustScore}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-center font-mono text-muted-foreground">
                        {supplier.attestationCount}
                      </div>
                      <div className={`col-span-2 flex items-center justify-center gap-1 ${trend.color}`}>
                        <TrendIcon className="w-3 h-3" />
                        <span className="text-xs">{trend.value}</span>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Link href={`/supplier/${supplier.id}`} className="text-primary hover:underline text-xs">
                          Profile
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
