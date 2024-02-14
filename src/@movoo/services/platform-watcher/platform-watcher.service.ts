import { Injectable } from '@angular/core';
import { platform } from '@tauri-apps/api/os';
import { from, Observable, ReplaySubject } from 'rxjs';
import { Platform } from '@movoo/services/platform-watcher/platform-watcher.types';

@Injectable({providedIn: 'root'})
export class MovooPlatformWatcherService {

    private _platform: ReplaySubject<Platform> = new ReplaySubject<Platform>(1);

    /**
     * Constructor
     */
    constructor() {
        // Try to get the platform from tauri
        // If attempt fails, the platform is a browser
        from(
            platform()
                .catch(() => 'browser')
        )
        .subscribe((result: Platform) => {
            this._platform.next(result);
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter form _platform
     */
    get platform$(): Observable<Platform> {
        return this._platform.asObservable();
    }
}
