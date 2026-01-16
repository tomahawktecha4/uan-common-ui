/**
 * TextBlock - Rich text content block
 */

import type { TextBlockProps } from '../../types/directus';

interface Props {
    props: TextBlockProps;
}

export function TextBlock({ props }: Props) {
    const { content, align = 'left' } = props;

    const alignClass = {
        left: 'text-left',
        center: 'text-center mx-auto',
        right: 'text-right',
    }[align];

    return (
        <div className={`prose prose-lg max-w-3xl ${alignClass}`}>
            <div
                className="text-uan-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}

export default TextBlock;
