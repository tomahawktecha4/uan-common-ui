/**
 * DynamicPageRenderer - Fetches and renders a complete page from Directus
 */

import { useState, useEffect } from 'react';
import type { Page, SiteData, Block } from '../types/directus';
import { fetchSiteData, getPage } from '../lib/directusClient';
import { ThemeProvider } from './ThemeApplier';
import { BlockList } from './blocks/BlockRenderer';

interface DynamicPageRendererProps {
    slug?: string;
    domain?: string;
    fallback?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

/**
 * DynamicPageRenderer - Full page composition from Directus
 */
export function DynamicPageRenderer({
    slug = 'index',
    domain,
    fallback,
    header,
    footer
}: DynamicPageRendererProps) {
    const [siteData, setSiteData] = useState<SiteData | null>(null);
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            setError(null);

            try {
                // Fetch site data (includes theme)
                const data = await fetchSiteData(domain);
                if (!data) {
                    setError('Site not found');
                    setLoading(false);
                    return;
                }
                setSiteData(data);

                // Fetch specific page
                const pageData = await getPage(data.site.id, slug);
                setPage(pageData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load page');
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [slug, domain]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="text-4xl text-uan-accent animate-pulse">◈</span>
                    <p className="text-uan-muted mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !siteData) {
        return fallback || (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="text-4xl text-red-500">⚠</span>
                    <p className="text-uan-foreground mt-4">{error || 'Page not found'}</p>
                </div>
            </div>
        );
    }

    // Get blocks from page or use default
    const blocks: Block[] = page?.blocks
        ? (Array.isArray(page.blocks) ? page.blocks as Block[] : [])
        : [];

    return (
        <ThemeProvider theme={siteData.theme}>
            <SEOHead page={page} siteName={siteData.site.name} />
            <div className="min-h-screen flex flex-col">
                {header}
                <main className="flex-1">
                    {blocks.length > 0 ? (
                        <BlockList blocks={blocks} />
                    ) : (
                        <div className="container py-12 text-center text-uan-muted">
                            No content available
                        </div>
                    )}
                </main>
                {footer}
            </div>
        </ThemeProvider>
    );
}

/**
 * SEOHead - Injects page metadata
 */
function SEOHead({ page, siteName }: { page: Page | null; siteName: string }) {
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const title = page?.seo_title || page?.slug || siteName;
        document.title = `${title} | ${siteName}`;

        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', page?.seo_description || `${siteName} - Sovereign Identity`);

    }, [page, siteName]);

    return null;
}

/**
 * useSiteData - Hook for accessing site data
 */
export function useSiteData(domain?: string) {
    const [siteData, setSiteData] = useState<SiteData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSiteData(domain).then(data => {
            setSiteData(data);
            setLoading(false);
        });
    }, [domain]);

    return { siteData, loading };
}

export default DynamicPageRenderer;
