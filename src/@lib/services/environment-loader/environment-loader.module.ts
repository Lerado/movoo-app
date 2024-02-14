import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideEnvironmentLoader } from './environment-loader.provider';

@NgModule()
export class EnvironmentLoaderModule {

    static forRoot(configPath?: string): ModuleWithProviders<EnvironmentLoaderModule> {
        return {
            ngModule: EnvironmentLoaderModule,
            providers: [
                provideEnvironmentLoader(configPath)
            ]
        };
    }
}
