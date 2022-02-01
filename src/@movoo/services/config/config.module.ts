import { ModuleWithProviders, NgModule } from '@angular/core';
import { MOVOO_APP_CONFIG } from './config.constants';
import { MovooConfigService } from './config.service';

@NgModule()
export class MovooConfigModule {

    /**
     * Constructor
     */
    constructor(
        private _movooConfigService: MovooConfigService
    ) {}

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
     static forRoot(config: any): ModuleWithProviders<MovooConfigModule>
     {
         return {
             ngModule : MovooConfigModule,
             providers: [
                 {
                     provide : MOVOO_APP_CONFIG,
                     useValue: config
                 }
             ]
         };
     }
}
