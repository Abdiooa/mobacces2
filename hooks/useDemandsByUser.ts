// hooks/useDemandsByUser.ts
import { useState, useCallback } from "react";
import { apiRequest } from "../utils/api";

interface Demande {
  _id: number;
  userId: string;
  requestType: string;
  demandName: string;
  status: string;
  createdAt: string;
}

const useDemandsByUser = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demands, setDemands] = useState<Demande[]>([]);

  const getDemands = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest<Demande[]>(`/post/user/${userId}`);
      setDemands(response);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { getDemands, demands, loading, error };
};

export default useDemandsByUser;
