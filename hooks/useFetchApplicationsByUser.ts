import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

interface Application {
    userId: string;
    jobId: string;
    coverLetter?: string;
    resumeLink?: string;
    status?: string;
    appliedAt?: string;
    _id: string;
    updatedAt?: string;
}

const useFetchApplicationsByUser = (userId: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Application[] | null>(null);

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiRequest<Application[]>(`/applications/user/${userId}`, 'GET');
            setData(response);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [userId]);

    return { data, loading, error, refetch: fetchApplications };
};

export default useFetchApplicationsByUser;
