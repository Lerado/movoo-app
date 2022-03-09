import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, tap } from 'rxjs';
import { MovieImages } from './image.types';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private _movieImages: ReplaySubject<MovieImages> = new ReplaySubject<MovieImages>(1);

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
     public get movieImages$(): Observable<MovieImages> {
        return this._movieImages.asObservable();
    }

    /**
     * Setter for movies
     */
    public set movieImages(value: MovieImages) {
        this._movieImages.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get images for a movie
     *
     * @param movieId
     */
    getByMovieId(movieId: number): Observable<MovieImages> {
        return this._httpClient.get<MovieImages>(`@tmdb/movie/${ movieId }/images`).pipe(
            tap((movieImages) => {
                console.log(movieImages);
                this._movieImages.next(movieImages);
            })
        );
    }
}
