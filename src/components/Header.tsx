import React from 'react';

interface HeaderProps {
    siteName: string;
    logoSrc?: string;
    navLinks?: Array<{ label: string; href: string }>;
    showAuth?: boolean;
    onLogin?: () => void;
    onLogout?: () => void;
    isAuthenticated?: boolean;
}

/**
 * Shared header component with UAN branding
 */
export function Header({
    siteName,
    logoSrc,
    navLinks = [],
    showAuth = false,
    onLogin,
    onLogout,
    isAuthenticated = false,
}: HeaderProps) {
    return (
        <header className="bg-[var(--uan-primary)] text-[var(--uan-white)] border-b border-[var(--uan-earth)]">
            <div className="uan-container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / Site Name */}
                    <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        {logoSrc ? (
                            <img src={logoSrc} alt={siteName} className="h-8 w-auto" />
                        ) : (
                            <span className="text-2xl font-bold text-[var(--uan-accent)]">◈</span>
                        )}
                        <span className="font-semibold text-lg">{siteName}</span>
                    </a>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-[var(--uan-sand)] hover:text-[var(--uan-white)] transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Auth Section */}
                    {showAuth && (
                        <div className="flex items-center gap-4">
                            {isAuthenticated ? (
                                <button
                                    onClick={onLogout}
                                    className="text-sm text-[var(--uan-sand)] hover:text-[var(--uan-white)] transition-colors"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={onLogin}
                                    className="uan-btn uan-btn-primary text-sm"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[var(--uan-sand)] hover:text-[var(--uan-white)]"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
