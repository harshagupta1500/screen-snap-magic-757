import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Calendar, ChevronDown, Download, Search, SlidersHorizontal, Info } from "lucide-react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { KpiCards } from "@/components/early-warnings/KpiCards";
import { WarningQueue } from "@/components/early-warnings/WarningQueue";
import { WarningTrendCard, EmergingDriversCard } from "@/components/early-warnings/InsightCards";
import { EscalationTimeline, RecentAlerts } from "@/components/early-warnings/BottomPanels";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const TITLE = "Early Warnings — InfraSight AI / PAIMANA AI";
const DESCRIPTION =
  "Detect newly escalating infrastructure projects using monthly risk changes, forecast shifts, and SHAP-based drivers.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: EarlyWarningsPage,
});

const SEVERITIES = ["All", "New", "Worsening", "Persistent", "Improving"];

function EarlyWarningsPage() {
  const [severity, setSeverity] = useState("All");

  return (
    <div className="flex min-h-screen bg-surface font-sans text-foreground">
      <AppSidebar />

      <main className="min-w-0 flex-1 px-5 py-5 lg:px-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Early Warnings</h1>
            <p className="mt-1 max-w-lg text-sm text-muted-foreground">
              Detect newly escalating infrastructure projects using monthly risk changes,
              forecast shifts, and SHAP-based drivers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium">
              <Calendar className="size-4 text-muted-foreground" />
              Aug 2026
              <ChevronDown className="ml-6 size-4 text-muted-foreground" />
            </button>
            <div className="relative">
              <input
                type="search"
                placeholder="Search projects, sectors, drivers..."
                className="h-11 w-[300px] rounded-lg border border-border bg-card pl-3 pr-9 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
              />
              <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <button className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium">
              <SlidersHorizontal className="size-4 text-muted-foreground" />
              Filters
              <ChevronDown className="ml-6 size-4 text-muted-foreground" />
            </button>
            <button
              aria-label="Notifications"
              className="relative grid size-10 place-items-center rounded-full text-muted-foreground hover:bg-card"
            >
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-2 pr-1">
              <span className="grid size-9 place-items-center rounded-full bg-info-soft text-sm font-semibold text-info">
                AN
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Arjun N.</p>
                <p className="text-xs text-muted-foreground">Risk Analyst</p>
              </div>
              <ChevronDown className="size-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="mt-5">
          <KpiCards />
        </div>

        {/* Filters row */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="text-sm font-semibold">Severity</span>
          <div className="flex flex-wrap gap-2">
            {SEVERITIES.map((s) => (
              <button
                key={s}
                onClick={() => setSeverity(s)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                  severity === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-accent",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <span className="ml-1 text-sm font-semibold">Sector</span>
          <button className="inline-flex h-9 min-w-[150px] items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground">
            All Sectors <ChevronDown className="size-4" />
          </button>

          <span className="ml-1 text-sm font-semibold">Ministry</span>
          <button className="inline-flex h-9 min-w-[150px] items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground">
            All Ministries <ChevronDown className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            <Switch defaultChecked />
            <span className="text-sm text-muted-foreground">
              Only threshold-crossing warnings
            </span>
            <Info className="size-4 text-muted-foreground" />
          </div>

          <button className="ml-auto inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium">
            <Download className="size-4 text-muted-foreground" />
            Export
            <ChevronDown className="ml-4 size-4 text-muted-foreground" />
          </button>
        </div>

        {/* Main grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <WarningQueue />
          <div className="flex flex-col gap-4">
            <WarningTrendCard />
            <EmergingDriversCard />
          </div>
        </div>

        {/* Bottom grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <EscalationTimeline />
          <RecentAlerts />
        </div>
      </main>
    </div>
  );
}
