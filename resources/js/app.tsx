import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const appName = import.meta.env.VITE_APP_NAME || "RH Conecta";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <Toaster />
                <App {...props} />
            </ThemeProvider>

        );
    },
    progress: {
        color: '#4B5563',
    },
});
