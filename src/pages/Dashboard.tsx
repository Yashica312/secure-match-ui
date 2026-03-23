import { Users, Heart, GitCompareArrows, AlertTriangle, Activity, Clock, ArrowRight } from "lucide-react";
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
    <div className="space-y-6 max-w-6xl">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard title="Total Donors" value={stats.totalDonors} icon={Heart} trend="+2 this week" accent="primary" />
        <StatsCard title="Total Recipients" value={stats.totalRecipients} icon={Users} accent="warning" />
        <StatsCard title="Matches Completed" value={stats.matchesCompleted} icon={GitCompareArrows} description="Out of 5 pending" accent="success" />
        <StatsCard title="Critical Cases" value={stats.criticalCases} icon={AlertTriangle} accent="destructive" />
        <StatsCard title="Avg Match Score" value={`${stats.avgMatchScore}%`} icon={Activity} accent="primary" />
        <StatsCard title="Pending Matches" value={stats.pendingMatches} icon={Clock} accent="warning" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Add Donor", desc: "Register a new organ donor", url: "/add-donor", icon: Heart },
          { label: "Add Recipient", desc: "Register a transplant recipient", url: "/add-recipient", icon: Users },
          { label: "Run Matching", desc: "Find optimal donor matches", url: "/matching", icon: GitCompareArrows },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.url)}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <action.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </button>
        ))}
      </div>

      {/* Recent Recipients */}
      <div className="rounded-xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Recipients Awaiting Match</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{recipients.length} patients in queue</p>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-primary" onClick={() => navigate("/matching")}>
            View All <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Patient</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blood</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Organ</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Urgency</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Wait</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((r) => (
                <tr key={r.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-medium text-foreground text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground">Age {r.age}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className="font-mono text-xs">{r.bloodGroup}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{r.organ}</td>
                  <td className="px-5 py-3.5">
                    <Badge className={`${urgencyColor[r.urgency]} text-xs`} variant="outline">{r.urgency}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{r.waitTime}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Donors */}
      <div className="rounded-xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Available Donors</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{donors.length} donors registered</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Donor</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blood</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Organ</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">HLA Match</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody>
              {donors.slice(0, 5).map((d) => (
                <tr key={d.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-medium text-foreground text-sm">{d.name}</p>
                      <p className="text-xs text-muted-foreground">Age {d.age}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline" className="font-mono text-xs">{d.bloodGroup}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{d.organ}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${d.hlaMatch}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{d.hlaMatch}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{d.location}</td>
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
