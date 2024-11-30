// hooks/useDemandsByUser.ts
import { useState } from 'react';
import { apiRequest } from '../utils/api';

interface Demande {
    userId: string;
    requestType: string;
    createdAt: string;
    updatedAt: string;
}

const useDemandsByUser = (userId: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [demands, setDemands] = useState<Demande[]>([]);

    const getDemands = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiRequest<Demande[]>(`/post/user/${userId}`);
            setDemands(response);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        getDemands,
        demands,
        loading,
        error,
    };
};

export default useDemandsByUser;
