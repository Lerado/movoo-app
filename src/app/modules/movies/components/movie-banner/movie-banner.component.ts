import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { OnChange } from '@lib/decorators';
import { GenreService } from 'app/core/genre/genre.service';
import { Movie } from 'app/core/movie/movie.types';
import { map, Observable, of } from 'rxjs';

@Component({
    selector: 'movie-banner',
    templateUrl: './movie-banner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieBannerComponent {

    @OnChange('_getMovieGenresLabels')
    @Input() movie: Movie;

    @Input() baseUrl: string = '/movies';

    movieGenresLabels$: Observable<string>;

    /**
     * Constructor
     */
    constructor(
        private readonly _genreService: GenreService,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Map genres ids to genre labels
     *
     * @param movie
     */
    private _getMovieGenresLabels(movie: Movie): void {

        if (!movie) { return; }

        if (movie.genres) {
            this.movieGenresLabels$ = of(movie.genres.map(genre => genre.name).join(', '));
        }
        else {
            this.movieGenresLabels$ = this._genreService.genres$.pipe(
                map((genres) => movie.genre_ids.map(genreId => genres.find(genre => genre.id === genreId).name).join(', '))
            );
        }
    }
}
