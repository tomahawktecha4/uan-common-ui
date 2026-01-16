/**
 * ImageBlock - Image with optional caption
 */

import type { ImageBlockProps } from '../../types/directus';

interface Props {
    props: ImageBlockProps;
}

export function ImageBlock({ props }: Props) {
    const { src, alt, caption, rounded = true, shadow = true } = props;

    return (
        <figure className="my-8">
            <img
                src={src}
                alt={alt}
                className={`w-full max-w-3xl mx-auto ${rounded ? 'rounded-lg' : ''} ${shadow ? 'shadow-lg' : ''}`}
                loading="lazy"
            />
            {caption && (
                <figcaption className="text-center text-sm text-uan-muted mt-3">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

export default ImageBlock;
