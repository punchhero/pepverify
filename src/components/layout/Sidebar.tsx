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
    <aside className="w-64 flex-shrink-0 border-r border-border bg-sidebar h-[calc(100vh-4rem)] sticky top-16 hidden md:block">
      <div className="flex flex-col h-full py-6 px-4">
        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center gap-3 px-3">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Platform Status</p>
              <p className="text-[10px] text-muted-foreground">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
