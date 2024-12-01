import { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

interface Application {
    userId: string;
    jobId: string;
    coverLetter?: string;
    resumeLink?: string;
    status?: string;
    appliedAt?: string;
    updatedAt?: string;
}

const useFetchApplicationById = (id: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Application | null>(null);

    const fetchApplication = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiRequest<Application>(`/applications/${id}`, 'GET');
            setData(response);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplication();
    }, [id]);

    return { data, loading, error, refetch: fetchApplication };
};

export default useFetchApplicationById;
