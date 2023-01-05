import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MoviesPagination, Movie } from "app/core/movie/movie.types";
import { GetMoviesDto } from "app/core/movie/movies.dtos";
import { SettingsService } from "app/core/settings/settings.service";
import { BehaviorSubject, Observable, tap, switchMap, shareReplay, scan, filter, map, combineLatest, of } from "rxjs";

@Component({
    templateUrl: './base-movies-page.component.html'
})
export class BaseMoviesPageComponent {

    private readonly _moviesParams: BehaviorSubject<GetMoviesDto> = new BehaviorSubject<GetMoviesDto>({ page: 1 });
    private _moviesPagination: MoviesPagination;

    moviesPagination$: Observable<MoviesPagination> = this.moviesParams$.pipe(
        tap(() => this.isLoadingNext = true),
        switchMap(moviesParams => this.loadMovies(moviesParams)),
        tap(({ results, ...params }) => this._moviesPagination = params),
        tap(() => this.isLoadingNext = false),
        shareReplay()
    );
    movies$: Observable<Movie[]> = this.moviesPagination$.pipe(
        // map(moviesPagination => moviesPagination.results),
        scan((accumulator, { page, results }) => {
            if (page === 1) {
                return results;
            }
            return [...accumulator, ...results]
        }, []),
        shareReplay()
    );
    featuredMovie$: Observable<Movie> = this.movies$.pipe(
        filter(movies => !!movies.length),
        map(movies => movies[0]),
        shareReplay()
    );

    isLoadingNext: boolean = false; // Is the component loading the next page of data

    /**
     * Constructor
     */
    constructor(
        protected readonly _settingsService: SettingsService,
        protected readonly _router: Router,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Computed properties
    // -----------------------------------------------------------------------------------------------------

    get moviesParams$(): Observable<GetMoviesDto> {
        return combineLatest([
            this._moviesParams.asObservable(),
            this._settingsService.settings$]
        ).pipe(
            map(([params, settings]) => ({ ...params, ...settings }))
        );
    }

    set movieParams(value: GetMoviesDto) {
        const currentValue: GetMoviesDto = this._moviesParams.getValue();
        this._moviesParams.next({ ...currentValue, ...value });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Implement this method to load movies
     *
     * @param movieParams
     */
    loadMovies(movieParams: GetMoviesDto): Observable<MoviesPagination> {
        return of();
    }
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

        if (!this._moviesPagination) { return; }

        const { page, total_pages } = this._moviesPagination;

        // Check if we can query the next page
        if (page + 1 <= total_pages) {
            this.movieParams = { page: page + 1 };
        }
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
