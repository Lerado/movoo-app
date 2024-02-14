import { DatePipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, input, Input, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { OnChange } from '@lib/decorators';
import { GenreService } from 'app/core/genre/genre.service';
import { Movie } from 'app/core/movie/movie.types';
import { TMDBImageUrlPipe } from 'app/shared/pipes/tmdb-image-url.pipe';

import { map, Observable, of } from 'rxjs';

@Component({
    standalone: true,
    imports: [MatIconModule, NgOptimizedImage, TMDBImageUrlPipe, DatePipe, DecimalPipe],
    selector: 'movie-card',
    templateUrl: './movie-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {

    movie = input.required<Movie>();

    @Output() selected: EventEmitter<Movie> = new EventEmitter<Movie>();

    genres = toSignal(this._genreService.genres$, { initialValue: [] })
    movieGenresLabels = computed(() => {
        if (!this.genres().length) {
            return '';
        }
        if (this.movie().genres) {
            return this.movie().genres.map(genre => genre.name).join(', ');
        }
        return this.movie().genre_ids.map(genreId => this.genres().find(genre => genre.id === genreId).name).join(', ');
    });

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
        this.selected.emit(this.movie());
    }
}
