import { DollarSign, PiggyBank, Receipt, TrendingDown } from "lucide-react";
import { TopBar } from "@/components/TopBar";

const budgets = [
  { name: "Major Projects", allocated: 2400000, spent: 1680000 },
  { name: "Housing", allocated: 850000, spent: 620000 },
  { name: "Capital Projects", allocated: 1200000, spent: 410000 },
  { name: "Forestry", allocated: 320000, spent: 198000 },
  { name: "Lands", allocated: 275000, spent: 142000 },
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function FinancePage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TopBar title="Finance Dashboard" />
      <div className="flex-1 overflow-y-auto p-6">
        <p className="mb-6 text-[14px] text-[#6b7c74]">
          Budget tracking, expense oversight, and financial reports for executives.
        </p>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total allocated", value: "$5.05M", icon: PiggyBank },
            { label: "Total spent", value: "$3.05M", icon: DollarSign },
            { label: "Remaining", value: "$2.00M", icon: Receipt },
            { label: "Variance", value: "−2.1%", icon: TrendingDown },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-[#e5ebe8] bg-white p-4"
            >
              <card.icon className="mb-3 h-5 w-5 text-[#0a3d2e]" />
              <p className="text-[22px] font-semibold text-[#1a2e26]">{card.value}</p>
              <p className="text-[12px] text-[#6b7c74]">{card.label}</p>
            </div>
          ))}
        </div>

        <section className="overflow-hidden rounded-xl border border-[#e5ebe8] bg-white">
          <div className="border-b border-[#eef2f0] px-4 py-3">
            <h2 className="text-[14px] font-semibold text-[#1a2e26]">
              Department budgets
            </h2>
          </div>
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-[#eef2f0] bg-[#f7faf8] text-[11px] tracking-wide text-[#6b7c74] uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Department</th>
                <th className="px-4 py-3 font-semibold">Allocated</th>
                <th className="px-4 py-3 font-semibold">Spent</th>
                <th className="px-4 py-3 font-semibold">Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef2f0]">
              {budgets.map((b) => {
                const pct = Math.round((b.spent / b.allocated) * 100);
                return (
                  <tr key={b.name} className="hover:bg-[#f7faf8]">
                    <td className="px-4 py-3 font-medium text-[#1a2e26]">{b.name}</td>
                    <td className="px-4 py-3 text-[#6b7c74]">{formatCurrency(b.allocated)}</td>
                    <td className="px-4 py-3 text-[#6b7c74]">{formatCurrency(b.spent)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-[#eef2f0]">
                          <div
                            className="h-full rounded-full bg-[#0a3d2e]"
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
      </div>
    </div>
  );
}
