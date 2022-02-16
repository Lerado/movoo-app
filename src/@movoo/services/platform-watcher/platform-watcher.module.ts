import { NgModule } from '@angular/core';
import { MovooPlatformWatcherService } from '@movoo/services/platform-watcher/platform-watcher.service';

@NgModule({
    providers: [
        MovooPlatformWatcherService
    ]
})
export class MovooPlatformWatcherModule {

    /**
     * Constructor
     */
    constructor(private _movooPlatformWatcherService: MovooPlatformWatcherService) {
    }
}
