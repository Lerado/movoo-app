import { Component, DestroyRef, OnInit, ViewChild, signal } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, first, map, tap } from 'rxjs';
import { MovooConfigService, Scheme, Theme } from '@movoo/services/config';
import { MatDrawer } from "@angular/material/sidenav";
import { SettingsService } from 'app/core/settings/settings.service';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SETTINGS_UPDATE_DELAY } from './settings.types';
import { MovooConfirmationService } from '@movoo/services/confirmation';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MovooDrawerComponent } from '../../../../@movoo/components/drawer/drawer.component';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: true,
    imports: [MovooDrawerComponent, MatIconModule, MatProgressSpinnerModule, MatButtonModule, NgClass, MatFormFieldModule, MatTooltipModule, MatSelectModule, ReactiveFormsModule, MatOptionModule, MatSlideToggleModule]
})
export class SettingsComponent implements OnInit {

    @ViewChild('settingsDrawer') drawer: MatDrawer;

    regions = toSignal(this._settingsService.regions$.pipe(
        map(regions => regions.sort((a, b) => a.english_name.localeCompare(b.english_name)))
    ), { initialValue: [] });

    languages = toSignal(this._settingsService.languages$.pipe(
        map(regions => regions.sort((a, b) => a.english_name.localeCompare(b.english_name)))
    ), { initialValue: [] });

    timezones = toSignal(this._settingsService.timezones$.pipe(
        map(regions => regions.sort((a, b) => a.iso_3166_1.localeCompare(b.iso_3166_1)))
    ), { initialValue: [] });

    config = toSignal(this._movooConfigService.config$);

    settingsControls = this._formBuilder.group({
        region: '',
        language: '',
        timezone: '',
        include_adult: false
    });

    settingsUpdating = signal(false);

    /**
     * Constructor
     */
    constructor(
        private readonly _settingsService: SettingsService,
        private readonly _router: Router,
        private readonly _formBuilder: NonNullableFormBuilder,
        private readonly _movooConfirmationService: MovooConfirmationService,
        private readonly _movooConfigService: MovooConfigService,
        private readonly _destroyRef: DestroyRef
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Subscribe to settings changes
        this._settingsService.settings$
            .pipe(
                first(),
                // Store the settings
                tap(settings => this.settingsControls.patchValue(settings))
            ).subscribe()

        // Trigger settings update
        this.settingsControls.valueChanges.pipe(
            takeUntilDestroyed(this._destroyRef),
            tap(() => this.settingsUpdating.set(true)),
            debounceTime(SETTINGS_UPDATE_DELAY),
            tap(settings => this._settingsService.updateSettings(settings)),
            tap(() => this.settingsUpdating.set(false))
        ).subscribe();
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
