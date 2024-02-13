import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideCore } from "./core/core.provider";
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading, withViewTransitions } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideServiceWorker } from "@angular/service-worker";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideMovoo } from "@movoo";
import { provideTitleStrategy } from "ngx-title-strategy";

export const appConfig: ApplicationConfig = {
    providers: [

        // Routing
        provideRouter(appRoutes,
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
            withPreloading(PreloadAllModules),
            withComponentInputBinding(),
            withViewTransitions()
        ),

        // Core module
        provideCore(),

        // Title strategy
        provideTitleStrategy('{{ title }} | Movoo'),

        // Movoo lib
        provideMovoo({
            movoo: {
                layout: 'classy',
                scheme: 'dark',
                screens: {
                    sm: '600px',
                    md: '960px',
                    lg: '1280px',
                    xl: '1440px'
                },
                theme: 'theme-default',
                themes: [
                    {
                        id: 'theme-default',
                        name: 'Default'
                    }
                ]
            }
        }),

        // Service worker
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),

        // Animations
        provideAnimationsAsync()
    ]
}
