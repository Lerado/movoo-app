import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MovooMediaWatcherModule } from '@movoo/services/media-watcher/media-watcher.module';
import { MovooSplashScreenModule } from '@movoo/services/splash-screen/splash-screen.module';
import { MovooTauriModule } from '@movoo/services/tauri';
import { MovooPlatformWatcherModule } from './services/platform-watcher';
import { MovooUtilsModule } from './services/utils';

@NgModule({
    imports: [
        MovooSplashScreenModule,
        MovooMediaWatcherModule,
        MovooPlatformWatcherModule,
        MovooUtilsModule,
        MovooTauriModule
    ],
    providers: []
})
export class MovooModule {

    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: MovooModule) {
        if (parentModule) {
            throw new Error('MovooModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
