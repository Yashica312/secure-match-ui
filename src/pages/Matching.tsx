import { useEffect, useState } from "react";

const API = "https://ai-organ-matching-system.onrender.com";

const Matching = () => {
  const [recipients, setRecipients] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState("");

  // LOAD RECIPIENTS
  useEffect(() => {
    fetch(`${API}/api/recipients`)
      .then(res => res.json())
      .then(data => {
        console.log("Recipients API response:", data);
        setRecipients(data.data || []);
      })
      .catch(err => console.error(err));
  }, []);

  // MATCH FUNCTION
  const handleMatch = async (id: string) => {
    setSelectedId(id);

    try {
      const res = await fetch(`${API}/api/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ recipient_id: Number(id) })
      });

      const data = await res.json();
      setMatches(data.data?.matches || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Matching</h2>

      <select
        value={selectedId}
        onChange={(e) => handleMatch(e.target.value)}
      >
        <option value="">Select recipient</option>
        {recipients.map((r) => (
          <option key={r.id} value={r.id}>
            {r.recipient_name} ({r.required_organ})
          </option>
        ))}
      </select>

      <h3>Matches</h3>
      <ul>
        {matches.map((m, i) => (
          <li key={i}>
            {m.donor_name} - {m.donor_organ} - Score: {m.predicted_score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matching;
