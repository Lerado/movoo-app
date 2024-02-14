import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { EnvironmentLoaderService } from '@lib/services/environment-loader/environment-loader.service';
import { Observable } from 'rxjs';

export const tmdbApiInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

    const environmentLoaderService = inject(EnvironmentLoaderService);

    // Clone the request object
    let newRequest = req.clone();

    // Request
    //
    // We assume that a request url starting with 'api' is intended to be handled by MockApi
    // So nothing is performed in that case
    // Otherwise, request prefixed bu @tmdb are forwarded to the TMDB API
    // In that case, replace that pattern by TMDB API path
    if (!req.url.indexOf('@tmdb/')) {
        const { path: base, defaultVersion: version } = (environmentLoaderService.environment.api as Record<string, Record<string, unknown>>).tmdb;
        newRequest = req.clone({
            url: req.url.replace('@tmdb', `${base}${version}`)
        });
    }

    // Response
    return next(newRequest);
}
