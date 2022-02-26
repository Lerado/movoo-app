import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { TMDBSystemConfig } from './app.config';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    private _config: ReplaySubject<TMDBSystemConfig> = new ReplaySubject<TMDBSystemConfig>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for config
     */
    public get config$(): Observable<TMDBSystemConfig> {
        return this._config.asObservable();
    }

    /**
     * Setter for config
     */
    public set config(value: TMDBSystemConfig) {
        this._config.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get system config
     */
    getSystemConfig(): Observable<TMDBSystemConfig> {
        return this._httpClient.get('@tmdb/configuration').pipe(
            tap((config: TMDBSystemConfig) => {
                console.log(config);
                this._config.next(config);
            })
        );
    }

}
