import { APP_INITIALIZER, EnvironmentProviders, Provider } from '@angular/core';
import { EnvironmentLoaderService } from './environment-loader.service';
import { ENVIRONMENT_DEFAULT_CONFIG_PATH } from './environment-loader.constants';
import { lastValueFrom } from 'rxjs';

export const provideEnvironmentLoader = (configPath?: string): Array<Provider | EnvironmentProviders> => {
    return [
        EnvironmentLoaderService,
        {
            provide: APP_INITIALIZER,
            deps: [EnvironmentLoaderService],
            useFactory: (environmentLoaderService: EnvironmentLoaderService): unknown => (): Promise<Record<string, unknown>> => {
                return lastValueFrom(environmentLoaderService.load());
            },
            multi: true
        },
        {
            provide: ENVIRONMENT_DEFAULT_CONFIG_PATH,
            useValue: configPath ?? '/environment.json'
        }
    ];
}
