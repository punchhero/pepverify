"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Database, ShieldCheck, Landmark, Trophy, User } from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Directory", href: "/directory", icon: Database },
  { name: "Submit Evidence", href: "/submit", icon: ShieldCheck },
  { name: "Governance", href: "/governance", icon: Landmark },
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
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors duration-150 group
                  ${isActive
                    ? "bg-white/[0.06] text-white font-medium"
                    : "text-[#666] hover:bg-white/[0.04] hover:text-[#ccc]"
                  }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#5E6AD2]" : "text-[#444] group-hover:text-[#888]"}`} />
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
