import { NgModule } from '@angular/core';
import { MovooMediaWatcherService } from '@movoo/services/media-watcher/media-watcher.service';

@NgModule({
    providers: [
        MovooMediaWatcherService
    ]
})
export class MovooMediaWatcherModule
{
    /**
     * Constructor
     */
    constructor(private _movooMediaWatcherService: MovooMediaWatcherService)
    {
    }
}
