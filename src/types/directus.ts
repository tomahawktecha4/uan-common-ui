/**
 * Directus Collection Types for UAN Theming System
 */

// =============================================================================
// SITES - Each UAN subdomain instance
// =============================================================================
export interface Site {
    id: string;
    domain: string;          // e.g. "verify.uans.us"
    name: string;            // Display name
    logo?: DirectusFile;
    theme?: Theme | string;  // Relational or ID
    default_template?: PageTemplate | string;
    enabled: boolean;
    date_created?: string;
    date_updated?: string;
}

// =============================================================================
// THEMES - Color palette, fonts, layout components
// =============================================================================
export interface Theme {
    id: string;
    name: string;
    description?: string;
    css_vars: CSSVariables;
    font_family: string;
    button_style: ButtonStyle;
    dark_mode_vars?: CSSVariables;
    preview_image?: DirectusFile;
}

export interface CSSVariables {
    // Brand colors
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;

    // Optional extended palette
    success?: string;
    warning?: string;
    error?: string;
    info?: string;

    // Borders & shadows
    border?: string;
    ring?: string;

    // Custom vars (key-value)
    [key: string]: string | undefined;
}

export interface ButtonStyle {
    border_radius: string;   // e.g. "8px", "full"
    border_width: string;
    shadow: string;          // e.g. "none", "sm", "md", "lg"
    font_weight: string;
}

// =============================================================================
// PAGE TEMPLATES - Reusable layouts
// =============================================================================
export interface PageTemplate {
    id: string;
    name: string;
    description?: string;
    layout_json: LayoutConfig;
    style_overrides?: Partial<CSSVariables>;
    blocks?: Block[] | string[];
    preview_image?: DirectusFile;
}

export interface LayoutConfig {
    type: 'single-column' | 'two-column' | 'full-width' | 'sidebar' | 'custom';
    sections: SectionConfig[];
    header?: boolean;
    footer?: boolean;
}

export interface SectionConfig {
    id: string;
    type: 'hero' | 'content' | 'features' | 'cta' | 'custom';
    background?: string;
    padding?: string;
}

// =============================================================================
// PAGES - Instantiated pages per subdomain
// =============================================================================
export interface Page {
    id: string;
    site: Site | string;
    template?: PageTemplate | string;
    slug: string;            // e.g. "index", "about", "verify"
    seo_title?: string;
    seo_description?: string;
    blocks?: Block[] | string[];
    published: boolean;
    date_created?: string;
    date_updated?: string;
}

// =============================================================================
// BLOCKS - Atomic design units
// =============================================================================
export type BlockType =
    | 'hero'
    | 'text'
    | 'image'
    | 'form'
    | 'globe'
    | 'map'
    | 'qr'
    | 'quote'
    | 'features'
    | 'cta'
    | 'video'
    | 'spacer'
    | 'divider'
    | 'custom';

export interface Block {
    id: string;
    name: string;
    type: BlockType;
    props: BlockProps;
    order: number;
    media?: DirectusFile;
}

// Block-specific props
export interface HeroBlockProps {
    title: string;
    subtitle?: string;
    cta_text?: string;
    cta_link?: string;
    background_type: 'color' | 'image' | 'gradient';
    background_value: string;
    text_align: 'left' | 'center' | 'right';
}

export interface TextBlockProps {
    content: string;  // Rich text / markdown
    align: 'left' | 'center' | 'right';
}

export interface ImageBlockProps {
    src: string;
    alt: string;
    caption?: string;
    rounded?: boolean;
    shadow?: boolean;
}

export interface FormBlockProps {
    form_type: 'contact' | 'newsletter' | 'custom';
    fields: FormField[];
    submit_text: string;
    success_message: string;
}

export interface FormField {
    name: string;
    type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
    label: string;
    required: boolean;
    options?: string[];
}

export interface GlobeBlockProps {
    territories: Territory[];
    show_arcs: boolean;
    auto_rotate: boolean;
    width?: number;
    height?: number;
}

export interface Territory {
    lat: number;
    lng: number;
    name: string;
    size: number;
    color: string;
}

export interface QRBlockProps {
    value: string;
    size: number;
    title?: string;
    description?: string;
}

export interface QuoteBlockProps {
    quote: string;
    author: string;
    role?: string;
}

export interface FeaturesBlockProps {
    title?: string;
    features: FeatureItem[];
    columns: 2 | 3 | 4;
}

export interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

export interface CTABlockProps {
    title: string;
    description?: string;
    button_text: string;
    button_link: string;
    background?: string;
}

export interface VideoBlockProps {
    src: string;
    poster?: string;
    autoplay?: boolean;
    controls?: boolean;
}

export interface SpacerBlockProps {
    height: string;  // e.g. "32px", "2rem"
}

// Union type for block props
export type BlockProps =
    | HeroBlockProps
    | TextBlockProps
    | ImageBlockProps
    | FormBlockProps
    | GlobeBlockProps
    | QRBlockProps
    | QuoteBlockProps
    | FeaturesBlockProps
    | CTABlockProps
    | VideoBlockProps
    | SpacerBlockProps
    | Record<string, unknown>;

// =============================================================================
// DIRECTUS FILE
// =============================================================================
export interface DirectusFile {
    id: string;
    filename_disk: string;
    filename_download: string;
    title?: string;
    type: string;
    width?: number;
    height?: number;
}

// =============================================================================
// API RESPONSES
// =============================================================================
export interface DirectusResponse<T> {
    data: T;
    meta?: {
        total_count?: number;
        filter_count?: number;
    };
}

export interface SiteData {
    site: Site;
    theme: Theme;
    pages: Page[];
    navigation: NavigationItem[];
}

export interface NavigationItem {
    id: string;
    label: string;
    href: string;
    sort: number;
    external?: boolean;
}
