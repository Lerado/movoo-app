import { NgModule } from '@angular/core';
import { MovooUtilsService } from '@movoo/services/utils/utils.service';

@NgModule({
    providers: [
        MovooUtilsService
    ]
})
export class MovooUtilsModule
{
    /**
     * Constructor
     */
    constructor(private _movooUtilsService: MovooUtilsService)
    {
    }
}
