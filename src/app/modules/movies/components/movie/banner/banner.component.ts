import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MovieGenreService } from 'app/shared/services/genre/genre.service';
import { MovieGenre } from 'app/shared/services/genre/genre.types';
import { Movie } from 'app/shared/services/movie/movie.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'movie-banner',
    templateUrl: './banner.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MovieBannerComponent implements OnInit, OnDestroy {

    // Inputs
    @Input() movie: Movie;

    genres: MovieGenre[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _movieGenreService: MovieGenreService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Get genres
        this._movieGenreService.genres$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((genres: MovieGenre[]) => {
                this.genres = genres;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Map genres ids to genre labels
     *
     * @param genresIds
     */
    getGenres(genresIds: number[]): string[] {
        return genresIds.map(genreId => this.genres.find(genre => genre.id === genreId).name);
    }
}
