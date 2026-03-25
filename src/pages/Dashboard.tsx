import { Users, Heart, GitCompareArrows, AlertTriangle, Activity, Clock, ArrowRight, Zap } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { stats, recipients, donors } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const urgencyColor: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-warning/10 text-warning border-warning/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-[1200px]">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard title="Total Donors" value={stats.totalDonors} icon={Heart} trend="+2 this week" accent="primary" />
        <StatsCard title="Total Recipients" value={stats.totalRecipients} icon={Users} accent="warning" />
        <StatsCard title="Matches Completed" value={stats.matchesCompleted} icon={GitCompareArrows} description="Out of 5 pending" accent="success" />
        <StatsCard title="Critical Cases" value={stats.criticalCases} icon={AlertTriangle} accent="destructive" />
        <StatsCard title="Avg Match Score" value={`${stats.avgMatchScore}%`} icon={Activity} accent="info" />
        <StatsCard title="Pending Matches" value={stats.pendingMatches} icon={Clock} accent="warning" />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Add Donor", desc: "Register a new organ donor", url: "/add-donor", icon: Heart, gradient: "from-primary/10 to-primary/5" },
            { label: "Add Recipient", desc: "Register a transplant recipient", url: "/add-recipient", icon: Users, gradient: "from-warning/10 to-warning/5" },
            { label: "Run Matching", desc: "Find optimal donor matches", url: "/matching", icon: Zap, gradient: "from-success/10 to-success/5" },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.url)}
              className={`group relative flex items-center gap-4 rounded-xl border border-border bg-gradient-to-br ${action.gradient} p-4 text-left transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)] overflow-hidden`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card border border-border text-primary shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                <action.icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{action.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{action.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Recipients Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-gradient-to-r from-card to-muted/30">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Recipients Awaiting Match</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">{recipients.length} patients in queue</p>
          </div>
          <Button variant="ghost" size="sm" className="text-[11px] text-primary font-semibold hover:bg-primary/5" onClick={() => navigate("/matching")}>
            View All <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] text-left">Patient</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] text-left">Blood</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] text-left">Organ</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] text-left">Urgency</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] text-left">Wait</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((r) => (
                <tr key={r.id} className="border-b border-border/40 last:border-0 hover:bg-primary/[0.02] transition-colors duration-200">
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium text-foreground text-[13px]">{r.name}</p>
                      <p className="text-[11px] text-muted-foreground">Age {r.age}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant="outline" className="font-mono text-[11px] bg-muted/50">{r.bloodGroup}</Badge>
                  </td>
                  <td className="px-5 py-3 text-[13px] text-muted-foreground">{r.organ}</td>
                  <td className="px-5 py-3">
                    <Badge className={`${urgencyColor[r.urgency]} text-[11px] font-medium`} variant="outline">{r.urgency}</Badge>
                  </td>
                  <td className="px-5 py-3 text-[13px] text-muted-foreground font-medium">{r.waitTime}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Donors Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-gradient-to-r from-card to-muted/30">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Available Donors</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">{donors.length} donors registered</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] text-left">Donor</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] text-left">Blood</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] text-left">Organ</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] text-left">HLA Match</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.08em] text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {donors.slice(0, 5).map((d) => (
                <tr key={d.id} className="border-b border-border/40 last:border-0 hover:bg-primary/[0.02] transition-colors duration-200">
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium text-foreground text-[13px]">{d.name}</p>
                      <p className="text-[11px] text-muted-foreground">Age {d.age}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant="outline" className="font-mono text-[11px] bg-muted/50">{d.bloodGroup}</Badge>
                  </td>
                  <td className="px-5 py-3 text-[13px] text-muted-foreground">{d.organ}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500" style={{ width: `${d.hlaMatch}%` }} />
                      </div>
                      <span className="text-[11px] text-muted-foreground font-mono font-medium">{d.hlaMatch}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[13px] text-muted-foreground">{d.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
