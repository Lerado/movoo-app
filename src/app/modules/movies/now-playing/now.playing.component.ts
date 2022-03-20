/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'app/shared/services/movie/movie.service';
import { Movie, MoviesPagination } from 'app/shared/services/movie/movie.types';
import { Observable, of, Subject, switchMap, take, takeUntil } from 'rxjs';

@Component({
    selector: 'movies-now-playing',
    templateUrl: './now-playing.component.html'
})
export class MoviesNowPlayingComponent implements OnInit, OnDestroy {

    movies$: Observable<Movie[]>;
    moviesPagination$: Observable<MoviesPagination>;
    featuredMovie: Movie;

    isLoadingNext: boolean = false; // Is the component loading the next page of data

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _movieService: MovieService,
        private _router: Router
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Set movies observable
        this.movies$ = this._movieService.movies$.pipe(takeUntil(this._unsubscribeAll));

        // Set movies pagination observable
        this.moviesPagination$ = this._movieService.moviesPagination$.pipe(takeUntil(this._unsubscribeAll));

        this.movies$.subscribe((movies: Movie[]) => {

            // Get featured movies
            if (movies.length && !this.featuredMovie) {
                this.featuredMovie = movies[0];
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show movie details
     *
     * @param movie
     */
    showDetails(movie: Movie): void {
        this._router.navigate(['/movies', movie.id]);
    }

    /**
     * Infinite scroll trigger
     */
    onContentScrolled(): void {

        // Get current pagination
        this.moviesPagination$.pipe(

            take(1),

            switchMap(({ page, total_pages }) => {

                this.isLoadingNext = true;

                // Check if we can query the next page
                if (page + 1 > total_pages) {
                    return of([]);
                }

                return this._movieService.getNowPlayed({ page: page + 1 }, true);
            })

        ).subscribe(() => this.isLoadingNext = false);
    }

    /**
     * Creates an array of `times` `value`
     *
     * @param value
     * @param times
     */
    repeat(value: any, times: number): any[] {

        const result = [];

        for (let index = 0; index < times; index++) {
            result.push(value);
        }

        return result;
    }
}
