"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Database, 
  ShieldCheck, 
  Landmark, 
  Trophy,
  User,
  FlaskConical
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Directory", href: "/directory", icon: Database },
  { name: "Submit Evidence", href: "/submit", icon: ShieldCheck },
  { name: "Governance", href: "/governance", icon: Landmark },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Profile", href: "/profile/me", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-sidebar h-[calc(100vh-4rem)] sticky top-16 hidden md:block z-40">
      <div className="flex flex-col h-full py-6 px-3">
        <nav className="flex-1 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-all duration-200 group
                  ${isActive 
                    ? 'bg-primary/5 text-primary border-l-2 border-primary' 
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground border-l-2 border-transparent'
                  }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground/70 group-hover:text-foreground'}`} />
                <span className="font-medium text-sm tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto border-t border-border/50 pt-4 px-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground/50 font-mono">
            <div className="w-2 h-2 rounded-full bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]"></div>
            Mainnet Beta Active
          </div>
        </div>
      </div>
    </aside>
  );
}
