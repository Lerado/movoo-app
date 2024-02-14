import { Inject, Injectable, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT_DEFAULT_CONFIG_PATH } from './environment-loader.constants';
import { BehaviorSubject, Observable, retry, skipWhile, tap } from 'rxjs';

@Injectable()
export class EnvironmentLoaderService {

    private _environment: BehaviorSubject<Record<string, unknown>> = new BehaviorSubject<Record<string, unknown>>({});

    /**
     * Constructor
     */
    constructor(
        private readonly _httpClient: HttpClient,
        @Inject(ENVIRONMENT_DEFAULT_CONFIG_PATH) private _defaultConfigPath: string
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get environment(): Record<string, unknown> {
        return this._environment.getValue();
    }

    get environment$(): Observable<Record<string, unknown>> {
        return this._environment
            .asObservable()
            .pipe(
                skipWhile(value => Object.keys(value).length === 0)
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Load environment configuration via a HTTP call
     *
     * @param path The url to query. Default is provided using ``ENVIRONMENT_DEFAULT_CONFIG_PATH`` injection token
     */
    load(path?: string): Observable<Record<string, unknown>> {
        return this._httpClient.get<Record<string, unknown>>(path ?? this._defaultConfigPath).pipe(
            // Don't catch errors because it has to fail and retry
            // catchError(() => of({})),
            tap(response => this._environment.next(response)),
            // Attempt to resolve environment at least three times
            retry(2)
        );
    }
}
