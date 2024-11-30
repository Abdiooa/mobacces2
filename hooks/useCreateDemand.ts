import { useState } from 'react';
import { apiRequest } from '../utils/api';

interface CreateDemandParams {
    userId: string;
    demandName: string;
    requestType: string;
    demandDescription: string; // Added demandDescription here
    requiredDocuments: string;
}

interface CreateDemandResponse {
    userId: string;
    requestType: string;
    demandName: string;
    demandDescription: string;
    requiredDocuments: string;
    createdAt: string;
    updatedAt: string;
}

const useCreateDemand = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<CreateDemandResponse | null>(null);

    const createDemand = async ({ userId, demandName, requestType, demandDescription, requiredDocuments }: CreateDemandParams) => {
        setLoading(true);
        setError(null);
        console.log(userId);
        console.log(requestType);
        console.log(demandName);
        console.log(demandDescription);
        console.log(requiredDocuments);

        try {
            const response = await apiRequest<CreateDemandResponse>('/post', 'POST', {
                userId,
                demandName,
                requestType,
                demandDescription, // Pass demandDescription to the API
                requiredDocuments, // Pass requiredDocuments to the API
            });
            setData(response);
            console.log(response);
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
