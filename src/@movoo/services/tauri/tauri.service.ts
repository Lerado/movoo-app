import { Injectable, isDevMode } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { from, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MovooTauriService {

    /**
     * Constructor
     */
    constructor() { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    invoke(command: string): Observable<any> {

        // Invoke command from Rust using Tauri
        return from(
            invoke(command)
                .then(() => `command ${command} invoked successfully`)
                .catch(error => `command ${command} invoked with error ${error.message}`)
        )
            .pipe(
                tap((status) => {
                    // Log in dev mode
                    if (isDevMode()) {
                        window.console.log(status);
                    }
                })
            );
    }
}
