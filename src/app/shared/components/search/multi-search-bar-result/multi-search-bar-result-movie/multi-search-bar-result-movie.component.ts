import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { OnChange } from "@lib/decorators";
import { GenreService } from "app/core/genre/genre.service";
import { MovieSearchResult } from "app/core/search/search.types";
import { SettingsService } from "app/core/settings/settings.service";
import { Observable, map } from "rxjs";

@Component({
    selector: 'multi-search-bar-result-movie',
    templateUrl: './multi-search-bar-result-movie.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSearchBarResultMovieComponent {

    @OnChange('_onMovieChange')
    @Input() movie: MovieSearchResult;

    movieGenresLabels$: Observable<string>;
    movieOriginalLanguage$: Observable<string>;

    /**
     * Constructor
     */
    constructor(
        private readonly _genreService: GenreService,
        private readonly _settingsService: SettingsService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On movie change
     *
     * @param media
     */
    private _onMovieChange(movie: MovieSearchResult): void {

        // Get movie genres labels
        this.movieGenresLabels$ = this._genreService.genres$.pipe(
            map((genres) => (movie as MovieSearchResult).genre_ids.map(genreId => genres.find(genre => genre.id === genreId).name).join(', '))
        );

        // Get original movie language
        this.movieOriginalLanguage$ = this._settingsService.languages$.pipe(
            map((languages) => languages.find(lang => lang.iso_639_1 === movie.original_language)?.english_name)
        );
    }
}
