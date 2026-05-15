"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Database, ShieldCheck, Trophy, User } from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Directory", href: "/directory", icon: Database },
  { name: "Submit Evidence", href: "/submit", icon: ShieldCheck },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Profile", href: "/profile/me", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 border-r border-white/[0.06] bg-[#080808] h-[calc(100vh-3.5rem)] sticky top-14 hidden md:flex flex-col z-40">
      <div className="flex flex-col flex-1 py-3 px-2">
        <nav className="flex-1 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-[13px] transition-colors duration-150 group relative
                  ${isActive
                    ? "text-[#EAEAEA] font-medium"
                    : "text-[#A1A1AA] hover:text-[#EAEAEA]"
                  }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-[#2DD4BF] rounded-r-sm shadow-[0_0_8px_rgba(45,212,191,0.8)]" />}
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#2DD4BF]" : "text-[#555] group-hover:text-[#A1A1AA]"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-2">
          <div className="flex items-center gap-2 text-[11px] text-[#333]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2EA043] inline-block" />
            Mainnet sync active
          </div>
        </div>
      </div>
    </aside>
  );
}
