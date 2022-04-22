/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';
import { Movie, MoviesPagination } from './movie.types';
import { GetMoviesDto, getMoviesDtoDefault } from './movies.dtos';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    private _movies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
    private _movie: ReplaySubject<Movie> = new ReplaySubject<Movie>(1);

    private _pagination: ReplaySubject<MoviesPagination> = new ReplaySubject<MoviesPagination>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for movies
     */
    public get movies$(): Observable<Movie[]> {
        return this._movies.asObservable();
    }

    /**
     * Getter for movie
     */
    public get movie$(): Observable<Movie> {
        return this._movie.asObservable();
    }

    /**
     * Getter for movies pagination
     */
    public get moviesPagination$(): Observable<MoviesPagination> {
        return this._pagination.asObservable();
    }

    /**
     * Setter for movies
     */
    public set movies(value: Movie[]) {
        this._movies.next(value);
    }

    /**
     * Setter for movies
     */
    public set movie(value: Movie) {
        this._movie.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get movie by ID
     *
     * @param id
     */
    getById(movieId: number): Observable<Movie> {
        return this._httpClient.get<Movie>(`@tmdb/movie/${movieId}`).pipe(
            tap((movie: Movie) => {
                this._movie.next(movie);
            })
        );
    }

    /**
     * Get movies playing now
     *
     * @param params
     */
    getNowPlaying(params: GetMoviesDto = getMoviesDtoDefault, keepState: boolean = false): Observable<Movie[]> {
        return this._parse(
            this._httpClient.get<MoviesPagination>('@tmdb/movie/now_playing', { params: params as HttpParams }),
            keepState
        );
    }

    /**
     * Get now played movies
     *
     * @param params
     */
    getUpcoming(params: GetMoviesDto = getMoviesDtoDefault, keepState: boolean = false): Observable<Movie[]> {
        return this._parse(
            this._httpClient.get<MoviesPagination>('@tmdb/movie/upcoming', { params: params as HttpParams }),
            keepState
        );
    }

    /**
     * Get movies recommended for a movie
     *
     * @param movieId
     * @param params
     */
    getRecommended(movieId: number, params: GetMoviesDto = getMoviesDtoDefault, keepState: boolean = false): Observable<Movie[]> {
        return this._parse(
            this._httpClient.get<MoviesPagination>(`@tmdb/movie/${movieId}/recommendations`, { params: params as HttpParams }),
            keepState
        );
    }

    /**
     * Get movies similar to a movie
     *
     * @param movieId
     * @param params
     */
    getSimilar(movieId: number, params: GetMoviesDto = getMoviesDtoDefault, keepState: boolean = false): Observable<Movie[]> {
        return this._parse(
            this._httpClient.get<MoviesPagination>(`@tmdb/movie/${movieId}/similar`, { params: params as HttpParams }),
            keepState
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Parse movies response
     *
     * @param response
     */
    private _parse(response: Observable<MoviesPagination>, keepState: boolean = false): Observable<Movie[]> {

        return response.pipe(

            tap(({ page, dates, total_pages, total_results }) => {
                this._pagination.next({ page, dates, total_pages, total_results });
            }),

            tap((moviesPagination: MoviesPagination) => {

                if (keepState) {

                    const currentPage = moviesPagination.page;

                    // Set movies
                    if (currentPage === 1) {
                        this._movies.next(moviesPagination.results);
                    }
                    else {
                        this._movies.next([...this._movies.getValue(), ...moviesPagination.results]);
                    }
                }

            }),

            map(moviePagination => moviePagination.results)
        );
    }

}
