/**
 * CTABlock - Call to action section
 */

import type { CTABlockProps } from '../../types/directus';

interface Props {
    props: CTABlockProps;
}

export function CTABlock({ props }: Props) {
    const {
        title,
        description,
        button_text,
        button_link,
        background = 'bg-uan-secondary'
    } = props;

    return (
        <section className={`py-16 ${background}`}>
            <div className="container text-center">
                <h2 className="text-3xl font-bold text-uan-primary mb-4">
                    {title}
                </h2>
                {description && (
                    <p className="text-uan-muted mb-8 max-w-xl mx-auto">
                        {description}
                    </p>
                )}
                <a
                    href={button_link}
                    className="inline-flex items-center gap-2 bg-uan-primary text-uan-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                >
                    {button_text}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </section>
    );
}

export default CTABlock;
