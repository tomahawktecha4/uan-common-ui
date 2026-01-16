/**
 * BlockRenderer - Maps block type to React component
 */

import type { Block, BlockType } from '../../types/directus';
import { HeroBlock } from './HeroBlock';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { FeaturesBlock } from './FeaturesBlock';
import { CTABlock } from './CTABlock';
import { QuoteBlock } from './QuoteBlock';
import { FormBlock } from './FormBlock';
import { QRBlock } from './QRBlock';

// Block type to component mapping
const blockComponents: Record<BlockType, React.ComponentType<{ props: unknown }>> = {
    hero: HeroBlock as React.ComponentType<{ props: unknown }>,
    text: TextBlock as React.ComponentType<{ props: unknown }>,
    image: ImageBlock as React.ComponentType<{ props: unknown }>,
    features: FeaturesBlock as React.ComponentType<{ props: unknown }>,
    cta: CTABlock as React.ComponentType<{ props: unknown }>,
    quote: QuoteBlock as React.ComponentType<{ props: unknown }>,
    form: FormBlock as React.ComponentType<{ props: unknown }>,
    qr: QRBlock as React.ComponentType<{ props: unknown }>,
    globe: PlaceholderBlock as React.ComponentType<{ props: unknown }>,
    map: PlaceholderBlock as React.ComponentType<{ props: unknown }>,
    video: VideoBlock as React.ComponentType<{ props: unknown }>,
    spacer: SpacerBlock as React.ComponentType<{ props: unknown }>,
    divider: DividerBlock as React.ComponentType<{ props: unknown }>,
    custom: PlaceholderBlock as React.ComponentType<{ props: unknown }>,
};

interface BlockRendererProps {
    block: Block;
    className?: string;
}

/**
 * BlockRenderer - Renders a single block based on its type
 */
export function BlockRenderer({ block, className = '' }: BlockRendererProps) {
    const Component = blockComponents[block.type];

    if (!Component) {
        console.warn(`[BlockRenderer] Unknown block type: ${block.type}`);
        return <PlaceholderBlock props={{ type: block.type, name: block.name }} />;
    }

    return (
        <div className={`block-wrapper block-${block.type} ${className}`} data-block-id={block.id}>
            <Component props={block.props} />
        </div>
    );
}

/**
 * BlockList - Renders multiple blocks in order
 */
export function BlockList({ blocks }: { blocks: Block[] }) {
    const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

    return (
        <div className="block-list">
            {sortedBlocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
            ))}
        </div>
    );
}

// Simple blocks
function VideoBlock({ props }: { props: { src: string; poster?: string; autoplay?: boolean; controls?: boolean } }) {
    return (
        <div className="my-8 max-w-4xl mx-auto">
            <video
                src={props.src}
                poster={props.poster}
                autoPlay={props.autoplay}
                controls={props.controls !== false}
                className="w-full rounded-lg shadow-lg"
            />
        </div>
    );
}

function SpacerBlock({ props }: { props: { height?: string } }) {
    return <div style={{ height: props.height || '64px' }} />;
}

function DividerBlock() {
    return <hr className="my-8 border-t border-uan-border" />;
}

function PlaceholderBlock({ props }: { props: { type?: string; name?: string } }) {
    return (
        <div className="my-8 p-8 bg-uan-secondary/20 rounded-lg text-center">
            <p className="text-uan-muted">
                Block: {props.name || props.type || 'Unknown'}
            </p>
        </div>
    );
}

export default BlockRenderer;
