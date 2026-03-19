import { useMemo } from "react";
import { donors, recipients } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";

const CHART_COLOR = "hsl(175, 84%, 32%)";
const CHART_COLOR_TOP = "hsl(175, 84%, 25%)";

const Analytics = () => {
  const donorScoreData = useMemo(
    () =>
      [...donors]
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map((d) => ({ name: d.name.split(" ")[0], score: d.score, full: d.name })),
    []
  );

  const organDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    donors.forEach((d) => {
      counts[d.organ] = (counts[d.organ] || 0) + 1;
    });
    return Object.entries(counts).map(([organ, count]) => ({ organ, count }));
  }, []);

  const bloodGroupDist = useMemo(() => {
    const counts: Record<string, number> = {};
    [...donors, ...recipients].forEach((p) => {
      counts[p.bloodGroup] = (counts[p.bloodGroup] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([group, count]) => ({ group, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Visualizations and insights from matching data</p>
      </div>

      {/* Top Donors Chart */}
      <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h2 className="text-lg font-semibold text-foreground mb-6">Top Donors by Match Score</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={donorScoreData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid hsl(214, 32%, 91%)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: "13px",
                }}
                formatter={(value: number, _: string, props: any) => [`${value}%`, props.payload.full]}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {donorScoreData.map((_, index) => (
                  <Cell key={index} fill={index === 0 ? CHART_COLOR_TOP : CHART_COLOR} fillOpacity={index === 0 ? 1 : 0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organ Distribution */}
        <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Donor Organ Distribution</h2>
          <div className="space-y-3">
            {organDistribution.map((item) => (
              <div key={item.organ} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.organ}</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(item.count / donors.length) * 100}%` }}
                    />
                  </div>
                  <Badge variant="outline" className="font-mono text-xs w-8 justify-center">
                    {item.count}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Group Distribution */}
        <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Blood Group Distribution</h2>
          <div className="space-y-3">
            {bloodGroupDist.map((item) => (
              <div key={item.group} className="flex items-center justify-between">
                <Badge variant="outline" className="font-mono">{item.group}</Badge>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(item.count / (donors.length + recipients.length)) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
