// utils/api.ts
export const API_URL = "http://localhost:5000"; // Change this URL to your actual API URL

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

    const response = await fetch(`${API_URL}${url}`, options);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
    }

    return response.json();
};
