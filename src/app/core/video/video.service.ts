import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieVideos } from './video.types';

@Injectable({
    providedIn: 'root'
})
export class VideoService {

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
    getByMovieId(movieId: number): Observable<MovieVideos> {
        return this._httpClient.get<MovieVideos>(`@tmdb/movie/${movieId}/videos`);
    }
}
