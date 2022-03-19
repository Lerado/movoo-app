import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, tap } from 'rxjs';
import { MovieVideos } from './video.types';

@Injectable({
    providedIn: 'root'
})
export class VideoService {

    private _movieVideos: ReplaySubject<MovieVideos> = new ReplaySubject<MovieVideos>(1);

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
     * Getter for movie videos
     */
    get movieVideos$(): Observable<MovieVideos> {
        return this._movieVideos.asObservable();
    }

    /**
     * Setter for movie videos
     */
    set movieVideos(value: MovieVideos) {
        this._movieVideos.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get images for a movie
     *
     * @param movieId
     */
    getByMovieId(movieId: number): Observable<MovieVideos> {
        return this._httpClient.get<MovieVideos>(`@tmdb/movie/${movieId}/videos`).pipe(
            tap((movieVideos) => {
                this._movieVideos.next(movieVideos);
            })
        );
    }
}
