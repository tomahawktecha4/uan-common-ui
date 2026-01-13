/**
 * UAN Common Utilities
 */

import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names with clsx
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Format a date in UAN standard format
 */
export function formatDate(date: Date | string, locale = 'en-US'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
}

/**
 * Generate a SHA256 hash (browser-compatible)
 */
export async function sha256(message: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Format a Sacred ID number
 */
export function formatSacredID(id: string): string {
    // Format: UAN-XXXX-XXXX-XXXX
    const clean = id.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (clean.length !== 12) return id;
    return `UAN-${clean.slice(0, 4)}-${clean.slice(4, 8)}-${clean.slice(8, 12)}`;
}

/**
 * Check if running in browser
 */
export function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

/**
 * Get environment variable with fallback
 */
export function getEnv(key: string, fallback = ''): string {
    if (isBrowser()) {
        return (window as any).__ENV__?.[key] ?? fallback;
    }
    return process.env[key] ?? fallback;
}

/**
 * Theme configuration per domain
 */
export const DOMAIN_THEMES = {
    'uans.us': 'default',
    'wampum.uans.us': 'wampum',
    'verify.uans.us': 'verify',
    'id.uans.us': 'id',
    'mint.uans.us': 'mint',
    'chain.uans.us': 'chain',
} as const;

/**
 * Get theme name from hostname
 */
export function getThemeFromHostname(hostname: string): string {
    return DOMAIN_THEMES[hostname as keyof typeof DOMAIN_THEMES] ?? 'default';
}
