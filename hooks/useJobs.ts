// hooks/useJobs.ts
import { useState, useCallback } from "react";
import { apiRequest } from "../utils/api";

interface Job {
  _id: string;
  title: string;
  description: string;
  companyName: string;
  location: string;
  employmentType: string;
  requirements: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  accessibilityFeatures: string[];
  applicationDeadline: string;
  createdAt: string;
}

const useJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  const getJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest<Job[]>('/jobs');
      setJobs(response);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { getJobs, jobs, loading, error };
};

export default useJobs;
