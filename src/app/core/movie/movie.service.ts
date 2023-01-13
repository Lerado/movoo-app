/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MoviesPagination } from './movie.types';
import { GetMovieDto, GetMoviesDto, getMoviesDtoDefault } from './movies.dtos';

@Injectable({
    providedIn: 'root'
})
export class MovieService {


    /**
     * Constructor
     */
    constructor(
        private readonly _httpClient: HttpClient
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get movie by ID
     *
     * @param id
     */
    getById(movieId: number, params?: GetMovieDto): Observable<Movie> {
        return this._httpClient.get<Movie>(`@tmdb/movie/${movieId}`, { params: { ...params } });
    }

    /**
     * Get movies playing now
     *
     * @param params
     */
    getNowPlaying(params?: GetMoviesDto): Observable<MoviesPagination> {
        return this._httpClient.get<MoviesPagination>('@tmdb/movie/now_playing', { params: { ...getMoviesDtoDefault, ...params } });
    }

    /**
     * Get upcoming movies
     *
     * @param params
     */
    getUpcoming(params?: GetMoviesDto): Observable<MoviesPagination> {
        return this._httpClient.get<MoviesPagination>('@tmdb/movie/upcoming', { params: { ...getMoviesDtoDefault, ...params } });
    }

    /**
     * Get popular movies
     *
     * @param params
     */
    getPopular(params?: GetMoviesDto): Observable<MoviesPagination> {
        return this._httpClient.get<MoviesPagination>('@tmdb/movie/popular', { params: { ...getMoviesDtoDefault, ...params } });
    }

    /**
     * Get top rated movies
     *
     * @param params
     */
    getTopRated(params?: GetMovieDto): Observable<MoviesPagination> {
        return this._httpClient.get<MoviesPagination>('@tmdb/movie/top_rated', { params: { ...getMoviesDtoDefault, ...params } });
    }

    /**
     * Get movies recommended for a movie
     *
     * @param movieId
     * @param params
     */
    getRecommended(movieId: number, params?: GetMoviesDto): Observable<MoviesPagination> {
        return this._httpClient.get<MoviesPagination>(`@tmdb/movie/${movieId}/recommendations`, { params: { ...getMoviesDtoDefault, ...params } });
    }

    /**
     * Get movies similar to a movie
     *
     * @param movieId
     * @param params
     */
    getSimilar(movieId: number, params?: GetMoviesDto): Observable<MoviesPagination> {
        return this._httpClient.get<MoviesPagination>(`@tmdb/movie/${movieId}/similar`, { params: { ...getMoviesDtoDefault, ...params } });
    }
}
