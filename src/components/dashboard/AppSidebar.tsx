import {
  LayoutDashboard,
  FolderClosed,
  Bell,
  TrendingUp,
  Target,
  Database,
  Settings,
  ChevronsLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderClosed },
  { label: "Early Warnings", icon: Bell, active: true },
  { label: "Forecast", icon: TrendingUp },
  { label: "Prediction Accuracy", icon: Target },
  { label: "Data Quality", icon: Database },
  { label: "Settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
      <div className="border-b border-sidebar-border px-6 py-5">
        <h1 className="text-xl font-bold tracking-tight text-sidebar-accent-foreground">
          InfraSight AI
        </h1>
        <p className="text-base font-semibold text-primary">/ PAIMANA AI</p>
        <p className="mt-1 text-sm text-sidebar-foreground/70">Project Monitoring</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {NAV.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="size-[18px]" strokeWidth={1.8} />
            {label}
          </button>
        ))}
      </nav>

      <div className="flex items-center justify-between border-t border-sidebar-border px-5 py-4">
        <span className="text-xs text-sidebar-foreground/60">Version 1.0.0</span>
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="grid size-8 place-items-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground/80 transition-colors hover:text-sidebar-accent-foreground"
        >
          <ChevronsLeft className="size-4" />
        </button>
      </div>
    </aside>
  );
}
