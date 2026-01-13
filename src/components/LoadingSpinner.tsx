import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    message?: string;
}

/**
 * Loading spinner with UAN styling
 */
export function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={`${sizeClasses[size]} relative`}>
                {/* Outer ring */}
                <div className="absolute inset-0 border-2 border-[var(--uan-secondary)] rounded-full" />
                {/* Spinning accent */}
                <div className="absolute inset-0 border-2 border-transparent border-t-[var(--uan-accent)] rounded-full animate-spin" />
                {/* Inner symbol */}
                <div className="absolute inset-0 flex items-center justify-center text-[var(--uan-accent)]">
                    <span className="text-xs">◈</span>
                </div>
            </div>
            {message && (
                <p className="text-sm text-[var(--uan-earth)]">{message}</p>
            )}
        </div>
    );
}

export default LoadingSpinner;
