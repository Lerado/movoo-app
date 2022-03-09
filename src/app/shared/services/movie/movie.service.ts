import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { Movie, MoviesPagination } from './movie.types';
import { GetMoviesDto, getMoviesDtoDefault } from './movies.dtos';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    private _movies: ReplaySubject<Movie[]> = new ReplaySubject<Movie[]>(1);
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
        return this._httpClient.get<Movie>(`@tmdb/movie/${ movieId }`).pipe(
            tap((movie: Movie) => {
                this._movie.next(movie);
            })
        );
    }

    /**
     * Get now played movies
     *
     * @param params
     */
    getNowPlayed(params: GetMoviesDto = getMoviesDtoDefault): Observable<Movie[]> {
        return this._parse(
            this._httpClient.get<MoviesPagination>('@tmdb/movie/now_playing', { params: params as HttpParams })
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
    private _parse(response: Observable<MoviesPagination>): Observable<Movie[]> {
        return response.pipe(
            tap((moviePagination: MoviesPagination) => {

                // Set movies
                this._movies.next(moviePagination.results);

                // Set pagination
                this._pagination.next(moviePagination);
            }),
            map((moviePagination_: MoviesPagination) => moviePagination_.results)
        );
    }

}
