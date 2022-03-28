import { NgModule } from '@angular/core';
import { MovooTauriService } from '@movoo/services/tauri/tauri.service';

@NgModule({
    providers: [
        MovooTauriService
    ]
})
export class MovooTauriModule {

    /**
     * Constructor
     */
    constructor(private _movooTauriService: MovooTauriService) {
    }
}
