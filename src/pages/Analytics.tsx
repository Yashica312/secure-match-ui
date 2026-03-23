import { useMemo } from "react";
import { donors, recipients } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";

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
    donors.forEach((d) => (counts[d.organ] = (counts[d.organ] || 0) + 1));
    return Object.entries(counts).map(([organ, count]) => ({ organ, count }));
  }, []);

  const bloodGroupDist = useMemo(() => {
    const counts: Record<string, number> = {};
    [...donors, ...recipients].forEach((p) => (counts[p.bloodGroup] = (counts[p.bloodGroup] || 0) + 1));
    return Object.entries(counts)
      .map(([group, count]) => ({ group, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Donors Chart */}
      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h2 className="text-sm font-semibold text-foreground mb-1">Top Donors by Match Score</h2>
        <p className="text-xs text-muted-foreground mb-6">Horizontal bar chart — best donor highlighted</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={donorScoreData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" horizontal={false} />
              <XAxis type="number" domain={[60, 100]} tick={{ fontSize: 11, fill: "hsl(215, 14%, 50%)" }} />
              <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 11, fill: "hsl(215, 14%, 50%)" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(214, 20%, 90%)",
                  boxShadow: "var(--shadow-card)",
                  fontSize: "12px",
                }}
                formatter={(value: number, _: string, props: any) => [`${value}%`, props.payload.full]}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                {donorScoreData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={index === 0 ? "hsl(174, 72%, 35%)" : "hsl(174, 72%, 40%)"}
                    fillOpacity={index === 0 ? 1 : 0.5}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Organ Distribution */}
        <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Donor Organ Distribution</h2>
          <div className="space-y-3">
            {organDistribution.map((item) => (
              <div key={item.organ} className="flex items-center justify-between gap-3">
                <span className="text-sm text-foreground min-w-[60px]">{item.organ}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(item.count / donors.length) * 100}%` }}
                  />
                </div>
                <Badge variant="outline" className="font-mono text-xs w-8 justify-center shrink-0">
                  {item.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Group Distribution */}
        <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Blood Group Distribution</h2>
          <div className="space-y-3">
            {bloodGroupDist.map((item) => (
              <div key={item.group} className="flex items-center justify-between gap-3">
                <Badge variant="outline" className="font-mono text-xs min-w-[40px] justify-center">{item.group}</Badge>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(item.count / (donors.length + recipients.length)) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-medium w-6 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
