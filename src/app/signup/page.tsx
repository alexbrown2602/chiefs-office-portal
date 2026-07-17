"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { EagleWatermark, TaklaLogo } from "@/components/Logo";
import { getStoredUser, setStoredUser, signup } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("Team Member");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getStoredUser()) router.replace("/dashboard");
  }, [router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const user = signup(name, email, password);
    setStoredUser({ ...user, role });
    router.push("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen">
      <div className="relative hidden w-[44%] overflow-hidden bg-[#0a3d2e] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3">
          <TaklaLogo className="h-12 w-12" />
          <div>
            <p className="text-lg font-semibold text-white">Takla Nation</p>
            <p className="text-sm text-white/55">Chief&apos;s Office Portal</p>
          </div>
        </div>
        <div className="relative z-10 max-w-md">
          <h1 className="text-3xl font-semibold leading-tight text-white">
            Join your department workspace.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">
            Role-based access for CEO, Executive Leads, Department Leads, Team
            Members, Finance, and Administrators.
          </p>
        </div>
        <p className="relative z-10 text-xs text-white/40">
          © {new Date().getFullYear()} Takla Nation. All rights reserved.
        </p>
        <EagleWatermark className="pointer-events-none absolute -right-10 -bottom-10 h-72 w-72 text-white/[0.08]" />
      </div>

      <div className="flex flex-1 flex-col justify-center bg-[#f4f7f6] px-6 py-12">
        <div className="mx-auto w-full max-w-[400px]">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <TaklaLogo className="h-10 w-10" />
            <div>
              <p className="font-semibold text-[#0a3d2e]">Takla Nation</p>
              <p className="text-xs text-[#6b7c74]">Chief&apos;s Office Portal</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#1a2e26]">Create account</h2>
          <p className="mt-1 text-[14px] text-[#6b7c74]">
            Register for portal access. Approvals may be required by admin.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium text-[#1a2e26]">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#dce5e0] bg-white px-3.5 text-[14px] outline-none focus:border-[#0a3d2e] focus:ring-2 focus:ring-[#0a3d2e]/15"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-[#1a2e26]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#dce5e0] bg-white px-3.5 text-[14px] outline-none focus:border-[#0a3d2e] focus:ring-2 focus:ring-[#0a3d2e]/15"
                placeholder="you@takla.ca"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="role" className="mb-1.5 block text-[13px] font-medium text-[#1a2e26]">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#dce5e0] bg-white px-3.5 text-[14px] outline-none focus:border-[#0a3d2e] focus:ring-2 focus:ring-[#0a3d2e]/15"
              >
                <option>CEO</option>
                <option>Executive Project Lead</option>
                <option>Department Lead</option>
                <option>Team Member</option>
                <option>Finance/CFO</option>
                <option>System Administrator</option>
              </select>
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-[#1a2e26]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#dce5e0] bg-white px-3.5 text-[14px] outline-none focus:border-[#0a3d2e] focus:ring-2 focus:ring-[#0a3d2e]/15"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="mb-1.5 block text-[13px] font-medium text-[#1a2e26]">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#dce5e0] bg-white px-3.5 text-[14px] outline-none focus:border-[#0a3d2e] focus:ring-2 focus:ring-[#0a3d2e]/15"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            {error ? (
              <p className="rounded-lg bg-[#fef2f2] px-3 py-2 text-[13px] text-[#dc2626]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-[#0a3d2e] text-[14px] font-semibold text-white transition hover:bg-[#0d4a38] disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-[#6b7c74]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#0a3d2e] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
