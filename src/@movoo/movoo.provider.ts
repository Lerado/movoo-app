import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ENVIRONMENT_INITIALIZER, EnvironmentProviders, importProvidersFrom, inject, Provider } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MovooConfig } from '@movoo/services/config';
import { MOVOO_APP_CONFIG } from '@movoo/services/config/config.constants';
import { MovooConfirmationService } from '@movoo/services/confirmation';
import { movooLoadingInterceptor, MovooLoadingService } from '@movoo/services/loading';
import { MovooMediaWatcherService } from '@movoo/services/media-watcher';
import { MovooPlatformService } from '@movoo/services/platform';
import { MovooSplashScreenService } from '@movoo/services/splash-screen';
import { MovooUtilsService } from '@movoo/services/utils';

export type MovooProviderConfig = {
    mockApi?: {
        delay?: number;
        services?: any[];
    },
    movoo?: MovooConfig
}

/**
 * Movoo provider
 */
export const provideMovoo = (config: MovooProviderConfig): Array<Provider | EnvironmentProviders> =>
{
    // Base providers
    const providers: Array<Provider | EnvironmentProviders> = [
        {
            // Disable 'theme' sanity check
            provide : MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme  : false,
                version: true,
            },
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
        {
            provide : MOVOO_APP_CONFIG,
            useValue: config?.movoo ?? {},
        },

        importProvidersFrom(MatDialogModule),
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(MovooConfirmationService),
            multi   : true,
        },

        provideHttpClient(withInterceptors([movooLoadingInterceptor])),
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(MovooLoadingService),
            multi   : true,
        },

        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(MovooMediaWatcherService),
            multi   : true,
        },
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(MovooPlatformService),
            multi   : true,
        },
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(MovooSplashScreenService),
            multi   : true,
        },
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(MovooUtilsService),
            multi   : true,
        },
    ];

    // Return the providers
    return providers;
};
