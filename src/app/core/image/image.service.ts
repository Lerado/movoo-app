import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, tap } from 'rxjs';
import { MovieImages } from './image.types';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

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
     * Get images for a movie
     *
     * @param movieId
     */
    getByMovieId(movieId: number): Observable<MovieImages> {
        return this._httpClient.get<MovieImages>(`@tmdb/movie/${movieId}/images`);
    }
}
