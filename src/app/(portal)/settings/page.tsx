"use client";

import { FormEvent, useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { getStoredUser, setStoredUser, type AuthUser } from "@/lib/auth";

export default function SettingsPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const u = getStoredUser();
    setUser(u);
    if (u) {
      setName(u.name);
      setEmail(u.email);
    }
  }, []);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const next = { ...user, name, email };
    setStoredUser(next);
    setUser(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title="Settings" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid max-w-3xl gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-[#e5ebe8] bg-white p-5">
            <h2 className="mb-1 text-[14px] font-semibold text-[#1a2e26]">
              Profile
            </h2>
            <p className="mb-4 text-[12px] text-[#6b7c74]">
              Manage your account details and role display.
            </p>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#1a2e26]">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#dce5e0] px-3 text-[13px] outline-none focus:border-[#0a3d2e]"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#1a2e26]">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#dce5e0] px-3 text-[13px] outline-none focus:border-[#0a3d2e]"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#1a2e26]">
                  Role
                </label>
                <input
                  value={user?.role ?? ""}
                  disabled
                  className="h-10 w-full rounded-lg border border-[#dce5e0] bg-[#f7faf8] px-3 text-[13px] text-[#6b7c74]"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-[#0a3d2e] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#0d4a38]"
              >
                Save changes
              </button>
              {saved ? (
                <p className="text-[12px] text-[#0d7a4f]">Profile saved.</p>
              ) : null}
            </form>
          </section>

          <section className="rounded-xl border border-[#e5ebe8] bg-white p-5">
            <h2 className="mb-1 text-[14px] font-semibold text-[#1a2e26]">
              Security & permissions
            </h2>
            <p className="mb-4 text-[12px] text-[#6b7c74]">
              Role-based access, audit logs, and encryption (Phase 1–3 roadmap).
            </p>
            <ul className="space-y-2 text-[13px] text-[#1a2e26]">
              {[
                "Role-based permissions enabled",
                "Session stored locally (demo auth)",
                "Audit logs — planned Phase 3",
                "Encryption at rest — planned Phase 3",
                "Backup & recovery — planned Phase 3",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-[#eef2f0] px-3 py-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0a3d2e]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
