import { Info, Bell, ArrowRight } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const TIMELINE = [
  { month: "Jun 2026", score: 42 },
  { month: "Jul 2026", score: 51 },
  { month: "Aug 2026", score: 64 },
  { month: "Sep 2026", score: 78 },
];

const ALERTS = [
  {
    bold: "Metro Rail Phase II",
    text: " moved from Medium to High risk — Trigger: Progress stagnant 3 months.",
    time: "2h ago",
  },
  {
    bold: "LNG Terminal Upgrade",
    text: " moved from High to Critical risk — Trigger: Cost forecast crossed 15%.",
    time: "4h ago",
  },
  {
    bold: "Eastern Freight Link",
    text: " delay forecast increased by +8 months — Risk change: +21 pts.",
    time: "6h ago",
  },
  {
    bold: "Teesta Valley Hydro Power Station",
    text: " milestone slippage worsening — Risk remains High.",
    time: "8h ago",
  },
];

export function EscalationTimeline() {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">Escalation Timeline</h2>
        <Info className="size-4 text-muted-foreground" />
      </div>
      <p className="mt-2 text-sm font-medium text-primary">
        National Highway Corridor Expansion (NH-48)
      </p>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">Risk Score (0–100)</p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TIMELINE} margin={{ top: 18, right: 12, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--critical)" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="var(--critical)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 50, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                />
                <Area
                  type="linear"
                  dataKey="score"
                  stroke="var(--critical)"
                  strokeWidth={2}
                  fill="url(#riskFill)"
                  dot={{ r: 4, fill: "var(--critical)", strokeWidth: 0 }}
                >
                  <LabelList
                    dataKey="score"
                    position="top"
                    offset={10}
                    style={{ fontSize: 12, fontWeight: 600, fill: "var(--foreground)" }}
                  />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full shrink-0 self-center rounded-lg border border-critical/20 bg-critical-soft p-4 text-center sm:w-44">
          <p className="text-xs text-muted-foreground">Risk Change (Jul → Aug)</p>
          <p className="mt-1 text-2xl font-bold text-critical">+13 pts</p>
          <div className="my-3 border-t border-critical/20" />
          <p className="text-xs text-muted-foreground">Current Risk</p>
          <p className="mt-1 text-base font-semibold text-critical">78 (Critical)</p>
        </div>
      </div>
    </section>
  );
}

export function RecentAlerts() {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">Recently Triggered Alerts</h2>
        <Info className="size-4 text-muted-foreground" />
      </div>
      <div className="mt-1 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all alerts <ArrowRight className="size-3.5" />
        </button>
      </div>
      <ul className="mt-2 divide-y divide-border">
        {ALERTS.map((a) => (
          <li key={a.bold} className="flex items-start gap-3 py-3.5">
            <Bell className="mt-0.5 size-4 shrink-0 text-critical" />
            <p className="flex-1 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{a.bold}</span>
              {a.text}
            </p>
            <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
