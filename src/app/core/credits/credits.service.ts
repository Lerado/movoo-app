import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { MovieCredits } from './credits.types';

@Injectable({
    providedIn: 'root'
})
export class CreditService {

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
     * Get credits by movie id
     *
     * @param movieId
     */
    getByMovieId(movieId: number): Observable<MovieCredits> {
        return this._httpClient.get<MovieCredits>(`@tmdb/movie/${movieId}/credits`);
    }
}
