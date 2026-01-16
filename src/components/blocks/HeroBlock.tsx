/**
 * HeroBlock - Full-width hero section with title, subtitle, and CTA
 */

import type { HeroBlockProps } from '../../types/directus';

interface Props {
    props: HeroBlockProps;
}

export function HeroBlock({ props }: Props) {
    const {
        title,
        subtitle,
        cta_text,
        cta_link,
        background_type = 'gradient',
        background_value = 'from-uan-primary to-uan-muted',
        text_align = 'center'
    } = props;

    const alignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }[text_align];

    const bgStyle = background_type === 'image'
        ? { backgroundImage: `url(${background_value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : background_type === 'color'
            ? { backgroundColor: background_value }
            : {};

    const bgClass = background_type === 'gradient'
        ? `bg-gradient-to-br ${background_value}`
        : '';

    return (
        <section
            className={`py-20 ${bgClass}`}
            style={bgStyle}
        >
            <div className={`container ${alignClass}`}>
                <span className="text-8xl text-uan-accent mb-6 inline-block drop-shadow-lg">◈</span>
                <h1 className="text-4xl md:text-5xl font-bold text-uan-white mb-6">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-xl text-uan-sand max-w-2xl mx-auto mb-8">
                        {subtitle}
                    </p>
                )}
                {cta_text && cta_link && (
                    <a
                        href={cta_link}
                        className="inline-flex items-center gap-2 bg-uan-accent text-uan-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                    >
                        {cta_text}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                )}
            </div>
        </section>
    );
}

export default HeroBlock;
