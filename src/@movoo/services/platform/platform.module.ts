import { NgModule } from '@angular/core';
import { MovooPlatformService } from '@movoo/services/platform/platform.service';

@NgModule({
    providers: [
        MovooPlatformService
    ]
})
export class MovooPlatformModule
{
    /**
     * Constructor
     */
    constructor(private _movooPlatformService: MovooPlatformService)
    {
    }
}
