import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, shareReplay, take, tap } from 'rxjs';
import { MovieGenre } from './genre.types';

@Injectable({
    providedIn: 'root'
})
export class GenreService {

    genres$ = this._httpClient.get<{ genres: MovieGenre[] }>('@tmdb/genre/movie/list')
        .pipe(
            map(({ genres }) => genres),
            shareReplay()
        );

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
     * Get movies genres
     */
    getAll(): Observable<MovieGenre[]> {
        return this.genres$.pipe(take(1));
    }
}
