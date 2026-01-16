/**
 * Directus API Client for UAN Theming System
 */

import type {
    Site,
    Theme,
    Page,
    Block,
    NavigationItem,
    SiteData,
    DirectusResponse
} from '../types/directus';

// Directus base URL - can be overridden via env
const DIRECTUS_URL = typeof window !== 'undefined'
    ? (window as { __DIRECTUS_URL__?: string }).__DIRECTUS_URL__ || 'https://aianumpuli.uans.us'
    : process.env.DIRECTUS_URL || 'https://aianumpuli.uans.us';

/**
 * Get current subdomain from hostname
 */
export function getSubdomain(): string {
    if (typeof window === 'undefined') return 'uans.us';

    const hostname = window.location.hostname;

    // Handle localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return localStorage.getItem('__dev_subdomain__') || 'uans.us';
    }

    return hostname;
}

/**
 * Fetch with error handling
 */
async function fetchDirectus<T>(path: string): Promise<T | null> {
    try {
        const res = await fetch(`${DIRECTUS_URL}${path}`);
        if (!res.ok) return null;
        const json: DirectusResponse<T> = await res.json();
        return json.data;
    } catch (error) {
        console.error(`[Directus] Failed to fetch ${path}:`, error);
        return null;
    }
}

/**
 * Fetch site by domain
 */
export async function getSiteByDomain(domain: string): Promise<Site | null> {
    const sites = await fetchDirectus<Site[]>(
        `/items/sites?filter[domain][_eq]=${encodeURIComponent(domain)}&filter[enabled][_eq]=true&fields=*,theme.*,default_template.*,logo.*`
    );
    return sites?.[0] || null;
}

/**
 * Fetch theme by ID
 */
export async function getTheme(id: string): Promise<Theme | null> {
    return fetchDirectus<Theme>(
        `/items/themes/${id}?fields=*,preview_image.*`
    );
}

/**
 * Fetch pages for a site
 */
export async function getSitePages(siteId: string): Promise<Page[]> {
    const pages = await fetchDirectus<Page[]>(
        `/items/pages?filter[site][_eq]=${siteId}&filter[published][_eq]=true&fields=*,blocks.*,template.*&sort=slug`
    );
    return pages || [];
}

/**
 * Fetch single page by site and slug
 */
export async function getPage(siteId: string, slug: string): Promise<Page | null> {
    const pages = await fetchDirectus<Page[]>(
        `/items/pages?filter[site][_eq]=${siteId}&filter[slug][_eq]=${slug}&filter[published][_eq]=true&fields=*,blocks.*.*,template.*`
    );
    return pages?.[0] || null;
}

/**
 * Fetch navigation for a site
 */
export async function getNavigation(siteId: string): Promise<NavigationItem[]> {
    const items = await fetchDirectus<NavigationItem[]>(
        `/items/navigation?filter[site][_eq]=${siteId}&sort=sort&fields=*`
    );
    return items || [];
}

/**
 * Fetch blocks for a page
 */
export async function getBlocks(pageId: string): Promise<Block[]> {
    const blocks = await fetchDirectus<Block[]>(
        `/items/blocks?filter[page][_eq]=${pageId}&sort=order&fields=*,media.*`
    );
    return blocks || [];
}

/**
 * Fetch complete site data for current subdomain
 */
export async function fetchSiteData(domain?: string): Promise<SiteData | null> {
    const targetDomain = domain || getSubdomain();

    // Fetch site with embedded theme
    const site = await getSiteByDomain(targetDomain);
    if (!site) {
        console.warn(`[Directus] Site not found for domain: ${targetDomain}`);
        return null;
    }

    // Extract theme (may be embedded or need separate fetch)
    let theme: Theme;
    if (typeof site.theme === 'object' && site.theme !== null) {
        theme = site.theme;
    } else if (typeof site.theme === 'string') {
        const fetchedTheme = await getTheme(site.theme);
        if (!fetchedTheme) {
            console.warn(`[Directus] Theme not found: ${site.theme}`);
            return null;
        }
        theme = fetchedTheme;
    } else {
        // Use default theme
        theme = getDefaultTheme();
    }

    // Fetch pages and navigation
    const [pages, navigation] = await Promise.all([
        getSitePages(site.id),
        getNavigation(site.id),
    ]);

    return { site, theme, pages, navigation };
}

/**
 * Default UAN theme
 */
export function getDefaultTheme(): Theme {
    return {
        id: 'default',
        name: 'UAN Default',
        description: 'Default United American Nations theme',
        font_family: 'Inter, system-ui, sans-serif',
        css_vars: {
            primary: '#1A1A1A',
            secondary: '#D4C4A8',
            accent: '#B8860B',
            background: '#FAFAFA',
            foreground: '#1A1A1A',
            muted: '#8B7355',
            border: '#D4C4A8',
            ring: '#B8860B',
        },
        dark_mode_vars: {
            primary: '#FAFAFA',
            secondary: '#2A2A2A',
            accent: '#D4AF37',
            background: '#1A1A1A',
            foreground: '#FAFAFA',
            muted: '#A89078',
            border: '#3A3A3A',
            ring: '#D4AF37',
        },
        button_style: {
            border_radius: '8px',
            border_width: '1px',
            shadow: 'md',
            font_weight: '500',
        },
    };
}

/**
 * Get file URL from Directus
 */
export function getFileUrl(fileId: string): string {
    return `${DIRECTUS_URL}/assets/${fileId}`;
}
