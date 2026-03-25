import { useState, useMemo } from "react";
import { recipients, donors, matchExplanations } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";
import { TopMatchCard } from "@/components/TopMatchCard";
import { RecipientDetailCard } from "@/components/RecipientDetailCard";
import { DonorRankingTable } from "@/components/DonorRankingTable";

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
    <div className="space-y-5 max-w-[1200px]">
      {/* Recipient Selector */}
      <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2.5 block">
          Select Recipient
        </label>
        <Select value={selectedRecipientId} onValueChange={setSelectedRecipientId}>
          <SelectTrigger className="w-full max-w-md h-11 rounded-lg text-[13px]">
            <SelectValue placeholder="Choose a recipient to match..." />
          </SelectTrigger>
          <SelectContent>
            {recipients.map((r) => (
              <SelectItem key={r.id} value={r.id.toString()} className="text-[13px]">
                <span className="font-medium">{r.name}</span>
                <span className="text-muted-foreground ml-2">
                  Age {r.age} · {r.bloodGroup} · {r.organ} · {r.urgency}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedRecipient && (
        <div className="animate-fade-up space-y-5">
          {/* Recipient + Top Match */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RecipientDetailCard recipient={selectedRecipient} />
            {topDonor && (
              <TopMatchCard donor={topDonor} explanation={matchExplanations[topDonor.id]} />
            )}
          </div>

          {/* Ranked Table */}
          <DonorRankingTable donors={rankedDonors} />
        </div>
      )}

      {!selectedRecipient && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-4 border border-border">
            <Sparkles className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">Select a recipient to begin</p>
          <p className="text-[12px] text-muted-foreground max-w-xs leading-relaxed">
            Choose a patient from the dropdown above to see AI-ranked donor matches with compatibility analysis
          </p>
        </div>
      )}
    </div>
  );
};

export default Matching;
