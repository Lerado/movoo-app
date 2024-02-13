import { Component, DestroyRef, Inject, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import { MovooConfigService, MovooConfig } from '@movoo/services/config';
import { MovooPlatformService } from '@movoo/services/platform';
import { MovooMediaWatcherService } from '@movoo/services/media-watcher';
import { MOVOO_VERSION } from '@movoo/version';
import { Layout } from 'app/layout/layout.types';
import { SettingsComponent } from './common/settings/settings.component';
import { ClassyLayoutComponent } from './layouts/vertical/classy/classy.component';
import { EmptyLayoutComponent } from './layouts/empty/empty.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MultiSearchBarComponent } from '../shared/components/search/multi-search-bar/multi-search-bar.component';
import { MovooTitleBarComponent } from '../../@movoo/components/title-bar/title-bar.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MovooTitleBarComponent, NgOptimizedImage, MultiSearchBarComponent, MatButtonModule, MatIconModule, EmptyLayoutComponent, ClassyLayoutComponent, SettingsComponent]
})
export class LayoutComponent implements OnInit {

    @ViewChild('settings') settingsComponent: SettingsComponent;

    config: MovooConfig;
    layout: string;
    scheme: 'dark' | 'light';
    theme: string;

    /**
     * Constructor
     */
    constructor(
        private readonly _activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private readonly _document: Document,
        private readonly _renderer2: Renderer2,
        private readonly _router: Router,
        private readonly _movooConfigService: MovooConfigService,
        private readonly _movooMediaWatcherService: MovooMediaWatcherService,
        private readonly _movooPlatformService: MovooPlatformService,
        private readonly _destroyRef: DestroyRef
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Set the theme and scheme based on the configuration
        combineLatest([
            this._movooConfigService.config$,
            this._movooMediaWatcherService.onMediaQueryChange$(['(prefers-color-scheme: dark)', '(prefers-color-scheme: light)'])
        ]).pipe(
            takeUntilDestroyed(this._destroyRef),
            map(([config, mql]) => {

                const options = {
                    scheme: config.scheme,
                    theme: config.theme
                };

                // If the scheme is set to 'auto'...
                if (config.scheme === 'auto') {
                    // Decide the scheme using the media query
                    options.scheme = mql.breakpoints['(prefers-color-scheme: dark)'] ? 'dark' : 'light';
                }

                return options;
            })
        ).subscribe((options) => {

            // Store the options
            this.scheme = options.scheme;
            this.theme = options.theme;

            // Update the scheme and theme
            this._updateScheme();
            this._updateTheme();
        });

        // Subscribe to config changes
        this._movooConfigService.config$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((config: MovooConfig) => {

                // Store the config
                this.config = config;

                // Update the layout
                this._updateLayout();
            });

        // Subscribe to NavigationEnd event
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntilDestroyed(this._destroyRef)
        ).subscribe(() => {

            // Update the layout
            this._updateLayout();
        });

        // Set the app version
        this._renderer2.setAttribute(this._document.querySelector('[ng-version]'), 'movoo-version', MOVOO_VERSION);

        // Set the OS name
        this._renderer2.addClass(this._document.body, this._movooPlatformService.osName);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the selected layout
     */
    private _updateLayout(): void {
        // Get the current activated route
        let route = this._activatedRoute;
        while (route.firstChild) {
            route = route.firstChild;
        }

        // 1. Set the layout from the config
        this.layout = this.config.layout;

        // 2. Get the query parameter from the current route and
        // set the layout and save the layout to the config
        const layoutFromQueryParam = (route.snapshot.queryParamMap.get('layout') as Layout);
        if (layoutFromQueryParam) {
            this.layout = layoutFromQueryParam;
            if (this.config) {
                this.config.layout = layoutFromQueryParam;
            }
        }

        // 3. Iterate through the paths and change the layout as we find
        // a config for it.
        //
        // The reason we do this is that there might be empty grouping
        // paths or componentless routes along the path. Because of that,
        // we cannot just assume that the layout configuration will be
        // in the last path's config or in the first path's config.
        //
        // So, we get all the paths that matched starting from root all
        // the way to the current activated route, walk through them one
        // by one and change the layout as we find the layout config. This
        // way, layout configuration can live anywhere within the path and
        // we won't miss it.
        //
        // Also, this will allow overriding the layout in any time so we
        // can have different layouts for different routes.
        const paths = route.pathFromRoot;
        paths.forEach((path) => {

            // Check if there is a 'layout' data
            if (path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout) {
                // Set the layout
                this.layout = path.routeConfig.data.layout;
            }
        });
    }

    /**
     * Update the selected scheme
     *
     * @private
     */
    private _updateScheme(): void {
        // Remove class names for all schemes
        this._document.body.classList.remove('light', 'dark');

        // Add class name for the currently selected scheme
        this._document.body.classList.add(this.scheme);
    }

    /**
     * Update the selected theme
     *
     * @private
     */
    private _updateTheme(): void {
        // Find the class name for the previously selected theme and remove it
        this._document.body.classList.forEach((className: string) => {
            if (className.startsWith('theme-')) {
                this._document.body.classList.remove(className, className.split('-')[1]);
            }
        });

        // Add class name for the currently selected theme
        this._document.body.classList.add(this.theme);
    }
}
