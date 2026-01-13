import React from 'react';

interface FooterProps {
    siteName?: string;
    year?: number;
    links?: Array<{ label: string; href: string }>;
    showSacredSeal?: boolean;
}

/**
 * Shared footer component with UAN branding
 */
export function Footer({
    siteName = 'United American Nations',
    year = new Date().getFullYear(),
    links = [],
    showSacredSeal = true,
}: FooterProps) {
    return (
        <footer className="bg-[var(--uan-primary)] text-[var(--uan-sand)] border-t border-[var(--uan-earth)]">
            <div className="uan-container py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Branding */}
                    <div>
                        {showSacredSeal && (
                            <div className="text-4xl text-[var(--uan-accent)] mb-3">◈</div>
                        )}
                        <p className="text-sm opacity-75">
                            Sovereign jurisdiction under natural law and treaty rights.
                        </p>
                    </div>

                    {/* Links */}
                    {links.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-[var(--uan-white)] mb-3">Quick Links</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-sm hover:text-[var(--uan-white)] transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-[var(--uan-white)] mb-3">Contact</h4>
                        <p className="text-sm opacity-75">
                            For official inquiries, contact through proper diplomatic channels.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-[var(--uan-earth)] text-center text-sm opacity-75">
                    <p>© {year} {siteName}. All Rights Reserved Under Treaty Law.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
