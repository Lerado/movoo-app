import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { MovieGenre } from './genre.types';

@Injectable({
    providedIn: 'root'
})
export class GenreService {

    private _genres: ReplaySubject<MovieGenre[]> = new ReplaySubject<MovieGenre[]>(1);
    private _genre: ReplaySubject<MovieGenre> = new ReplaySubject<MovieGenre>(1);

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
     * Getter for genres
     */
    public get genres$(): Observable<MovieGenre[]> {
        return this._genres.asObservable();
    }

    /**
     * Setter for genres
     */
    public set genres(value: MovieGenre[]) {
        this._genres.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get movies genres
     */
    get(): Observable<MovieGenre[]> {
        return this._httpClient.get<{ genres: MovieGenre[] }>('@tmdb/genre/movie/list').pipe(
            map(response => response.genres),
            tap((genres: MovieGenre[]) => {
                this._genres.next(genres);
            })
        );
    }
}
