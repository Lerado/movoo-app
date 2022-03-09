import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { MovieCredits } from './credits.types';

@Injectable({
    providedIn: 'root'
})
export class CreditService {

    private _movieCredits: ReplaySubject<MovieCredits> = new ReplaySubject<MovieCredits>(1);

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
     * Getter for movie credits
     */
    public get movieCredits$(): Observable<MovieCredits> {
        return this._movieCredits.asObservable();
    }

    /**
     * Setter for movies
     */
    public set movieCredits(value: MovieCredits) {
        this._movieCredits.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get credits by movie id
     *
     * @param movieId
     */
    getByMovieId(movieId: number): Observable<MovieCredits> {
        return this._httpClient.get<MovieCredits>(`@tmdb/movie/${ movieId }/credits`).pipe(
            tap((movieCredits) => {
                this._movieCredits.next(movieCredits);
            })
        );
    }
}
