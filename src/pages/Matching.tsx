import { useState, useMemo } from "react";
import { recipients, donors, matchExplanations } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, User, Droplets, MapPin, Activity, Lightbulb, Sparkles } from "lucide-react";

const urgencyColor: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-warning/10 text-warning border-warning/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const Matching = () => {
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>("");

  const selectedRecipient = useMemo(
    () => recipients.find((r) => r.id.toString() === selectedRecipientId),
    [selectedRecipientId]
  );

  const rankedDonors = useMemo(() => {
    if (!selectedRecipient) return [];
    return donors
      .filter((d) => d.organ === selectedRecipient.organ)
      .sort((a, b) => b.score - a.score);
  }, [selectedRecipient]);

  const topDonor = rankedDonors[0];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Recipient Selector */}
      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
          Select Recipient
        </label>
        <Select value={selectedRecipientId} onValueChange={setSelectedRecipientId}>
          <SelectTrigger className="w-full max-w-md h-11 rounded-lg">
            <SelectValue placeholder="Choose a recipient to match..." />
          </SelectTrigger>
          <SelectContent>
            {recipients.map((r) => (
              <SelectItem key={r.id} value={r.id.toString()}>
                {r.name} — {r.organ} ({r.bloodGroup}) · {r.urgency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedRecipient && (
        <>
          {/* Recipient + Top Match Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recipient Details */}
            <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Recipient Details</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Name", value: selectedRecipient.name },
                  { label: "Age", value: selectedRecipient.age },
                  { label: "Blood Group", value: selectedRecipient.bloodGroup },
                  { label: "Organ Needed", value: selectedRecipient.organ },
                  { label: "Location", value: selectedRecipient.location },
                  { label: "Wait Time", value: `${selectedRecipient.waitTime} days` },
                ].map((item) => (
                  <div key={item.label} className="space-y-0.5">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
                <div className="space-y-0.5 col-span-2">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Urgency</p>
                  <Badge className={`${urgencyColor[selectedRecipient.urgency]} text-xs`} variant="outline">
                    {selectedRecipient.urgency}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Top Match Card */}
            {topDonor && (
              <div className="rounded-xl border-2 border-primary/30 bg-accent p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground animate-pulse-glow">
                      <Trophy className="h-3.5 w-3.5" />
                    </div>
                    <h2 className="text-sm font-semibold text-foreground">Best Match</h2>
                    <Badge className="bg-primary/15 text-primary border-primary/25 ml-auto text-xs font-bold" variant="outline">
                      Score: {topDonor.score}%
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-3">{topDonor.name}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Droplets, label: "Blood", value: topDonor.bloodGroup },
                      { icon: Activity, label: "HLA Match", value: `${topDonor.hlaMatch}%` },
                      { icon: User, label: "Age", value: topDonor.age },
                      { icon: MapPin, label: "Location", value: topDonor.location },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <item.icon className="h-3.5 w-3.5 text-primary" />
                        <div>
                          <p className="text-[11px] text-muted-foreground">{item.label}</p>
                          <p className="text-xs font-semibold text-foreground">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {matchExplanations[topDonor.id] && (
                    <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-card border border-border">
                      <Lightbulb className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">{matchExplanations[topDonor.id]}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Ranked Donors Table */}
          <div className="rounded-xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center gap-2 p-5 border-b border-border">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Ranked Donors</h2>
              <span className="text-xs text-muted-foreground ml-1">({rankedDonors.length} compatible)</span>
            </div>
            {rankedDonors.length === 0 ? (
              <p className="p-5 text-sm text-muted-foreground">No compatible donors found for this recipient.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12">#</th>
                      <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Donor</th>
                      <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blood</th>
                      <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">HLA Match</th>
                      <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                      <th className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankedDonors.map((d, i) => (
                      <tr
                        key={d.id}
                        className={`border-b border-border/50 last:border-0 transition-colors ${
                          i === 0 ? "bg-accent/50" : "hover:bg-muted/30"
                        }`}
                      >
                        <td className="px-5 py-3.5">
                          {i === 0 ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                          ) : (
                            <span className="text-muted-foreground text-xs pl-1.5">{i + 1}</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          <div>
                            <p className="font-medium text-foreground">{d.name}</p>
                            <p className="text-xs text-muted-foreground">Age {d.age}</p>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge variant="outline" className="font-mono text-xs">{d.bloodGroup}</Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-14 rounded-full bg-muted overflow-hidden">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${d.hlaMatch}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground">{d.hlaMatch}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{d.location}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-sm font-bold ${i === 0 ? "text-primary" : "text-foreground"}`}>{d.score}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {!selectedRecipient && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <Sparkles className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Select a recipient to begin</p>
          <p className="text-xs text-muted-foreground max-w-xs">
            Choose a patient from the dropdown above to see AI-ranked donor matches
          </p>
        </div>
      )}
    </div>
  );
};

export default Matching;
