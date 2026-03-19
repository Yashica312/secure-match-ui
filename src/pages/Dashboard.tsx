import { Users, Heart, GitCompareArrows, AlertTriangle, Activity, Clock } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { stats, recipients, donors } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const urgencyColor: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-orange-100 text-orange-700 border-orange-200",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of the organ matching system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard title="Total Donors" value={stats.totalDonors} icon={Heart} trend="+2 this week" />
        <StatsCard title="Total Recipients" value={stats.totalRecipients} icon={Users} />
        <StatsCard title="Matches Completed" value={stats.matchesCompleted} icon={GitCompareArrows} description="Out of 5 pending" />
        <StatsCard title="Critical Cases" value={stats.criticalCases} icon={AlertTriangle} />
        <StatsCard title="Avg Match Score" value={`${stats.avgMatchScore}%`} icon={Activity} />
        <StatsCard title="Pending Matches" value={stats.pendingMatches} icon={Clock} />
      </div>

      {/* Recent Recipients */}
      <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recipients Awaiting Match</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Age</th>
                <th className="pb-3 font-medium">Blood Group</th>
                <th className="pb-3 font-medium">Organ</th>
                <th className="pb-3 font-medium">Urgency</th>
                <th className="pb-3 font-medium">Wait (days)</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((r) => (
                <tr key={r.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-medium text-foreground">{r.name}</td>
                  <td className="py-3 text-muted-foreground">{r.age}</td>
                  <td className="py-3">
                    <Badge variant="outline" className="font-mono">{r.bloodGroup}</Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{r.organ}</td>
                  <td className="py-3">
                    <Badge className={urgencyColor[r.urgency]} variant="outline">{r.urgency}</Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{r.waitTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Donors */}
      <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h2 className="text-lg font-semibold text-foreground mb-4">Available Donors</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Age</th>
                <th className="pb-3 font-medium">Blood Group</th>
                <th className="pb-3 font-medium">Organ</th>
                <th className="pb-3 font-medium">HLA Match %</th>
                <th className="pb-3 font-medium">Location</th>
              </tr>
            </thead>
            <tbody>
              {donors.slice(0, 5).map((d) => (
                <tr key={d.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 font-medium text-foreground">{d.name}</td>
                  <td className="py-3 text-muted-foreground">{d.age}</td>
                  <td className="py-3">
                    <Badge variant="outline" className="font-mono">{d.bloodGroup}</Badge>
                  </td>
                  <td className="py-3 text-muted-foreground">{d.organ}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${d.hlaMatch}%` }} />
                      </div>
                      <span className="text-muted-foreground">{d.hlaMatch}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{d.location}</td>
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
