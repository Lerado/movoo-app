import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { MovieGenre } from './genre.types';

@Injectable({
    providedIn: 'root'
})
export class GenreService {

    private readonly _genres: ReplaySubject<MovieGenre[]> = new ReplaySubject<MovieGenre[]>(1);

    /**
     * Constructor
     */
    constructor(
        private readonly _httpClient: HttpClient
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for genres
     */
    get genres$(): Observable<MovieGenre[]> {
        return this._genres.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get movies genres
     */
    getAll(): Observable<MovieGenre[]> {
        return this._httpClient.get<{ genres: MovieGenre[] }>('@tmdb/genre/movie/list').pipe(
            map(response => response.genres),
            tap((genres: MovieGenre[]) => {
                this._genres.next(genres);
            })
        );
    }
}
