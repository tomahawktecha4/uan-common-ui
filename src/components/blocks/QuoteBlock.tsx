/**
 * QuoteBlock - Testimonial or quote display
 */

import type { QuoteBlockProps } from '../../types/directus';

interface Props {
    props: QuoteBlockProps;
}

export function QuoteBlock({ props }: Props) {
    const { quote, author, role } = props;

    return (
        <blockquote className="my-12 max-w-2xl mx-auto text-center">
            <div className="text-4xl text-uan-accent mb-4">"</div>
            <p className="text-xl italic text-uan-foreground mb-6 leading-relaxed">
                {quote}
            </p>
            <footer className="text-uan-muted">
                <cite className="not-italic font-semibold">{author}</cite>
                {role && <span className="block text-sm mt-1">{role}</span>}
            </footer>
        </blockquote>
    );
}

export default QuoteBlock;
