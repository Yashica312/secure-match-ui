import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";
import { TopMatchCard } from "@/components/TopMatchCard";
import { RecipientDetailCard } from "@/components/RecipientDetailCard";
import { DonorRankingTable } from "@/components/DonorRankingTable";
import { MatchChart } from "@/components/MatchChart";

const urgencyLabel = (value: number) => {
  if (value >= 8) return "Critical";
  if (value >= 6) return "High";
  if (value >= 4) return "Medium";
  return "Low";
};

const toPercent = (value: number) =>
  value <= 1 ? Math.round(value * 100) : Math.round(value);

const mapRecipient = (r: any) => ({
  id: r.id,
  name: r.recipient_name,
  age: Number(r.recipient_age),
  bloodGroup: r.recipient_bg,
  organ: r.required_organ,
  urgency: urgencyLabel(Number(r.urgency_score)),
});

const mapDonor = (d: any, index: number) => ({
  id: index + 1,
  name: d.donor_name,
  age: Number(d.donor_age),
  bloodGroup: d.donor_bg,
  organ: d.donor_organ,
  score: toPercent(Number(d.predicted_score ?? 0)),
});

const Matching = () => {
  const [recipients, setRecipients] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [bestMatch, setBestMatch] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRecipientId, setSelectedRecipientId] = useState("");

  // ✅ LOAD RECIPIENTS
  useEffect(() => {
    api.getRecipients()
      .then((data) => setRecipients(data.map(mapRecipient)))
      .catch((err) => {
        console.error("Recipients error:", err);
      });
  }, []);

  const selectedRecipient = useMemo(
    () => recipients.find((r) => r.id.toString() === selectedRecipientId),
    [selectedRecipientId, recipients]
  );

  // ✅ MATCH FUNCTION
  const handleMatch = async (id: number) => {
    setLoading(true);
    try {
      const result = await api.getMatch(id);

      const mapped = result.matches.map(mapDonor);
      setMatches(mapped);
      setBestMatch(result.best_match ? mapDonor(result.best_match, 0) : null);

    } catch (err) {
      console.error("Match error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div className="rounded-xl border p-5">
        <label className="text-xs font-semibold mb-2 block">
          Select Recipient
        </label>

        <Select
          value={selectedRecipientId}
          onValueChange={(value) => {
            setSelectedRecipientId(value);
            handleMatch(Number(value));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a recipient..." />
          </SelectTrigger>

          <SelectContent>
            {recipients.map((r) => (
              <SelectItem key={r.id} value={r.id.toString()}>
                {r.name} — {r.organ}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {loading && <p className="mt-3 text-sm">Loading...</p>}
      </div>

      {selectedRecipient && (
        <>
          <RecipientDetailCard recipient={selectedRecipient} />
          {bestMatch && <TopMatchCard donor={bestMatch} />}
          {matches.length > 0 && <MatchChart donors={matches} />}
          <DonorRankingTable donors={matches} />
        </>
      )}

      {!selectedRecipient && (
        <div className="text-center py-20">
          <Sparkles className="mx-auto mb-4" />
          <p>Select a recipient to begin</p>
        </div>
      )}
    </div>
  );
};

export default Matching;
