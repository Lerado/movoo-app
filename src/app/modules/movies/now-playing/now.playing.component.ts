import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'app/shared/services/movie/movie.service';
import { Movie } from 'app/shared/services/movie/movie.types';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'movies-now-playing',
    templateUrl: './now-playing.component.html'
})
export class MoviesNowPlayingComponent implements OnInit, OnDestroy {

    movies$: Observable<Movie[]>;
    featuredMovie: Movie;

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
}
