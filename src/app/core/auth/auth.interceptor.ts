import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class TMDBAuthInterceptor implements HttpInterceptor {

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

        // Clone
        let newRequest = req.clone();

        // Add Authorizationn HTTP header so the Movie database APi will not complain
        if (req.url.startsWith(environment.api?.tmdb?.path)) {
            newRequest = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + environment.api?.tmdb?.readAccessToken)
            });
        }

        // Response
        return next.handle(newRequest);
    }
}
