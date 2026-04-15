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
  addDonor: (donor: any) => Promise<void>;
  addRecipient: (recipient: any) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

const API = import.meta.env.VITE_API_URL;

export function DataProvider({ children }: { children: ReactNode }) {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  // =========================
  // FETCH DATA
  // =========================
  const fetchDonors = async () => {
    const res = await fetch(`${API}/api/donors`);
    const result = await res.json();
    if (result.success) setDonors(result.data);
  };

  const fetchRecipients = async () => {
    const res = await fetch(`${API}/api/recipients`);
    const result = await res.json();
    if (result.success) setRecipients(result.data);
  };

  const refreshData = async () => {
    await Promise.all([fetchDonors(), fetchRecipients()]);
  };

  // =========================
  // ADD DONOR
  // =========================
  const addDonor = async (donor: any) => {
    await fetch(`${API}/api/donors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(donor)
    });

    await fetchDonors();
  };

  // =========================
  // ADD RECIPIENT
  // =========================
  const addRecipient = async (recipient: any) => {
    await fetch(`${API}/api/recipients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipient)
    });

    await fetchRecipients();
  };

  // =========================
  // LOAD ON START
  // =========================
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <DataContext.Provider value={{ donors, recipients, addDonor, addRecipient, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
