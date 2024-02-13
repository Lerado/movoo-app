import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ENVIRONMENT_DEFAULT_CONFIG_PATH } from '@lib/services/environment-loader/environment-loader.constants';
import { EnvironmentLoaderService } from '@lib/services/environment-loader/environment-loader.service';
import { Observable } from 'rxjs';

export const tmdbAuthInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

    const environmentLoaderService = inject(EnvironmentLoaderService);
    const environmentPath = inject(ENVIRONMENT_DEFAULT_CONFIG_PATH);

    /**
     * Request should be different from the one made to resolve environment
     */
    if (req.url === environmentPath) {
        return next(req);
    }

    const { path, readAccessToken } = (environmentLoaderService.environment.api as Record<string, Record<string, unknown>>).tmdb;

    // Clone
    let newRequest = req.clone();

    // Add Authorization HTTP header so the Movie database APi will not complain
    if (req.url.startsWith(path as string)) {
        newRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + readAccessToken)
        });
    }

    // Response
    return next(newRequest);
}
