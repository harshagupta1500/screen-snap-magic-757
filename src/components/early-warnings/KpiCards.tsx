import { Bell, AlertTriangle, ShieldAlert, TrendingUp, Activity } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

type Kpi = {
  label: string;
  value: string;
  delta: string;
  icon: typeof Bell;
  tone: "info" | "critical" | "warn" | "success";
  chart: "line" | "bar";
  data: number[];
};

const KPIS: Kpi[] = [
  {
    label: "New Escalations",
    value: "18",
    delta: "vs Jul 2026: ↑ 44%",
    icon: Bell,
    tone: "info",
    chart: "line",
    data: [6, 8, 7, 10, 9, 12, 11, 14, 13, 16, 15, 18],
  },
  {
    label: "Critical This Month",
    value: "7",
    delta: "vs Jul 2026: ↑ 16%",
    icon: AlertTriangle,
    tone: "critical",
    chart: "line",
    data: [3, 4, 3, 5, 4, 6, 5, 6, 5, 7, 6, 7],
  },
  {
    label: "Persistent High Risk",
    value: "22",
    delta: "vs Jul 2026: ↑ 22%",
    icon: ShieldAlert,
    tone: "warn",
    chart: "line",
    data: [14, 15, 16, 15, 17, 18, 17, 19, 20, 19, 21, 22],
  },
  {
    label: "Improved Projects",
    value: "9",
    delta: "vs Jul 2026: ↑ 80%",
    icon: TrendingUp,
    tone: "success",
    chart: "line",
    data: [2, 3, 3, 4, 5, 4, 6, 6, 7, 8, 8, 9],
  },
  {
    label: "Avg Risk Change",
    value: "+11.4",
    delta: "vs Jul 2026: +2.8 pts",
    icon: Activity,
    tone: "info",
    chart: "bar",
    data: [4, 6, 5, 8, 6, 9, 7, 11, 8, 13, 10, 14],
  },
];

const TONE_TEXT = {
  info: "text-info",
  critical: "text-critical",
  warn: "text-warn",
  success: "text-success",
} as const;

const TONE_BG = {
  info: "bg-info-soft",
  critical: "bg-critical-soft",
  warn: "bg-warn-soft",
  success: "bg-success-soft",
} as const;

const TONE_STROKE = {
  info: "var(--info)",
  critical: "var(--critical)",
  warn: "var(--warn)",
  success: "var(--success)",
} as const;

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {KPIS.map((kpi) => {
        const Icon = kpi.icon;
        const data = kpi.data.map((v, i) => ({ i, v }));
        return (
          <div
            key={kpi.label}
            className="rounded-xl border border-border bg-card p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full",
                  TONE_BG[kpi.tone],
                  TONE_TEXT[kpi.tone],
                )}
              >
                <Icon className="size-[18px]" />
              </span>
            </div>
            <p className={cn("mt-1 text-3xl font-bold tracking-tight", TONE_TEXT[kpi.tone])}>
              {kpi.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{kpi.delta}</p>
            <div className="mt-2 h-10">
              <ResponsiveContainer width="100%" height="100%">
                {kpi.chart === "bar" ? (
                  <BarChart data={data}>
                    <Bar dataKey="v" fill={TONE_STROKE[kpi.tone]} radius={[2, 2, 0, 0]} />
                  </BarChart>
                ) : (
                  <AreaChart data={data}>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={TONE_STROKE[kpi.tone]}
                      strokeWidth={1.6}
                      fill="transparent"
                      dot={false}
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
