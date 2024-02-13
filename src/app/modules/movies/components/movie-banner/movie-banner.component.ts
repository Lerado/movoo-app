import { DatePipe, DecimalPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { movooAnimations } from '@movoo/animations';
import { GenreService } from 'app/core/genre/genre.service';
import { Movie } from 'app/core/movie/movie.types';
import { TMDBImageUrlPipe } from 'app/shared/pipes/tmdb-image-url.pipe';

@Component({
    selector: 'movie-banner',
    standalone: true,
    templateUrl: './movie-banner.component.html',
    animations: movooAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, NgStyle, MatIconModule, MatButtonModule, TMDBImageUrlPipe, DatePipe, DecimalPipe]
})
export class MovieBannerComponent {

    movie = input.required<Movie>();

    baseUrl = input<string>('/movies');

    genres = toSignal(this._genreService.genres$, { initialValue: [] })
    movieGenresLabels = computed(() => {
        if (!this.genres().length || !this.movie()) {
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
}
