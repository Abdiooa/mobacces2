import { useState } from 'react';
import { apiRequest } from '../utils/api';

interface CreateApplicationParams {
    userId: string;
    jobId: string;
    coverLetter?: string;
    resumeLink?: string;
}

interface Application {
    userId: string;
    jobId: string;
    coverLetter?: string;
    resumeLink?: string;
    status?: string;
    appliedAt?: string;
    updatedAt?: string;
}

const useCreateApplication = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Application | null>(null);

    const createApplication = async (params: CreateApplicationParams) => {
        setLoading(true);
        setError(null);
        try {
            console.log(params);
            const response = await apiRequest<Application>('/applications', 'POST', params);
            setData(response);
            console.log(response);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { createApplication, data, loading, error };
};

export default useCreateApplication;
