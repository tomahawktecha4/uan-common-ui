/**
 * UAN API client for Payload CMS
 */

export interface PayloadConfig {
    baseUrl: string;
    token?: string;
}

export class UanApiClient {
    private baseUrl: string;
    private token?: string;

    constructor(config: PayloadConfig) {
        this.baseUrl = config.baseUrl;
        this.token = config.token;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token) {
            (headers as Record<string, string>)['Authorization'] = `JWT ${this.token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return response.json();
    }

    // Sacred IDs
    async getSacredIDs(params?: Record<string, string>) {
        const query = params ? `?${new URLSearchParams(params)}` : '';
        return this.request(`/api/sacred-ids${query}`);
    }

    async getSacredID(id: string) {
        return this.request(`/api/sacred-ids/${id}`);
    }

    async verifySacredID(hash: string) {
        return this.request(`/api/sacred-ids?where[hash][equals]=${hash}`);
    }

    // Declarations
    async getDeclarations(params?: Record<string, string>) {
        const query = params ? `?${new URLSearchParams(params)}` : '';
        return this.request(`/api/sacred-declarations${query}`);
    }

    async getDeclaration(id: string) {
        return this.request(`/api/sacred-declarations/${id}`);
    }

    // Jurisdictions
    async getJurisdictions() {
        return this.request('/api/jurisdictions');
    }

    // Site Settings
    async getSiteSettings() {
        return this.request('/api/globals/site-settings');
    }

    // Pages
    async getPages(domain: string) {
        return this.request(`/api/pages?where[domain][equals]=${domain}`);
    }

    async getPage(domain: string, path: string) {
        return this.request(
            `/api/pages?where[domain][equals]=${domain}&where[path][equals]=${path}`
        );
    }

    // Auth
    setToken(token: string) {
        this.token = token;
    }

    clearToken() {
        this.token = undefined;
    }
}

/**
 * Create a configured API client
 */
export function createApiClient(baseUrl: string, token?: string): UanApiClient {
    return new UanApiClient({ baseUrl, token });
}

export default UanApiClient;
