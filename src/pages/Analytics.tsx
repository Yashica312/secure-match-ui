import { useMemo } from "react";
import { donors, recipients } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, PieChart as PieIcon } from "lucide-react";

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
    <div className="space-y-5 max-w-[1200px]">
      {/* Top Donors Chart */}
      <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-gradient-to-r from-card to-muted/30">
          <TrendingUp className="h-4 w-4 text-primary" />
          <div>
            <h2 className="text-sm font-semibold text-foreground">Top Donors by Match Score</h2>
            <p className="text-[11px] text-muted-foreground">Best donor highlighted — horizontal bar chart</p>
          </div>
        </div>
        <div className="p-5">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donorScoreData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 92%)" horizontal={false} />
                <XAxis type="number" domain={[60, 100]} tick={{ fontSize: 11, fill: "hsl(215, 12%, 48%)" }} />
                <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 11, fill: "hsl(215, 12%, 48%)" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid hsl(215, 20%, 91%)",
                    boxShadow: "var(--shadow-card)",
                    fontSize: "12px",
                    fontFamily: "Inter",
                  }}
                  formatter={(value: number, _: string, props: any) => [`${value}%`, props.payload.full]}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={22}>
                  {donorScoreData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index === 0 ? "hsl(172, 66%, 38%)" : "hsl(172, 50%, 60%)"}
                      fillOpacity={index === 0 ? 1 : 0.45}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Organ Distribution */}
        <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-gradient-to-r from-card to-muted/30">
            <PieIcon className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Organ Distribution</h2>
          </div>
          <div className="p-5 space-y-3">
            {organDistribution.map((item) => (
              <div key={item.organ} className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-medium text-foreground min-w-[60px]">{item.organ}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                    style={{ width: `${(item.count / donors.length) * 100}%` }}
                  />
                </div>
                <Badge variant="outline" className="font-mono text-[11px] w-8 justify-center shrink-0 bg-muted/50">
                  {item.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Group Distribution */}
        <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-gradient-to-r from-card to-muted/30">
            <PieIcon className="h-4 w-4 text-warning" />
            <h2 className="text-sm font-semibold text-foreground">Blood Group Distribution</h2>
          </div>
          <div className="p-5 space-y-3">
            {bloodGroupDist.map((item) => (
              <div key={item.group} className="flex items-center justify-between gap-3">
                <Badge variant="outline" className="font-mono text-[11px] min-w-[42px] justify-center bg-muted/50">{item.group}</Badge>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-warning to-warning/70 transition-all duration-500"
                    style={{ width: `${(item.count / (donors.length + recipients.length)) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-muted-foreground font-mono font-medium w-6 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
