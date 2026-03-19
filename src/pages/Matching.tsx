import { useState, useMemo } from "react";
import { recipients, donors, matchExplanations, Donor } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trophy, User, Droplets, MapPin, Activity, Lightbulb } from "lucide-react";

const urgencyColor: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-orange-100 text-orange-700 border-orange-200",
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Donor-Recipient Matching</h1>
        <p className="text-sm text-muted-foreground mt-1">Select a recipient to find the best matching donors</p>
      </div>

      {/* Recipient Selector */}
      <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <label className="text-sm font-medium text-foreground mb-3 block">Select Recipient</label>
        <Select value={selectedRecipientId} onValueChange={setSelectedRecipientId}>
          <SelectTrigger className="w-full max-w-md h-11 rounded-xl">
            <SelectValue placeholder="Choose a recipient..." />
          </SelectTrigger>
          <SelectContent>
            {recipients.map((r) => (
              <SelectItem key={r.id} value={r.id.toString()}>
                {r.name} — {r.organ} ({r.bloodGroup})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedRecipient && (
        <>
          {/* Recipient Details */}
          <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Recipient Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: User, label: "Name", value: selectedRecipient.name },
                { icon: Activity, label: "Age", value: selectedRecipient.age },
                { icon: Droplets, label: "Blood Group", value: selectedRecipient.bloodGroup },
                { icon: Activity, label: "Organ Needed", value: selectedRecipient.organ },
                { icon: MapPin, label: "Location", value: selectedRecipient.location },
                { icon: Activity, label: "Urgency", value: selectedRecipient.urgency },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <item.icon className="h-3 w-3" />
                    {item.label}
                  </p>
                  {item.label === "Urgency" ? (
                    <Badge className={urgencyColor[item.value]} variant="outline">{item.value}</Badge>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top Donor Highlight */}
          {topDonor && (
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Best Match — {topDonor.name}</h2>
                <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
                  Score: {topDonor.score}%
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Blood Group</p>
                  <p className="text-sm font-medium text-foreground">{topDonor.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">HLA Match</p>
                  <p className="text-sm font-medium text-foreground">{topDonor.hlaMatch}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Age</p>
                  <p className="text-sm font-medium text-foreground">{topDonor.age}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{topDonor.location}</p>
                </div>
              </div>
              {matchExplanations[topDonor.id] && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-card border border-border">
                  <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">{matchExplanations[topDonor.id]}</p>
                </div>
              )}
            </div>
          )}

          {/* Ranked Donors Table */}
          <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <h2 className="text-lg font-semibold text-foreground mb-4">Ranked Donors</h2>
            {rankedDonors.length === 0 ? (
              <p className="text-sm text-muted-foreground">No compatible donors found for this recipient.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-3 font-medium">Rank</th>
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Age</th>
                      <th className="pb-3 font-medium">Blood Group</th>
                      <th className="pb-3 font-medium">HLA Match</th>
                      <th className="pb-3 font-medium">Location</th>
                      <th className="pb-3 font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankedDonors.map((d, i) => (
                      <tr
                        key={d.id}
                        className={`border-b border-border/50 last:border-0 ${i === 0 ? "bg-primary/5" : ""}`}
                      >
                        <td className="py-3">
                          {i === 0 ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                          ) : (
                            <span className="text-muted-foreground pl-2">{i + 1}</span>
                          )}
                        </td>
                        <td className="py-3 font-medium text-foreground">{d.name}</td>
                        <td className="py-3 text-muted-foreground">{d.age}</td>
                        <td className="py-3">
                          <Badge variant="outline" className="font-mono">{d.bloodGroup}</Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${d.hlaMatch}%` }} />
                            </div>
                            <span className="text-muted-foreground">{d.hlaMatch}%</span>
                          </div>
                        </td>
                        <td className="py-3 text-muted-foreground">{d.location}</td>
                        <td className="py-3 font-semibold text-foreground">{d.score}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Matching;
