import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { MovieService } from 'app/shared/services/movie/movie.service';
import { Movie } from 'app/shared/services/movie/movie.types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NowPlayingMoviesResolver implements Resolve<Observable<Movie[]>> {

    /**
     * Constructor
     */
    constructor(
        private _movieService: MovieService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[]> | Observable<Observable<Movie[]>> | Promise<Observable<Movie[]>> {
        return this._movieService.getNowPlayed();
    }
}
