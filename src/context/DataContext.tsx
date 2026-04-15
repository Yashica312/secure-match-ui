import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Donor {
  id: number;
  donor_name: string;
  donor_age: number;
  donor_bg: string;
  donor_organ: string;
  health_score: number;
  distance: number;
}

interface Recipient {
  id: number;
  recipient_name: string;
  recipient_age: number;
  recipient_bg: string;
  required_organ: string;
  urgency_score: number;
}

interface DataContextType {
  donors: Donor[];
  recipients: Recipient[];
  loading: boolean;
  error: string | null;
  addDonor: (donor: any) => Promise<void>;
  addRecipient: (recipient: any) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

// 🔥 HARD-CODED API (NO ENV ISSUES)
const API = "https://ai-organ-matching-system.onrender.com";

export function DataProvider({ children }: { children: ReactNode }) {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =========================
  // FETCH DONORS
  // =========================
  const fetchDonors = async () => {
    try {
      const res = await fetch(`${API}/api/donors`);
      const result = await res.json();

      if (result.success) {
        setDonors(result.data || []);
      } else {
        throw new Error(result.error?.message || "Failed to fetch donors");
      }
    } catch (err: any) {
      console.error("Donor fetch error:", err);
      setError("Failed to fetch donors");
    }
  };

  // =========================
  // FETCH RECIPIENTS
  // =========================
  const fetchRecipients = async () => {
    try {
      const res = await fetch(`${API}/api/recipients`);
      const result = await res.json();

      console.log("Recipients API response:", result); // 🔍 DEBUG

      if (result.success) {
        setRecipients(result.data || []);
      } else {
        throw new Error(result.error?.message || "Failed to fetch recipients");
      }
    } catch (err: any) {
      console.error("Recipient fetch error:", err);
      setError("Failed to fetch recipients");
    }
  };

  // =========================
  // REFRESH BOTH
  // =========================
  const refreshData = async () => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all([fetchDonors(), fetchRecipients()]);
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD DONOR
  // =========================
  const addDonor = async (donor: any) => {
    try {
      const res = await fetch(`${API}/api/donors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(donor)
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error?.message || "Failed to add donor");
      }

      await fetchDonors();
    } catch (err) {
      console.error("Add donor error:", err);
    }
  };

  // =========================
  // ADD RECIPIENT
  // =========================
  const addRecipient = async (recipient: any) => {
    try {
      const res = await fetch(`${API}/api/recipients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recipient)
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error?.message || "Failed to add recipient");
      }

      await fetchRecipients();
    } catch (err) {
      console.error("Add recipient error:", err);
    }
  };

  // =========================
  // LOAD ON START
  // =========================
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        donors,
        recipients,
        loading,
        error,
        addDonor,
        addRecipient,
        refreshData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
