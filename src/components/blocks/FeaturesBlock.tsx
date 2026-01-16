/**
 * FeaturesBlock - Grid of feature cards
 */

import type { FeaturesBlockProps, FeatureItem } from '../../types/directus';

interface Props {
    props: FeaturesBlockProps;
}

// Icon mapping (can be extended)
const icons: Record<string, React.ReactNode> = {
    shield: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    document: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    users: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
    globe: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    default: <span className="text-2xl">◈</span>,
};

export function FeaturesBlock({ props }: Props) {
    const { title, features, columns = 3 } = props;

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    }[columns];

    return (
        <section className="py-16 bg-uan-background">
            <div className="container">
                {title && (
                    <h2 className="text-3xl font-bold text-center text-uan-primary mb-12">
                        {title}
                    </h2>
                )}
                <div className={`grid gap-8 ${gridCols}`}>
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ feature }: { feature: FeatureItem }) {
    const icon = icons[feature.icon.toLowerCase()] || icons.default;

    return (
        <div className="bg-white dark:bg-uan-secondary/10 border border-uan-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-uan-accent/10 text-uan-accent rounded-full mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-uan-primary mb-2">{feature.title}</h3>
            <p className="text-uan-muted">{feature.description}</p>
        </div>
    );
}

export default FeaturesBlock;
