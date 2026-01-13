import { useState, useEffect } from 'react';

interface PayloadAPIConfig {
    baseUrl: string;
    token?: string;
}

interface PayloadResponse<T> {
    docs: T[];
    totalDocs: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface UsePayloadAPIOptions {
    enabled?: boolean;
    params?: Record<string, string>;
}

/**
 * Hook for fetching data from Payload CMS REST API
 */
export function usePayloadAPI<T>(
    collection: string,
    config: PayloadAPIConfig,
    options: UsePayloadAPIOptions = {}
) {
    const { enabled = true, params = {} } = options;
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [pagination, setPagination] = useState<{
        totalDocs: number;
        page: number;
        totalPages: number;
    } | null>(null);

    useEffect(() => {
        if (!enabled) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const queryParams = new URLSearchParams(params).toString();
                const url = `${config.baseUrl}/api/${collection}${queryParams ? `?${queryParams}` : ''}`;

                const headers: HeadersInit = {
                    'Content-Type': 'application/json',
                };

                if (config.token) {
                    headers['Authorization'] = `JWT ${config.token}`;
                }

                const response = await fetch(url, { headers });

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const result: PayloadResponse<T> = await response.json();
                setData(result.docs);
                setPagination({
                    totalDocs: result.totalDocs,
                    page: result.page,
                    totalPages: result.totalPages,
                });
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collection, config.baseUrl, config.token, enabled, JSON.stringify(params)]);

    const refetch = () => {
        setData(null);
        setError(null);
    };

    return { data, loading, error, pagination, refetch };
}

/**
 * Hook for fetching a single document from Payload CMS
 */
export function usePayloadDoc<T>(
    collection: string,
    id: string,
    config: PayloadAPIConfig,
    options: { enabled?: boolean } = {}
) {
    const { enabled = true } = options;
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!enabled || !id) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = `${config.baseUrl}/api/${collection}/${id}`;

                const headers: HeadersInit = {
                    'Content-Type': 'application/json',
                };

                if (config.token) {
                    headers['Authorization'] = `JWT ${config.token}`;
                }

                const response = await fetch(url, { headers });

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const result: T = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collection, id, config.baseUrl, config.token, enabled]);

    return { data, loading, error };
}

export default usePayloadAPI;
