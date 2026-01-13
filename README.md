# UAN Common UI

Shared UI components, hooks, and utilities for the United American Nations multi-domain web portal.

## Installation

```bash
npm install @uan/common-ui
```

## Usage

### Components

```tsx
import { Header, Footer, SacredCard, MaintenancePage, LoadingSpinner } from '@uan/common-ui/components';
import '@uan/common-ui/styles.css';

function App() {
    return (
        <>
            <Header siteName="UAN" navLinks={[{ label: 'Home', href: '/' }]} />
            <main>
                <SacredCard title="Declaration" variant="sacred">
                    Content here
                </SacredCard>
            </main>
            <Footer />
        </>
    );
}
```

### Hooks

```tsx
import { usePayloadAPI, useMaintenance } from '@uan/common-ui/hooks';

function MyComponent() {
    const { data, loading, error } = usePayloadAPI('sacred-ids', {
        baseUrl: 'https://aianumpuli.uans.us'
    });

    const { isEnabled: inMaintenance } = useMaintenance({
        apiUrl: 'https://aianumpuli.uans.us'
    });

    if (inMaintenance) return <MaintenancePage />;
    if (loading) return <LoadingSpinner />;
    // ...
}
```

### Theme Tokens

Add `data-theme` attribute to switch per-domain themes:

```html
<body data-theme="wampum">
```

Available themes: `default`, `wampum`, `verify`, `id`, `mint`, `chain`

## Development

```bash
npm run build   # Build library
npm run dev     # Watch mode
```
