import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class TMDBApiInterceptor implements HttpInterceptor {

    /**
     * Constructor
     */
    constructor() { }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Clone the request object
        let newRequest = req.clone();

        // Request
        //
        // We assume that a request url starting with 'api' is intented to be handled by MockApi
        // So nothing is performed in that case
        // Otherwise, request prefixed bu @tmdb are forwarded to the TMDB API
        // In that case, replace that pattern by TMDB API path
        if (!req.url.indexOf('@tmdb/')) {
            newRequest = req.clone({
                url: req.url.replace('@tmdb', this._buildTMDBApiPath())
            });
        }

        // Response
        return next.handle(newRequest);
    }

    /**
     * Builds TMDB API path
     *
     * @private
     */
    private _buildTMDBApiPath(): string {

        let base = environment.api?.tmdb?.path;
        const version = environment.api?.tmdb?.defaultVersion;

        if (!base.endsWith('/')) {
            base += '/';
        }

        return `${ base }${ version }`;
    }
}
