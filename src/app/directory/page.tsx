"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_SUPPLIERS } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search, ShieldCheck, Globe, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = MOCK_SUPPLIERS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.compoundsSupported.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => b.trustScore - a.trustScore); // Default sort by trust score

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-8 border-b border-border bg-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Supplier Directory</h1>
            <p className="text-sm text-muted-foreground mt-1">Verified research peptide suppliers indexed by trust score and attestations.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or compound..."
                className="pl-9 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Directory Table */}
        <div className="rounded-md border border-border bg-background overflow-hidden">
          <div className="grid grid-cols-12 text-xs font-semibold text-muted-foreground border-b border-border p-4 bg-muted/30">
            <div className="col-span-4">Supplier</div>
            <div className="col-span-2 text-center">Trust Score</div>
            <div className="col-span-3">Top Compounds</div>
            <div className="col-span-2 text-center">Attestations</div>
            <div className="col-span-1 text-right">Action</div>
          </div>
          <div className="divide-y divide-border">
            {filteredSuppliers.map(supplier => (
              <div key={supplier.id} className="grid grid-cols-12 text-sm p-4 items-center hover:bg-muted/10 transition-colors">
                <div className="col-span-4 flex flex-col gap-1">
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    {supplier.name}
                    {supplier.verified && <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Globe className="h-3 w-3" /> {supplier.shipsTo.join(", ")}
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border 
                    ${supplier.trustScore >= 90 ? 'bg-primary/10 text-primary border-primary/20' : 
                      supplier.trustScore >= 80 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                      'bg-destructive/10 text-destructive border-destructive/20'}`}>
                    {supplier.trustScore}
                  </div>
                </div>

                <div className="col-span-3 flex flex-wrap gap-1.5">
                  {supplier.compoundsSupported.slice(0, 3).map(c => (
                    <Badge key={c} variant="secondary" className="text-[10px] font-normal px-1.5 py-0">
                      {c}
                    </Badge>
                  ))}
                  {supplier.compoundsSupported.length > 3 && (
                    <span className="text-[10px] text-muted-foreground flex items-center px-1">
                      +{supplier.compoundsSupported.length - 3}
                    </span>
                  )}
                </div>

                <div className="col-span-2 flex justify-center">
                  <span className="font-mono text-muted-foreground">{supplier.attestationCount}</span>
                </div>

                <div className="col-span-1 flex justify-end">
                  <Link href={`/supplier/${supplier.id}`}>
                    <Button variant="ghost" size="sm" className="h-8">View</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSuppliers.length === 0 && (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No suppliers found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
