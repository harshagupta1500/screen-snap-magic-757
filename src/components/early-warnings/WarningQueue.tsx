import { Info, ArrowUp, ArrowDown, Building2 } from "lucide-react";
import { Pill, RiskText, type Tone } from "@/components/dashboard/Pill";
import { cn } from "@/lib/utils";

type Row = {
  project: string;
  sector: string;
  prev: [string, number];
  curr: [string, number];
  change: number;
  overrun: string;
  delay: string;
  trigger: string;
  status: "New Escalation" | "Worsening" | "Persistent" | "Improving";
  first: string;
  priority: "Critical" | "High" | "Medium" | "Low";
};

const ROWS: Row[] = [
  {
    project: "National Highway Corridor Expansion (NH-48)",
    sector: "Roads",
    prev: ["High", 58],
    curr: ["Critical", 78],
    change: 20,
    overrun: "22%",
    delay: "+9 mo",
    trigger: "Cost forecast crossed 15%",
    status: "New Escalation",
    first: "Aug 24, 2026",
    priority: "Critical",
  },
  {
    project: "Eastern Freight Link",
    sector: "Railways",
    prev: ["Medium", 46],
    curr: ["High", 67],
    change: 21,
    overrun: "18%",
    delay: "+7 mo",
    trigger: "Delay forecast jumped +8 mo",
    status: "Worsening",
    first: "Aug 22, 2026",
    priority: "High",
  },
  {
    project: "Teesta Valley Hydro Power Station (1200 MW)",
    sector: "Power",
    prev: ["High", 61],
    curr: ["High", 72],
    change: 11,
    overrun: "16%",
    delay: "+5 mo",
    trigger: "Milestone slippage worsening",
    status: "Persistent",
    first: "Jul 18, 2026",
    priority: "High",
  },
  {
    project: "Metro Rail Phase II",
    sector: "Urban Infra",
    prev: ["Medium", 44],
    curr: ["High", 63],
    change: 19,
    overrun: "17%",
    delay: "+6 mo",
    trigger: "Progress stagnant 3 months",
    status: "Worsening",
    first: "Aug 23, 2026",
    priority: "High",
  },
  {
    project: "LNG Terminal Upgrade",
    sector: "Oil & Gas",
    prev: ["High", 59],
    curr: ["Critical", 82],
    change: 23,
    overrun: "25%",
    delay: "+10 mo",
    trigger: "Cost forecast crossed 15%",
    status: "New Escalation",
    first: "Aug 25, 2026",
    priority: "Critical",
  },
  {
    project: "Rural Transmission Package (Phase III)",
    sector: "Power",
    prev: ["Medium", 47],
    curr: ["Medium", 54],
    change: 7,
    overrun: "8%",
    delay: "+2 mo",
    trigger: "Low progress vs peers",
    status: "Persistent",
    first: "Jul 30, 2026",
    priority: "Medium",
  },
  {
    project: "Port Connectivity Road",
    sector: "Roads",
    prev: ["High", 56],
    curr: ["Medium", 49],
    change: -7,
    overrun: "6%",
    delay: "−1 mo",
    trigger: "Improving progress trend",
    status: "Improving",
    first: "Aug 10, 2026",
    priority: "Medium",
  },
  {
    project: "Smart City – Water Supply Network",
    sector: "Urban Infra",
    prev: ["Medium", 41],
    curr: ["Medium", 38],
    change: -3,
    overrun: "5%",
    delay: "−2 mo",
    trigger: "Milestones ahead of plan",
    status: "Improving",
    first: "Aug 12, 2026",
    priority: "Low",
  },
];

const STATUS_TONE: Record<Row["status"], Tone> = {
  "New Escalation": "critical",
  Worsening: "high",
  Persistent: "medium",
  Improving: "success",
};

const PRIORITY_TONE: Record<Row["priority"], Tone> = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
};

const HEADERS = [
  "Project",
  "Sector",
  "Previous Risk",
  "Current Risk",
  "Risk Change",
  "Pred. Cost Overrun",
  "Pred. Delay",
  "Trigger / Driver",
  "Warning Status",
  "First Appeared",
  "Priority",
];

export function WarningQueue() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
      <header className="flex items-center gap-2 px-5 py-4">
        <h2 className="text-lg font-semibold text-foreground">Active Warning Queue</h2>
        <Info className="size-4 text-muted-foreground" />
      </header>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface">
              {HEADERS.map((h, i) => (
                <th
                  key={h}
                  className={cn(
                    "whitespace-nowrap border-y border-border px-3 py-2.5 text-xs font-semibold text-muted-foreground",
                    i === 0 ? "text-left" : "text-center",
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.project} className="border-b border-border last:border-0 hover:bg-surface">
                <td className="max-w-[240px] px-3 py-3">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-surface text-muted-foreground">
                      <Building2 className="size-4" />
                    </span>
                    <span className="font-medium text-foreground">{r.project}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-center text-muted-foreground">
                  {r.sector}
                </td>
                <td className="px-3 py-3 text-center">
                  <RiskText level={r.prev[0]} score={r.prev[1]} />
                </td>
                <td className="px-3 py-3 text-center">
                  <RiskText level={r.curr[0]} score={r.curr[1]} />
                </td>
                <td className="px-3 py-3 text-center">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-sm font-semibold",
                      r.change > 0 ? "text-critical" : "text-success",
                    )}
                  >
                    {r.change > 0 ? (
                      <ArrowUp className="size-3.5" />
                    ) : (
                      <ArrowDown className="size-3.5" />
                    )}
                    {Math.abs(r.change)} pts
                  </span>
                </td>
                <td
                  className={cn(
                    "px-3 py-3 text-center font-medium",
                    parseInt(r.overrun) >= 15 ? "text-critical" : "text-foreground",
                  )}
                >
                  {r.overrun}
                </td>
                <td
                  className={cn(
                    "whitespace-nowrap px-3 py-3 text-center font-medium",
                    r.delay.startsWith("+") ? "text-critical" : "text-success",
                  )}
                >
                  {r.delay}
                </td>
                <td className="max-w-[150px] px-3 py-3 text-muted-foreground">{r.trigger}</td>
                <td className="px-3 py-3 text-center">
                  <Pill tone={STATUS_TONE[r.status]}>{r.status}</Pill>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-center text-muted-foreground">
                  {r.first}
                </td>
                <td className="px-3 py-3 text-center">
                  <Pill tone={PRIORITY_TONE[r.priority]}>{r.priority}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
