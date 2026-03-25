import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  accent?: "primary" | "success" | "destructive" | "warning" | "info";
}

const accentConfig = {
  primary: { bg: "bg-primary/10", text: "text-primary", ring: "ring-primary/20" },
  success: { bg: "bg-success/10", text: "text-success", ring: "ring-success/20" },
  destructive: { bg: "bg-destructive/10", text: "text-destructive", ring: "ring-destructive/20" },
  warning: { bg: "bg-warning/10", text: "text-warning", ring: "ring-warning/20" },
  info: { bg: "bg-info/10", text: "text-info", ring: "ring-info/20" },
};

export function StatsCard({ title, value, icon: Icon, description, trend, accent = "primary" }: StatsCardProps) {
  const cfg = accentConfig[accent];
  return (
    <div
      className="group relative rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:border-primary/20 overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/[0.03] to-transparent rounded-bl-full pointer-events-none" />
      <div className="relative flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">{title}</p>
          <p className="text-[28px] font-extrabold text-foreground tracking-tight leading-none">{value}</p>
          {description && <p className="text-[11px] text-muted-foreground mt-1">{description}</p>}
          {trend && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <p className="text-[11px] font-semibold text-success">{trend}</p>
            </div>
          )}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${cfg.bg} ${cfg.text} ring-1 ${cfg.ring} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
