const API = "https://ai-organ-matching-system.onrender.com";

export const api = {
  async getRecipients() {
    const res = await fetch(`${API}/api/recipients`);
    const result = await res.json();

    if (!result.success) throw new Error("Failed recipients");
    return result.data;
  },

  async getMatch(recipientId: number) {
    const res = await fetch(`${API}/api/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ recipient_id: recipientId })
    });

    const result = await res.json();

    if (!result.success) throw new Error("Match failed");
    return result.data;
  }
};
