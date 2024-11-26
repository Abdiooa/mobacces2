import React, { useState } from 'react';
import axios, { AxiosRequestConfig } from "axios";

interface UseMobileIDAuthProps {
  endpoint: string;
  body: Record<string, any>;
  headers?: Record<string, any>;
}

const useMobileIDAuth = ({ endpoint, body, headers = {} }: UseMobileIDAuthProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<string | null>(null);

  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  const options: AxiosRequestConfig = {
    method: "POST",
    url: endpoint,
    headers: finalHeaders,
    data: body,
  };

  const authenticate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.request(options);
      setData(response.data);
      setStatus(response.data.status);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = (newBody: Record<string, any> = body, newHeaders: Record<string, string> = headers) => {
    options.data = newBody;
    options.headers = { ...finalHeaders, ...newHeaders };
    authenticate();
  };

  return { data, isLoading, error, refetch };
};

export default useMobileIDAuth;
