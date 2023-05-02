import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, first, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { MovooConfigService } from '@movoo/services/config';
import { AppConfig, Scheme, Theme, Themes } from 'app/core/config/app.config';
import { Layout } from 'app/layout/layout.types';
import { MatDrawer } from "@angular/material/sidenav";
import { SettingsService } from 'app/core/settings/settings.service';
import { Language, Region, Settings, Timezone } from 'app/core/settings/settings.types';
import { NonNullableFormBuilder } from '@angular/forms';
import { SETTINGS_UPDATE_DELAY } from './settings.types';
import { MovooConfirmationService } from '@movoo/services/confirmation';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, OnDestroy {

    @ViewChild('settingsDrawer') drawer: MatDrawer;

    regions$: Observable<Region[]> = this._settingsService.regions$.pipe(
        map(regions => regions.sort((a, b) => a.english_name.localeCompare(b.english_name)))
    );
    languages$: Observable<Language[]> = this._settingsService.languages$.pipe(
        map(regions => regions.sort((a, b) => a.english_name.localeCompare(b.english_name)))
    );
    timezones$: Observable<Timezone[]> = this._settingsService.timezones$.pipe(
        map(regions => regions.sort((a, b) => a.iso_639_1.localeCompare(b.iso_639_1)))
    );

    config: AppConfig;
    layout: Layout;
    scheme: 'dark' | 'light';
    theme: string;
    themes: Themes;

    settingsControls = this._formBuilder.group({
        region: '',
        language: '',
        timezone: '',
        include_adult: false
    });
    settingsUpdating: boolean = false;

    private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private readonly _settingsService: SettingsService,
        private readonly _router: Router,
        private readonly _formBuilder: NonNullableFormBuilder,
        private readonly _movooConfirmationService: MovooConfirmationService,
        private readonly _movooConfigService: MovooConfigService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._movooConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: AppConfig) => {

                // Store the config
                this.config = config;
            });

        // Subscribe to settings changes
        this._settingsService.settings$
            .pipe(first())
            .subscribe((settings: Settings) => {

                // Store the settings
                this.settingsControls.patchValue(settings);
            })

        // Trigger settings update
        this.settingsControls.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            tap(() => this.settingsUpdating = true),
            debounceTime(SETTINGS_UPDATE_DELAY),
            tap(settings => this._settingsService.updateSettings(settings)),
            tap(() => this.settingsUpdating = false)
        ).subscribe();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the layout on the config
     *
     * @param layout
     */
    setLayout(layout: string): void {
        // Clear the 'layout' query param to allow layout changes
        this._router.navigate([], {
            queryParams: {
                layout: null
            },
            queryParamsHandling: 'merge'
        }).then(() => {

            // Set the config
            this._movooConfigService.config = { layout };
        });
    }

    /**
     * Set the scheme on the config
     *
     * @param scheme
     */
    setScheme(scheme: Scheme): void {
        this._movooConfigService.config = { scheme };
    }

    /**
     * Set the theme on the config
     *
     * @param theme
     */
    setTheme(theme: Theme): void {
        this._movooConfigService.config = { theme };
    }

    /**
     * Toggle drawer
     */
    toggle(): void {
        this.drawer.toggle();
    }

    /**
     * Get user consent for adult consent
     *
     * @param $event
     */
    getUserConsent({ checked: include_adult, source }: MatSlideToggleChange): void {

        if (include_adult) {
            // Confirmation dialog
            const confirmationDialog = this._movooConfirmationService.open({
                title: 'Confirmation',
                message: 'If you are under the age of 18 years, or under the age of majority in the location from where you are accessing this website you do not have authorization or permission to perform this action or access any adult material from this website.\n If you are over the age of 18 years or over the age of majority in the location from where you are accessing this website, by validating this popup you hereby agree to comply with all the TERMS AND CONDITIONS. You also acknowledge and agree that you are not offended by nudity and explicit depictions of sexual activity.\n\n By clicking on the \"I agree\" button, you agree with all the above and certify under penalty of perjury that you are an adult.',
                actions: {
                    cancel: {
                        label: 'No, I\'m okay'
                    },
                    confirm: {
                        label: 'I agree'
                    }
                },
                dismissible: false
            });

            confirmationDialog.afterClosed().subscribe((result) => {

                if (result !== 'confirmed') {
                    // Reset to false again
                    source.toggle();
                }
                else {
                    this.settingsControls.patchValue({ include_adult });
                }
            })
        }
        else {
            this.settingsControls.patchValue({ include_adult });
        }
    }
}
