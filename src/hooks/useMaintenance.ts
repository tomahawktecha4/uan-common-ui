import { useState, useEffect } from 'react';

interface MaintenanceStatus {
    isEnabled: boolean;
    message?: string;
    estimatedReturn?: string;
}

interface UseMaintenanceOptions {
    /** Check maintenance status from API */
    apiUrl?: string;
    /** Local environment variable override */
    envOverride?: boolean;
    /** Polling interval in ms (0 to disable) */
    pollInterval?: number;
}

/**
 * Hook to check if site is in maintenance mode
 * Checks both local env and remote API
 */
export function useMaintenance(options: UseMaintenanceOptions = {}) {
    const { apiUrl, envOverride, pollInterval = 0 } = options;

    const [status, setStatus] = useState<MaintenanceStatus>({
        isEnabled: envOverride ?? false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If env override is set, use it immediately
        if (envOverride !== undefined) {
            setStatus({ isEnabled: envOverride });
            return;
        }

        // If no API URL, return
        if (!apiUrl) return;

        const checkMaintenance = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiUrl}/api/globals/site-settings`);
                if (response.ok) {
                    const data = await response.json();
                    setStatus({
                        isEnabled: data.maintenanceMode ?? false,
                        message: data.maintenanceMessage,
                        estimatedReturn: data.maintenanceReturn,
                    });
                }
            } catch {
                // On error, default to not in maintenance
                setStatus({ isEnabled: false });
            } finally {
                setLoading(false);
            }
        };

        checkMaintenance();

        // Set up polling if enabled
        if (pollInterval > 0) {
            const interval = setInterval(checkMaintenance, pollInterval);
            return () => clearInterval(interval);
        }
    }, [apiUrl, envOverride, pollInterval]);

    return { ...status, loading };
}

export default useMaintenance;
