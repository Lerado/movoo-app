import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CreditService } from 'app/shared/services/credits/credits.service';
import { MovieCredits } from 'app/shared/services/credits/credits.types';
import { ImageService } from 'app/shared/services/image/image.service';
import { MovieImages } from 'app/shared/services/image/image.types';
import { MovieService } from 'app/shared/services/movie/movie.service';
import { Movie } from 'app/shared/services/movie/movie.types';
import { VideoService } from 'app/shared/services/video/video.service';
import { MovieVideos } from 'app/shared/services/video/video.types';
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
        return this._movieService.getNowPlayed(
            { page: 1 },
            true
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class UpcomingMoviesResolver implements Resolve<Observable<Movie[]>> {

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
        return this._movieService.getUpcoming(
            { page: 1 },
            true
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class MovieDetailResolver implements Resolve<Observable<Movie>> {

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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie> | Observable<Observable<Movie>> | Promise<Observable<Movie>> {

        const movieId = route.paramMap.get('id');

        return this._movieService.getById(+movieId);
    }
}

@Injectable({
    providedIn: 'root'
})
export class MovieCreditsResolver implements Resolve<Observable<MovieCredits>> {

    /**
     * Constructor
     */
    constructor(
        private _creditService: CreditService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieCredits> | Observable<Observable<MovieCredits>> | Promise<Observable<MovieCredits>> {

        const movieId = route.paramMap.get('id');

        return this._creditService.getByMovieId(+movieId);
    }
}

@Injectable({
    providedIn: 'root'
})
export class MovieImagesResolver implements Resolve<Observable<MovieImages>> {

    /**
     * Constructor
     */
    constructor(
        private _imageService: ImageService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieImages> | Observable<Observable<MovieImages>> | Promise<Observable<MovieImages>> {

        const movieId = route.paramMap.get('id');

        return this._imageService.getByMovieId(+movieId);
    }
}

@Injectable({
    providedIn: 'root'
})
export class MovieVideosResolver implements Resolve<Observable<MovieVideos>> {

    /**
     * Constructor
     */
    constructor(
        private _videoService: VideoService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieVideos> | Observable<Observable<MovieVideos>> | Promise<Observable<MovieVideos>> {

        const movieId = route.paramMap.get('id');

        return this._videoService.getByMovieId(+movieId);
    }
}
