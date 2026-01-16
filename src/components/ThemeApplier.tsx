/**
 * ThemeApplier - Injects CSS variables from Directus theme
 */

import { useEffect, useState, createContext, useContext } from 'react';
import type { Theme, CSSVariables } from '../types/directus';
import { getDefaultTheme } from '../lib/directusClient';

// Theme Context
interface ThemeContextValue {
    theme: Theme;
    isDarkMode: boolean;
    setDarkMode: (dark: boolean) => void;
    cssVars: CSSVariables;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

interface ThemeProviderProps {
    theme?: Theme;
    children: React.ReactNode;
    defaultDarkMode?: boolean;
}

/**
 * ThemeProvider - Wraps app and provides theme context
 */
export function ThemeProvider({ theme, children, defaultDarkMode = false }: ThemeProviderProps) {
    const [activeTheme] = useState<Theme>(theme || getDefaultTheme());
    const [isDarkMode, setIsDarkMode] = useState(defaultDarkMode);

    // Get current CSS vars based on mode
    const cssVars = isDarkMode && activeTheme.dark_mode_vars
        ? { ...activeTheme.css_vars, ...activeTheme.dark_mode_vars }
        : activeTheme.css_vars;

    // Check system preference on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem('uan-dark-mode');
        if (stored !== null) {
            setIsDarkMode(stored === 'true');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
        }
    }, []);

    // Persist dark mode preference
    const setDarkMode = (dark: boolean) => {
        setIsDarkMode(dark);
        localStorage.setItem('uan-dark-mode', String(dark));
    };

    return (
        <ThemeContext.Provider value={{ theme: activeTheme, isDarkMode, setDarkMode, cssVars }}>
            <ThemeApplier theme={activeTheme} isDarkMode={isDarkMode}>
                {children}
            </ThemeApplier>
        </ThemeContext.Provider>
    );
}

interface ThemeApplierProps {
    theme: Theme;
    isDarkMode?: boolean;
    children: React.ReactNode;
}

/**
 * ThemeApplier - Applies CSS variables to document root
 */
export function ThemeApplier({ theme, isDarkMode = false, children }: ThemeApplierProps) {
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const root = document.documentElement;
        const vars = isDarkMode && theme.dark_mode_vars
            ? { ...theme.css_vars, ...theme.dark_mode_vars }
            : theme.css_vars;

        // Apply CSS variables
        Object.entries(vars).forEach(([key, value]) => {
            if (value) {
                root.style.setProperty(`--uan-${key}`, value);
            }
        });

        // Apply font family
        if (theme.font_family) {
            root.style.setProperty('--uan-font-family', theme.font_family);
        }

        // Apply button styles
        if (theme.button_style) {
            root.style.setProperty('--uan-btn-radius', theme.button_style.border_radius);
            root.style.setProperty('--uan-btn-border', theme.button_style.border_width);
            root.style.setProperty('--uan-btn-shadow', theme.button_style.shadow);
            root.style.setProperty('--uan-btn-weight', theme.button_style.font_weight);
        }

        // Set dark mode class
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Cleanup
        return () => {
            Object.keys(vars).forEach(key => {
                root.style.removeProperty(`--uan-${key}`);
            });
        };
    }, [theme, isDarkMode]);

    return <>{children}</>;
}

/**
 * DarkModeToggle - Button to toggle dark mode
 */
export function DarkModeToggle() {
    const { isDarkMode, setDarkMode } = useTheme();

    return (
        <button
            onClick={() => setDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-uan-muted/20 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
}

export default ThemeApplier;
