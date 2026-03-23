import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  accent?: "primary" | "success" | "destructive" | "warning";
}

const accentStyles = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  destructive: "bg-destructive/10 text-destructive",
  warning: "bg-warning/10 text-warning",
};

export function StatsCard({ title, value, icon: Icon, description, trend, accent = "primary" }: StatsCardProps) {
  return (
    <div
      className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-card-hover)]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {trend && (
            <p className="text-xs font-semibold text-success flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-success" />
              {trend}
            </p>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[accent]} transition-transform group-hover:scale-105`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
