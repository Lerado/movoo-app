import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OnChange } from '@lib/decorators';
import { GenreService } from 'app/core/genre/genre.service';
import { Movie } from 'app/core/movie/movie.types';
import { SharedModule } from 'app/shared/shared.module';
import { map, Observable, of } from 'rxjs';

@Component({
    standalone: true,
    imports: [MatIconModule, SharedModule],
    selector: 'movie-card',
    templateUrl: './movie-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {

    @OnChange('_getMovieGenresLabels')
    @Input() movie: Movie;

    @Output() selected: EventEmitter<Movie> = new EventEmitter<Movie>();

    movieGenresLabels$: Observable<string>;

    /**
     * Constructor
     */
    constructor(
        private readonly _genreService: GenreService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Navigate to details for a movie
     */
    onMovieSelected(): void {
        this.selected.emit(this.movie);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Map genres ids to genre labels
     *
     * @param movie
     */
    private _getMovieGenresLabels(movie: Movie): void {

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
