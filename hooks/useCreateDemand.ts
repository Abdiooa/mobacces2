// hooks/useCreateDemand.ts
import { useState } from 'react';
import { apiRequest } from '../utils/api';

interface CreateDemandParams {
    userId: string;
    requestType: string;
}

interface CreateDemandResponse {
    userId: string;
    requestType: string;
    createdAt: string;
    updatedAt: string;
}

const useCreateDemand = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<CreateDemandResponse | null>(null);

    const createDemand = async ({ userId, requestType }: CreateDemandParams) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiRequest<CreateDemandResponse>('/post', 'POST', { userId, requestType });
            setData(response);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        createDemand,
        data,
        loading,
        error,
    };
};

export default useCreateDemand;
