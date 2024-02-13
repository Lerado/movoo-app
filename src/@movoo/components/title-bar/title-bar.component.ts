import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MovooPlatformWatcherService, Platform } from '@movoo/services/platform-watcher';
import { appWindow } from '@tauri-apps/api/window';
import { Subject, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
    selector: 'movoo-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf]
})
export class MovooTitleBarComponent implements OnInit, OnDestroy {

    platform: Platform;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _movooPlatformWatcherService: MovooPlatformWatcherService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Subscribe to platform changes
        this._movooPlatformWatcherService.platform$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((platform: Platform) => {

                // Store the platform
                this.platform = platform;
                console.log(platform);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle maximize window
     */
    toggleMaximizeWindow(): void {
        appWindow.toggleMaximize();
    }

    /**
     * Hide window
     */
    minimizeWindow(): void {
        appWindow.minimize();
    }

    /**
     * Close window
     */
    closeWindow(): void {
        appWindow.close();
    }
}
