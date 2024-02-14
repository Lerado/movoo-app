import { Component, ChangeDetectionStrategy, input, computed } from "@angular/core";
import { GenreService } from "app/core/genre/genre.service";
import { MovieSearchResult } from "app/core/search/search.types";
import { SettingsService } from "app/core/settings/settings.service";
import { TMDBImageUrlPipe } from "../../../../pipes/tmdb-image-url.pipe";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage, DecimalPipe, DatePipe } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: 'multi-search-bar-result-movie',
    templateUrl: './multi-search-bar-result-movie.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgOptimizedImage, MatIconModule, MatTooltipModule, DecimalPipe, DatePipe, TMDBImageUrlPipe]
})
export class MultiSearchBarResultMovieComponent {

    movie = input.required<MovieSearchResult>();

    genres = toSignal(this._genreService.genres$, { initialValue: [] });
    languages = toSignal(this._settingsService.languages$, { initialValue: [] });

    movieGenresLabels = computed(() => {
        if (!this.genres().length) {
            return '';
        }
        return this.movie().genre_ids.map(genreId => this.genres().find(genre => genre.id === genreId).name)
    });
    movieOriginalLanguage = computed(() => this.languages().find(lang => lang.iso_639_1 === this.movie().original_language)?.english_name);

    /**
     * Constructor
     */
    constructor(
        private readonly _genreService: GenreService,
        private readonly _settingsService: SettingsService
    ) { }
}
