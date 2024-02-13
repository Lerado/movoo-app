import { Component, WritableSignal, computed, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MoviesPagination, Movie } from "app/core/movie/movie.types";
import { GetMoviesDto } from "app/core/movie/movies.dto";
import { SettingsService } from "app/core/settings/settings.service";
import { BehaviorSubject, Observable, tap, switchMap, shareReplay, scan, map, combineLatest, of, debounceTime } from "rxjs";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { MovieService } from "app/core/movie/movie.service";

export interface ShouldLoadMovies {
    loadMovies(movieParams: GetMoviesDto): Observable<MoviesPagination>;
}

@Component({ template: '' })
export class BaseMoviesPageComponent implements ShouldLoadMovies {

    private readonly _moviesParams: BehaviorSubject<GetMoviesDto> = new BehaviorSubject<GetMoviesDto>({ page: 1 });
    private _moviesPagination: MoviesPagination;

    isLoadingNext: WritableSignal<boolean | null> = signal(null); // Is the component loading the next page of data

    moviesPagination$: Observable<MoviesPagination> = this.moviesParams$.pipe(
        takeUntilDestroyed(),
        tap(() => this.isLoadingNext.set(true)),
        debounceTime(1000),
        switchMap(moviesParams => this.loadMovies(moviesParams)),
        tap(({ results, ...params }) => this._moviesPagination = params),
        tap(() => this.isLoadingNext.set(false)),
        shareReplay()
    );
    movies = toSignal(this.moviesPagination$.pipe(
        // map(moviesPagination => moviesPagination.results),
        scan((accumulator, { page, results }) => {
            if (page === 1) {
                return results;
            }
            return [...accumulator, ...results]
        }, [] as Movie[]),
        shareReplay()
    ), { initialValue: [], rejectErrors: true });

    featuredMovie = computed(() => this.movies().at(0));

    gridMovies = computed(() => this.movies().slice(1));

    currentUrl = this._route.url;

    /**
     * Constructor
     */
    constructor(
        protected readonly _movieService: MovieService,
        protected readonly _settingsService: SettingsService,
        protected readonly _router: Router,
        protected readonly _route: ActivatedRoute
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
        this._router.navigate([this._router.url, movie.id]);
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
}
