import { NgModule } from '@angular/core';
import { MovooSplashScreenService } from '@movoo/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        MovooSplashScreenService
    ]
})
export class MovooSplashScreenModule {

    /**
     * Constructor
     */
    constructor(private _movooSplashScreenService: MovooSplashScreenService) {
    }
}
