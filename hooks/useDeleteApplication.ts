import { useState } from 'react';
import { apiRequest } from '../utils/api';

const useDeleteApplication = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteApplication = async (id: string) => {
        console.log("delete application entered");
        console.log(id);
        setLoading(true);
        setError(null);
        try {
            const response = await apiRequest(`/applications/${id}`, 'DELETE');
            console.log(response);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { deleteApplication, loading, error };
};

export default useDeleteApplication;
