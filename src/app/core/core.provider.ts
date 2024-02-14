import { EnvironmentProviders, Provider } from '@angular/core';
import { provideApi } from './api/api.provider';
import { provideAuth } from './auth/auth.provider';
import { provideIcons } from './icons/icons.provider';
import { provideEnvironmentLoader } from '@lib/services/environment-loader/environment-loader.provider';

export const provideCore = (): Array<Provider | EnvironmentProviders> => [
    provideEnvironmentLoader(),
    provideApi(),
    provideAuth(),
    provideIcons()
];
