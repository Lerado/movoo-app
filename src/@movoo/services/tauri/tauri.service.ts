import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { environment } from 'environments/environment';
import { from, Observable, tap } from 'rxjs';

@Injectable()
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
                    if (!environment.production) {
                        window.console.log(status);
                    }
                })
            );
    }
}
