"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Landmark, AlertTriangle, Users, Wallet, ShieldQuestion } from "lucide-react";

export default function GovernancePage() {
  const activeProposals = [
    {
      id: "PIP-42",
      title: "Verify Core Peptides as Tier 1 Supplier",
      description: "Core Peptides has met the 50 verified attestations threshold. Propose elevating to Tier 1 trusted status.",
      type: "Verification",
      status: "Active",
      timeRemaining: "2 days",
      forVotes: 142000,
      againstVotes: 12000,
      quorum: 75,
    },
    {
      id: "PIP-43",
      title: "Update Purity Standards for GLP-1 Analogues",
      description: "Require LC-MS testing in addition to HPLC for all GLP-1 analogue attestations moving forward.",
      type: "Standard",
      status: "Active",
      timeRemaining: "5 days",
      forVotes: 85000,
      againstVotes: 42000,
      quorum: 45,
    }
  ];

  const disputes = [
    {
      id: "DIS-09",
      target: "Science.bio - Batch SEM-23",
      reason: "Conflicting 3rd party testing results submitted by user",
      status: "Under Review",
      reporterStake: "5,000 PEP",
      date: "2024-05-02"
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-8 border-b border-border bg-card">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-2">
            <Landmark className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Governance Hub</h1>
          </div>
          <p className="text-muted-foreground mb-8">Participate in platform governance, vote on supplier verifications, and resolve evidence disputes.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-background">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  Treasury Balance
                  <Wallet className="w-4 h-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,420,500 PEP</div>
                <p className="text-xs text-muted-foreground mt-1">~$214,000 USD equivalent</p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  Active Voters
                  <Users className="w-4 h-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground mt-1">Unique wallets in last 30 days</p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  Open Disputes
                  <AlertTriangle className="w-4 h-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">1</div>
                <p className="text-xs text-muted-foreground mt-1">Requires committee review</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        <Tabs defaultValue="proposals" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="proposals">Active Proposals</TabsTrigger>
            <TabsTrigger value="disputes">Dispute Resolution</TabsTrigger>
            <TabsTrigger value="history">Voting History</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            {activeProposals.map(proposal => {
              const totalVotes = proposal.forVotes + proposal.againstVotes;
              const forPercent = Math.round((proposal.forVotes / totalVotes) * 100) || 0;
              
              return (
                <Card key={proposal.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/20">{proposal.id}</Badge>
                        <Badge variant="secondary">{proposal.type}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Ends in {proposal.timeRemaining}</div>
                    </div>
                    <CardTitle className="text-xl">{proposal.title}</CardTitle>
                    <CardDescription className="text-base">{proposal.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">For ({forPercent}%)</span>
                          <span className="text-muted-foreground">{proposal.forVotes.toLocaleString()} PEP</span>
                        </div>
                        <Progress value={forPercent} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Against ({100 - forPercent}%)</span>
                          <span className="text-muted-foreground">{proposal.againstVotes.toLocaleString()} PEP</span>
                        </div>
                        <Progress value={100 - forPercent} className="h-2 bg-muted" />
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                          Current Quorum: <span className={proposal.quorum >= 50 ? "text-emerald-500 font-medium" : ""}>{proposal.quorum}%</span> / 50% required
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="text-destructive hover:bg-destructive/10">Vote Against</Button>
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Vote For</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="disputes" className="space-y-6">
            {disputes.map(dispute => (
              <Card key={dispute.id} className="border-amber-500/20">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="font-mono bg-amber-500/10 text-amber-500 border-amber-500/20">{dispute.id}</Badge>
                    <Badge variant="outline">{dispute.status}</Badge>
                  </div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShieldQuestion className="w-5 h-5 text-amber-500" />
                    {dispute.target}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm font-medium mb-1">Dispute Reason:</p>
                      <p className="text-sm text-muted-foreground">{dispute.reason}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground block">Reporter Stake</span>
                        <span className="font-medium">{dispute.reporterStake}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Date Filed</span>
                        <span className="font-medium">{dispute.date}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t border-border mt-4">
                      <Button variant="outline">View Evidence</Button>
                      <Button variant="default">Join Committee</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history">
            <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
              Connect your wallet to view your voting history.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
