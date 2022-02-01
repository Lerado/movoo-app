import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MovooMediaWatcherModule } from './services/media-watcher';

@NgModule({
    imports: [
        MovooMediaWatcherModule,
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
