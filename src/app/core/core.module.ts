import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiModule } from 'app/core/api/api.module';
import { AuthModule } from './auth/auth.module';
import { IconsModule } from './icons/icons.module';

@NgModule({
    imports: [
        ApiModule,
        AuthModule,
        IconsModule
    ]
})
export class CoreModule {

    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    ) {
        // Do not allow multiple injections
        if (parentModule) {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
