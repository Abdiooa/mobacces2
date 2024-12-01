import { useState } from 'react';
import { apiRequest } from '../utils/api';

interface UpdateApplicationParams {
    id: string;
    status: 'pending' | 'accepted' | 'rejected';
}

interface Application {
    userId: string;
    jobId: string;
    coverLetter?: string;
    resumeLink?: string;
    status: string;
    appliedAt?: string;
    updatedAt?: string;
}

const useUpdateApplicationStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Application | null>(null);

    const updateApplicationStatus = async ({ id, status }: UpdateApplicationParams) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiRequest<Application>(`/applications/${id}`, 'PUT', { status });
            setData(response);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { updateApplicationStatus, data, loading, error };
};

export default useUpdateApplicationStatus;
