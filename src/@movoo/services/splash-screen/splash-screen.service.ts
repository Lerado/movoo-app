import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { MovooTauriService } from '@movoo/services/tauri/tauri.service';

@Injectable({providedIn: 'root'})
export class MovooSplashScreenService {

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: any,
        private _movooTauriService: MovooTauriService,
        private _router: Router
    ) {
        // Hide it on the first NavigationEnd event
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                this.hide();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the splash screen
     */
    show(): void {
        this._document.body.classList.remove('movoo-splash-screen-hidden');
    }

    /**
     * Hide the splash screen
     */
    hide(): void {
        this._document.body.classList.add('movoo-splash-screen-hidden');

        // Call Tauri to show the main window
        // const timer = setTimeout(() => {
            this._movooTauriService.invoke('close_splashscreen').subscribe();
        //     clearInterval(timer);
        // }, 5000);
    }
}
