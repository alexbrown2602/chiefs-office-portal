"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Download,
  PiggyBank,
  Receipt,
  Search,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";

const budgets = [
  { name: "Major Projects", allocated: 2400000, spent: 1680000, code: "MP-26" },
  { name: "Housing", allocated: 850000, spent: 620000, code: "HS-26" },
  { name: "Capital Projects", allocated: 1200000, spent: 410000, code: "CP-26" },
  { name: "Forestry", allocated: 320000, spent: 198000, code: "FO-26" },
  { name: "Lands", allocated: 275000, spent: 142000, code: "LA-26" },
  { name: "Chief's Office", allocated: 180000, spent: 96000, code: "CO-26" },
];

const expenses = [
  {
    id: "ex1",
    date: "May 7, 2026",
    vendor: "Centerra legal retainers",
    department: "Major Projects",
    category: "Professional services",
    amount: 28500,
    status: "Posted",
  },
  {
    id: "ex2",
    date: "May 6, 2026",
    vendor: "Survey contractor — North parcel",
    department: "Lands",
    category: "Contractors",
    amount: 12400,
    status: "Pending",
  },
  {
    id: "ex3",
    date: "May 5, 2026",
    vendor: "Community hall materials",
    department: "Capital Projects",
    category: "Materials",
    amount: 48200,
    status: "Posted",
  },
  {
    id: "ex4",
    date: "May 4, 2026",
    vendor: "Housing unit repairs",
    department: "Housing",
    category: "Maintenance",
    amount: 8700,
    status: "Posted",
  },
  {
    id: "ex5",
    date: "May 2, 2026",
    vendor: "Silviculture RFP ads",
    department: "Forestry",
    category: "Communications",
    amount: 2100,
    status: "Posted",
  },
  {
    id: "ex6",
    date: "May 1, 2026",
    vendor: "Water phase 2 change order",
    department: "Capital Projects",
    category: "Infrastructure",
    amount: 156000,
    status: "Awaiting approval",
  },
];

const invoices = [
  {
    id: "inv1",
    number: "INV-2026-118",
    payee: "Northern Survey Co.",
    due: "May 18, 2026",
    amount: 12400,
    status: "Due soon",
  },
  {
    id: "inv2",
    number: "INV-2026-121",
    payee: "Interior Build Group",
    due: "May 22, 2026",
    amount: 48200,
    status: "Scheduled",
  },
  {
    id: "inv3",
    number: "INV-2026-109",
    payee: "Takla Legal Counsel",
    due: "May 10, 2026",
    amount: 28500,
    status: "Paid",
  },
  {
    id: "inv4",
    number: "INV-2026-130",
    payee: "AquaLine Contractors",
    due: "May 30, 2026",
    amount: 156000,
    status: "On hold",
  },
];

const cashflow = [
  { month: "Jan", in: 420, out: 310 },
  { month: "Feb", in: 390, out: 340 },
  { month: "Mar", in: 510, out: 380 },
  { month: "Apr", in: 470, out: 410 },
  { month: "May", in: 440, out: 360 },
];

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "budgets", label: "Budgets" },
  { id: "expenses", label: "Expenses" },
  { id: "invoices", label: "Invoices & payments" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

const invoiceStatus: Record<string, string> = {
  Paid: "bg-[#e8f5ef] text-[#0d7a4f]",
  Scheduled: "bg-[#eff6ff] text-[#2563eb]",
  "Due soon": "bg-[#fff7ed] text-[#ea580c]",
  "On hold": "bg-[#fef2f2] text-[#dc2626]",
};

const expenseStatus: Record<string, string> = {
  Posted: "bg-[#e8f5ef] text-[#0d7a4f]",
  Pending: "bg-[#fff7ed] text-[#ea580c]",
  "Awaiting approval": "bg-[#fef2f2] text-[#dc2626]",
};

export default function FinancePage() {
  const [tab, setTab] = useState<TabId>("overview");
  const [query, setQuery] = useState("");

  const totals = useMemo(() => {
    const allocated = budgets.reduce((s, b) => s + b.allocated, 0);
    const spent = budgets.reduce((s, b) => s + b.spent, 0);
    return {
      allocated,
      spent,
      remaining: allocated - spent,
      utilization: Math.round((spent / allocated) * 100),
    };
  }, []);

  const filteredExpenses = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return expenses;
    return expenses.filter(
      (e) =>
        e.vendor.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredInvoices = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return invoices;
    return invoices.filter(
      (i) =>
        i.number.toLowerCase().includes(q) ||
        i.payee.toLowerCase().includes(q)
    );
  }, [query]);

  const maxCash = Math.max(...cashflow.flatMap((c) => [c.in, c.out]));

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title="Finance" period="Budget · Expenses · Payments · May 2026" />
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="border-b border-[#e5ebe8] bg-white px-6 py-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-medium tracking-wide text-[#8a9a92] uppercase">
                Finance management
              </p>
              <h2 className="mt-1 text-[22px] font-semibold tracking-tight text-[#1a2e26]">
                Nation budgets & spend
              </h2>
              <p className="mt-1 text-[13px] text-[#6b7c74]">
                Track allocations, expenses, invoices, and variance for executive
                oversight.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[#dce5e0] bg-white px-3.5 py-2 text-[13px] font-medium text-[#0a3d2e] hover:bg-[#f7faf8]"
            >
              <Download className="h-4 w-4" />
              Export report
            </button>
          </div>

          <div className="mt-5 flex gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-[13px] font-medium transition ${
                  tab === t.id
                    ? "bg-[#0a3d2e] text-white"
                    : "text-[#5a6b63] hover:bg-[#f0f5f2]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pt-5">
          {tab === "overview" ? (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: "Total allocated",
                    value: formatCurrency(totals.allocated),
                    icon: PiggyBank,
                    hint: "FY 2026 departments",
                    tone: "text-[#0a3d2e]",
                  },
                  {
                    label: "Total spent",
                    value: formatCurrency(totals.spent),
                    icon: DollarSign,
                    hint: `${totals.utilization}% utilized`,
                    tone: "text-[#1a6b8a]",
                  },
                  {
                    label: "Remaining",
                    value: formatCurrency(totals.remaining),
                    icon: Wallet,
                    hint: "Available to allocate",
                    tone: "text-[#0d7a4f]",
                  },
                  {
                    label: "Variance",
                    value: "−2.1%",
                    icon: TrendingDown,
                    hint: "Under plan · On track",
                    tone: "text-[#0d7a4f]",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded-xl border border-[#e5ebe8] bg-white p-4 shadow-[0_1px_2px_rgba(10,61,46,0.04)]"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <card.icon className={`h-5 w-5 ${card.tone}`} />
                      <Receipt className="h-4 w-4 text-[#c5d5cc]" />
                    </div>
                    <p className="text-[22px] font-semibold text-[#1a2e26]">
                      {card.value}
                    </p>
                    <p className="text-[12px] font-medium text-[#1a2e26]">
                      {card.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#8a9a92]">{card.hint}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-5">
                <section className="rounded-xl border border-[#e5ebe8] bg-white p-5 xl:col-span-3">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-[#1a2e26]">
                      Cash flow (YTD, $k)
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-[#6b7c74]">
                      <span className="inline-flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#0a3d2e]" /> Inflow
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-[#7cb89a]" /> Outflow
                      </span>
                    </div>
                  </div>
                  <div className="flex h-44 items-end gap-3">
                    {cashflow.map((c) => (
                      <div key={c.month} className="flex flex-1 flex-col items-center gap-2">
                        <div className="flex h-36 w-full items-end justify-center gap-1">
                          <div
                            className="w-3 rounded-t bg-[#0a3d2e]"
                            style={{ height: `${(c.in / maxCash) * 100}%` }}
                            title={`In ${c.in}k`}
                          />
                          <div
                            className="w-3 rounded-t bg-[#7cb89a]"
                            style={{ height: `${(c.out / maxCash) * 100}%` }}
                            title={`Out ${c.out}k`}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-[#6b7c74]">
                          {c.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-[#e5ebe8] bg-white p-5 xl:col-span-2">
                  <h3 className="mb-4 text-[14px] font-semibold text-[#1a2e26]">
                    Alerts
                  </h3>
                  <ul className="space-y-3">
                    <li className="rounded-lg border border-[#fef2f2] bg-[#fef2f2]/60 px-3 py-2.5">
                      <p className="text-[12px] font-semibold text-[#dc2626]">
                        Change order awaiting approval
                      </p>
                      <p className="text-[11px] text-[#6b7c74]">
                        Water Phase 2 · {formatCurrency(156000)}
                      </p>
                    </li>
                    <li className="rounded-lg border border-[#fff7ed] bg-[#fff7ed]/60 px-3 py-2.5">
                      <p className="text-[12px] font-semibold text-[#ea580c]">
                        Invoice due soon
                      </p>
                      <p className="text-[11px] text-[#6b7c74]">
                        INV-2026-118 · May 18
                      </p>
                    </li>
                    <li className="rounded-lg border border-[#e8f5ef] bg-[#e8f5ef]/60 px-3 py-2.5">
                      <p className="text-[12px] font-semibold text-[#0d7a4f]">
                        Variance under plan
                      </p>
                      <p className="text-[11px] text-[#6b7c74]">
                        Overall −2.1% vs budget
                      </p>
                    </li>
                  </ul>
                </section>
              </div>

              <section className="overflow-hidden rounded-xl border border-[#e5ebe8] bg-white">
                <div className="border-b border-[#eef2f0] px-4 py-3">
                  <h3 className="text-[14px] font-semibold text-[#1a2e26]">
                    Budget utilization by department
                  </h3>
                </div>
                <div className="divide-y divide-[#eef2f0] p-2">
                  {budgets.slice(0, 4).map((b) => {
                    const pct = Math.round((b.spent / b.allocated) * 100);
                    return (
                      <div key={b.name} className="px-3 py-3">
                        <div className="mb-1.5 flex items-center justify-between text-[12px]">
                          <span className="font-medium text-[#1a2e26]">{b.name}</span>
                          <span className="text-[#6b7c74]">
                            {formatCurrency(b.spent)} / {formatCurrency(b.allocated)} ·{" "}
                            {pct}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-[#eef2f0]">
                          <div
                            className={`h-full rounded-full ${
                              pct >= 80 ? "bg-[#ea580c]" : "bg-[#0a3d2e]"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          ) : null}

          {tab === "budgets" ? (
            <section className="overflow-hidden rounded-xl border border-[#e5ebe8] bg-white">
              <div className="flex items-center justify-between border-b border-[#eef2f0] px-4 py-3">
                <h3 className="text-[14px] font-semibold text-[#1a2e26]">
                  Department budgets
                </h3>
                <p className="text-[12px] text-[#6b7c74]">
                  {formatCurrency(totals.remaining)} remaining nation-wide
                </p>
              </div>
              <table className="w-full text-left text-[13px]">
                <thead className="border-b border-[#eef2f0] bg-[#f7faf8] text-[11px] tracking-wide text-[#6b7c74] uppercase">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Code</th>
                    <th className="px-4 py-3 font-semibold">Department</th>
                    <th className="px-4 py-3 font-semibold">Allocated</th>
                    <th className="px-4 py-3 font-semibold">Spent</th>
                    <th className="px-4 py-3 font-semibold">Remaining</th>
                    <th className="px-4 py-3 font-semibold">Utilization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eef2f0]">
                  {budgets.map((b) => {
                    const pct = Math.round((b.spent / b.allocated) * 100);
                    const remaining = b.allocated - b.spent;
                    return (
                      <tr key={b.code} className="hover:bg-[#f7faf8]">
                        <td className="px-4 py-3 font-mono text-[12px] text-[#6b7c74]">
                          {b.code}
                        </td>
                        <td className="px-4 py-3 font-medium text-[#1a2e26]">
                          {b.name}
                        </td>
                        <td className="px-4 py-3 text-[#6b7c74]">
                          {formatCurrency(b.allocated)}
                        </td>
                        <td className="px-4 py-3 text-[#6b7c74]">
                          {formatCurrency(b.spent)}
                        </td>
                        <td className="px-4 py-3 font-medium text-[#0d7a4f]">
                          {formatCurrency(remaining)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-[#eef2f0]">
                              <div
                                className={`h-full rounded-full ${
                                  pct >= 80 ? "bg-[#ea580c]" : "bg-[#0a3d2e]"
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[#6b7c74]">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          ) : null}

          {tab === "expenses" ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[13px] text-[#6b7c74]">
                  Recent expense postings and pending charges.
                </p>
                <div className="relative min-w-[220px]">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8a9a92]" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search expenses…"
                    className="h-9 w-full rounded-full border border-[#dce5e0] bg-white pr-4 pl-9 text-[13px] outline-none focus:border-[#0a3d2e]/40"
                  />
                </div>
              </div>
              <section className="overflow-hidden rounded-xl border border-[#e5ebe8] bg-white">
                <table className="w-full text-left text-[13px]">
                  <thead className="border-b border-[#eef2f0] bg-[#f7faf8] text-[11px] tracking-wide text-[#6b7c74] uppercase">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Vendor / description</th>
                      <th className="px-4 py-3 font-semibold">Department</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eef2f0]">
                    {filteredExpenses.map((e) => (
                      <tr key={e.id} className="hover:bg-[#f7faf8]">
                        <td className="px-4 py-3 text-[#6b7c74]">{e.date}</td>
                        <td className="px-4 py-3 font-medium text-[#1a2e26]">
                          {e.vendor}
                        </td>
                        <td className="px-4 py-3 text-[#6b7c74]">{e.department}</td>
                        <td className="px-4 py-3 text-[#6b7c74]">{e.category}</td>
                        <td className="px-4 py-3 font-medium text-[#1a2e26]">
                          {formatCurrency(e.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                              expenseStatus[e.status]
                            }`}
                          >
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          ) : null}

          {tab === "invoices" ? (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Payables due (30d)",
                    value: formatCurrency(60600),
                    icon: ArrowUpRight,
                    color: "text-[#ea580c]",
                  },
                  {
                    label: "Paid this month",
                    value: formatCurrency(28500),
                    icon: ArrowDownRight,
                    color: "text-[#0d7a4f]",
                  },
                  {
                    label: "On hold",
                    value: formatCurrency(156000),
                    icon: CreditCard,
                    color: "text-[#dc2626]",
                  },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="rounded-xl border border-[#e5ebe8] bg-white p-4"
                  >
                    <c.icon className={`mb-2 h-4 w-4 ${c.color}`} />
                    <p className="text-[20px] font-semibold text-[#1a2e26]">
                      {c.value}
                    </p>
                    <p className="text-[12px] text-[#6b7c74]">{c.label}</p>
                  </div>
                ))}
              </div>

              <div className="relative max-w-xs">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8a9a92]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search invoices…"
                  className="h-9 w-full rounded-full border border-[#dce5e0] bg-white pr-4 pl-9 text-[13px] outline-none focus:border-[#0a3d2e]/40"
                />
              </div>

              <section className="overflow-hidden rounded-xl border border-[#e5ebe8] bg-white">
                <table className="w-full text-left text-[13px]">
                  <thead className="border-b border-[#eef2f0] bg-[#f7faf8] text-[11px] tracking-wide text-[#6b7c74] uppercase">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Invoice</th>
                      <th className="px-4 py-3 font-semibold">Payee</th>
                      <th className="px-4 py-3 font-semibold">Due</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eef2f0]">
                    {filteredInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#f7faf8]">
                        <td className="px-4 py-3 font-mono text-[12px] font-medium text-[#1a2e26]">
                          {inv.number}
                        </td>
                        <td className="px-4 py-3 text-[#6b7c74]">{inv.payee}</td>
                        <td className="px-4 py-3 text-[#6b7c74]">{inv.due}</td>
                        <td className="px-4 py-3 font-medium text-[#1a2e26]">
                          {formatCurrency(inv.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                              invoiceStatus[inv.status]
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {inv.status !== "Paid" ? (
                            <button
                              type="button"
                              className="rounded-lg bg-[#0a3d2e] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#0d4a38]"
                            >
                              {inv.status === "On hold" ? "Review" : "Pay"}
                            </button>
                          ) : (
                            <span className="text-[12px] text-[#8a9a92]">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
