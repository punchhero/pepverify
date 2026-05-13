"use client";

import { useState } from "react";
import { ArrowRight, Dna, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { submitWaitlist } from "@/app/actions/waitlist";
import { toast } from "sonner";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [xAccount, setXAccount] = useState("");
  const [role, setRole] = useState("Researcher");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await submitWaitlist(email, xAccount, role);
      if (result.success) {
        setSubmitted(true);
        toast.success("You've been added to the waitlist!");
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to join waitlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] bg-hex-pattern text-[#F0F0F0] overflow-x-hidden relative flex flex-col">
      <div className="scanline"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-8 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#2DD4BF]/20 border border-[#2DD4BF]/30 flex items-center justify-center">
            <Dna className="w-3 h-3 text-[#2DD4BF]" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">PepTrace</span>
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12 relative z-10">
        <div className="max-w-md w-full relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
             <div className="w-[600px] h-[600px] rounded-full bg-[#2DD4BF]/20 blur-[100px]" />
           </div>
           
           <div className="relative bg-[#0A0A0A] border border-[#222] p-8 rounded-2xl shadow-2xl backdrop-blur-md">
             {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#2EA043]/10 border border-[#2EA043]/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#2EA043]" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-3">You're on the list.</h2>
                  <p className="text-[#A1A1AA] text-sm mb-8">We'll notify you as soon as PepTrace is ready for beta access.</p>
                  <Link href="/" className="text-[13px] text-[#2DD4BF] hover:text-[#2DD4BF]/80 transition-colors">
                    Return to home
                  </Link>
                </div>
             ) : (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-[32px] font-semibold tracking-tight text-white mb-3">Join the Waitlist</h1>
                    <p className="text-[#A1A1AA] text-[14px]">Secure early access to the PepTrace protocol.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-[12px] font-medium text-[#A1A1AA] mb-1.5">Email Address *</label>
                      <input 
                        id="email"
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#111] border border-[#333] rounded-md px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-[#555] transition-colors"
                        placeholder="researcher@university.edu"
                      />
                    </div>
                    <div>
                      <label htmlFor="xAccount" className="block text-[12px] font-medium text-[#A1A1AA] mb-1.5">X (Twitter) Handle</label>
                      <input 
                        id="xAccount"
                        type="text" 
                        value={xAccount}
                        onChange={(e) => setXAccount(e.target.value)}
                        className="w-full bg-[#111] border border-[#333] rounded-md px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-[#555] transition-colors"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-[12px] font-medium text-[#A1A1AA] mb-1.5">What best describes you?</label>
                      <select 
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-[#111] border border-[#333] rounded-md px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-[#555] transition-colors appearance-none"
                      >
                        <option value="Researcher">Researcher</option>
                        <option value="Supplier">Supplier</option>
                        <option value="Lab / Testing Partner">Lab / Testing Partner</option>
                        <option value="Developer">Developer</option>
                        <option value="Community Member">Community Member</option>
                        <option value="Investor / Contributor">Investor / Contributor</option>
                      </select>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-[#EAEAEA] text-[#0A0A0A] font-medium rounded-md py-2.5 text-[14px] hover:bg-white transition-colors mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? "Joining..." : "Join Waitlist"} <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                  <p className="mt-6 text-center text-[12px] text-[#888]">
                    PepTrace is currently onboarding early researchers, suppliers, testing partners, and governance contributors.
                  </p>
                </>
             )}
           </div>
        </div>
      </main>
    </div>
  );
}
