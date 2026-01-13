import React from 'react';

interface SacredCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    variant?: 'default' | 'sacred' | 'warning' | 'success';
    className?: string;
}

/**
 * Sacred card component for displaying content with UAN styling
 */
export function SacredCard({
    title,
    subtitle,
    children,
    icon,
    variant = 'default',
    className = '',
}: SacredCardProps) {
    const variantStyles = {
        default: 'border-[var(--uan-secondary)]',
        sacred: 'border-[var(--uan-accent)] bg-gradient-to-br from-[var(--uan-sand)]/10 to-transparent',
        warning: 'border-[var(--uan-warning)] bg-[var(--uan-warning)]/5',
        success: 'border-[var(--uan-success)] bg-[var(--uan-success)]/5',
    };

    return (
        <div className={`uan-card ${variantStyles[variant]} ${className}`}>
            <div className="flex items-start gap-4">
                {icon && (
                    <div className="flex-shrink-0 text-[var(--uan-accent)]">
                        {icon}
                    </div>
                )}
                <div className="flex-1">
                    <h3 className="font-semibold text-[var(--uan-primary)] mb-1">{title}</h3>
                    {subtitle && (
                        <p className="text-sm text-[var(--uan-earth)] mb-3">{subtitle}</p>
                    )}
                    <div className="text-[var(--uan-primary)]">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default SacredCard;
