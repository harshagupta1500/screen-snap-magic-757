import { Info } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TREND = [
  { month: "Mar '26", newEsc: 7, worsening: 12, persistent: 16 },
  { month: "Apr '26", newEsc: 9, worsening: 14, persistent: 18 },
  { month: "May '26", newEsc: 10, worsening: 16, persistent: 19 },
  { month: "Jun '26", newEsc: 12, worsening: 18, persistent: 21 },
  { month: "Jul '26", newEsc: 13, worsening: 17, persistent: 20 },
  { month: "Aug '26", newEsc: 18, worsening: 19, persistent: 22 },
];

const SERIES = [
  { key: "newEsc", label: "New Escalations", color: "var(--info)" },
  { key: "worsening", label: "Worsening", color: "var(--warn)" },
  { key: "persistent", label: "Persistent High", color: "var(--critical)" },
] as const;

const DRIVERS = [
  { label: "Progress stagnation", value: 42 },
  { label: "Cost growth spike", value: 36 },
  { label: "Schedule slippage", value: 29 },
  { label: "Expenditure inefficiency", value: 21 },
  { label: "Milestone delay", value: 17 },
  { label: "Low peer performance", value: 12 },
];

const MAX = 50;

export function WarningTrendCard() {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
      <div className="flex flex-wrap items-baseline gap-2">
        <h2 className="text-lg font-semibold text-foreground">Warning Trend</h2>
        <span className="text-sm text-muted-foreground">(Last 6 Months)</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-4">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
      <div className="mt-3 h-[190px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={TREND} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid var(--border)",
                fontSize: 12,
              }}
            />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="linear"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2, fill: "var(--card)" }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export function EmergingDriversCard() {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
      <div className="flex flex-wrap items-baseline gap-2">
        <h2 className="text-lg font-semibold text-foreground">Top Emerging Drivers</h2>
        <span className="text-sm text-muted-foreground">(This Month)</span>
        <Info className="size-4 self-center text-muted-foreground" />
      </div>
      <ul className="mt-4 space-y-2.5">
        {DRIVERS.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2 text-xs">
            <span className="w-[168px] shrink-0 truncate text-muted-foreground">
              {i + 1}. {d.label}
            </span>
            <span className="flex-1">
              <span
                className="block h-3 rounded-sm bg-primary"
                style={{ width: `${(d.value / MAX) * 100}%` }}
              />
            </span>
            <span className="w-6 shrink-0 text-right font-medium text-muted-foreground">
              {d.value}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-2 pl-[176px] text-[10px] text-muted-foreground">
        <div className="flex flex-1 justify-between">
          {[0, 10, 20, 30, 40, 50].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <p className="mt-1 text-center text-[11px] text-muted-foreground">
        # of Projects Impacted
      </p>
    </section>
  );
}
