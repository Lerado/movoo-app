import { Inject, Injectable } from '@angular/core';
import { merge } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { MOVOO_APP_CONFIG } from './config.constants';

@Injectable({
    providedIn: 'root'
})
export class MovooConfigService {
    private _config: BehaviorSubject<any>;

    /**
     * Constructor
     */
    constructor(
        @Inject(MOVOO_APP_CONFIG) config: any
    ) {
        // Private
        this._config = new BehaviorSubject(config);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for config
     */
    get config$(): Observable<any> {
        return this._config.asObservable();
    }
    set config(value: any) {
        // Merge the new config over to the current config
        const config = merge({}, this._config.getValue(), value);

        // Execute the observable
        this._config.next(config);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resets the config to the default
     */
    reset(): void {
        // Set the config
        this._config.next(this.config);
    }
}
