"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  FileText,
  FolderKanban,
  FolderOpen,
  HardHat,
  Home,
  Landmark,
  ListTodo,
  LogOut,
  Map,
  Settings,
  Trees,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { EagleWatermark, TaklaLogo } from "./Logo";
import { sidebarNav } from "@/lib/data";
import { clearStoredUser, getStoredUser, type AuthUser } from "@/lib/auth";

const iconMap: Record<string, React.ReactNode> = {
  "chiefs-office": <Landmark className="h-4 w-4" />,
  "major-projects": <FolderKanban className="h-4 w-4" />,
  lands: <Map className="h-4 w-4" />,
  forestry: <Trees className="h-4 w-4" />,
  housing: <Home className="h-4 w-4" />,
  "capital-projects": <HardHat className="h-4 w-4" />,
  finance: <Wallet className="h-4 w-4" />,
  approvals: <FileText className="h-4 w-4" />,
  files: <FolderOpen className="h-4 w-4" />,
  tasks: <ListTodo className="h-4 w-4" />,
  reports: <FileText className="h-4 w-4" />,
  settings: <Settings className="h-4 w-4" />,
};

function NavItem({
  href,
  label,
  id,
  badge,
  active,
}: {
  href: string;
  label: string;
  id: string;
  badge?: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
        active
          ? "bg-[#1a6b4f] text-white shadow-sm"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className={active ? "text-[#8fd4b0]" : "text-white/60"}>
        {iconMap[id] ?? <FileText className="h-4 w-4" />}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {badge ? (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e03e3e] px-1.5 text-[11px] font-semibold text-white">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="mb-1.5 px-3 text-[10px] font-semibold tracking-[0.12em] text-white/45 uppercase">
        {title}
      </p>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const isActive = (href: string, id: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    if (id === "approvals") return pathname.startsWith("/approvals");
    if (id === "files") return pathname.startsWith("/files");
    if (id === "tasks") return pathname.startsWith("/tasks");
    if (id === "finance") return pathname.startsWith("/finance");
    if (id === "reports") return pathname.startsWith("/reports");
    if (id === "settings") return pathname.startsWith("/settings");
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLogout = () => {
    clearStoredUser();
    router.push("/login");
  };

  const displayName = user?.name ?? "Chief French";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="relative flex w-[240px] shrink-0 flex-col overflow-hidden bg-[#0a3d2e] text-white">
      <div className="flex items-center gap-3 px-4 py-5">
        <TaklaLogo className="h-11 w-11 shrink-0" />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold leading-tight">Takla Nation</p>
          <p className="truncate text-[11px] text-white/55">Chief&apos;s Office Portal</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2.5 pb-4">
        <NavGroup title="Departments">
          {sidebarNav.departments.map((item) => (
            <NavItem
              key={item.id}
              {...item}
              active={isActive(item.href, item.id)}
            />
          ))}
        </NavGroup>
        <NavGroup title="Operations">
          {sidebarNav.operations.map((item) => (
            <NavItem
              key={item.id}
              {...item}
              active={isActive(item.href, item.id)}
            />
          ))}
        </NavGroup>
        <NavGroup title="Office">
          {sidebarNav.office.map((item) => (
            <NavItem
              key={item.id}
              {...item}
              active={isActive(item.href, item.id)}
            />
          ))}
        </NavGroup>
      </nav>

      <EagleWatermark className="pointer-events-none absolute -bottom-4 -left-6 h-44 w-44 text-white/[0.07]" />

      <div className="relative z-10 border-t border-white/10 p-3">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left hover:bg-white/10"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a6b4f] text-xs font-semibold">
            {initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-medium">{displayName}</span>
            <span className="block truncate text-[11px] text-white/50">
              {user?.role ?? "Chief's Office"}
            </span>
          </span>
          <ChevronDown className={`h-4 w-4 text-white/50 transition ${menuOpen ? "rotate-180" : ""}`} />
        </button>
        {menuOpen ? (
          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-white/80 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        ) : null}
      </div>
    </aside>
  );
}
