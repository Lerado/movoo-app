import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, shareReplay, take, tap } from 'rxjs';
import { TMDBSystemConfig } from './config.types';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    readonly config$ = this._httpClient.get<TMDBSystemConfig>('@tmdb/configuration').pipe(shareReplay());

    /**
     * Constructor
     */
    constructor(
        private readonly _httpClient: HttpClient
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get system config
     */
    getSystemConfig(): Observable<TMDBSystemConfig> {
        return this.config$.pipe(take(1));
    }

}
