import { Component, ViewEncapsulation } from '@angular/core';
import { appWindow } from '@tauri-apps/api/window';

@Component({
    selector: 'movoo-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MovooTitleBarComponent {

    /**
     * Constructor
     */
    constructor() { }

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
