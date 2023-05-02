import { Component, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, filter, finalize, iif, map, Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { MultiSearchDto, multiSearchDtoDefault } from "app/core/search/search.dtos";
import { SettingsService } from 'app/core/settings/settings.service';
import { MediaType, MultiSearchResult } from 'app/core/search/search.types';
import { SearchService } from 'app/core/search/search.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MultiSearchBarResultModule } from '../multi-search-bar-result/multi-search-bar-result.module';
import { RouterModule } from '@angular/router';
import { mediaNameAttribute } from '../search.types';

@Component({
    selector: 'multi-search-bar',
    standalone: true,
    imports: [
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MultiSearchBarResultModule,
        SharedModule
    ],
    templateUrl: './multi-search-bar.component.html',
    styleUrls: ['./multi-search-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MultiSearchBarComponent {

    queryControl: FormControl<string> = new FormControl<string>('');

    loading$: Observable<boolean> = of(false);

    searchParams$: Observable<MultiSearchDto> = this.queryControl.valueChanges.pipe(
        debounceTime(500),
        // tap(value => this.loading$ = of(value.length > 0)),
        filter(value => value.length === 0 || value.length > 1),
        distinctUntilChanged(),
        withLatestFrom(this._settingsService.settings$),
        map(([query, settings]) => ({ query, ...settings, ...multiSearchDtoDefault }))
    );

    searchResults$: Observable<MultiSearchResult[]> = this.searchParams$.pipe(
        tap(() => this.loading$ = of(true)),
        switchMap(params => iif(
            () => params.query !== '',
            this._searchService.search(params),
            of({ results: [] as MultiSearchResult[] })
        )
            .pipe(finalize(() => this.loading$ = of(false)))
        ),
        map(pagination => pagination.results.filter(result => result.media_type !== MediaType.Tv))
    );

    detailsRoutes: Record<MediaType, string> = {
        'movie': 'movies',
        'person': 'people',
        'tv': 'tv-shows'
    }

    mediaNameAttribute: Record<MediaType, string> = mediaNameAttribute;

    /**
     * Constructor
     */
    constructor(
        private readonly _searchService: SearchService,
        private readonly _settingsService: SettingsService
    ) { }
}
