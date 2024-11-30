// utils/api.ts
export const API_URL = "http://10.0.2.2:5000"; // Ensure this is the correct backend URL

// Helper function to handle fetch calls
export const apiRequest = async <T>(url: string, method: string = 'GET', body?: object): Promise<T> => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const options: RequestInit = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${url}`, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Something went wrong');
        }

        return response.json(); // Return parsed JSON if the response is ok
    } catch (error) {
        console.error('API request failed:', error);
        throw error; // Throw the error to be handled by the calling function
    }
};
