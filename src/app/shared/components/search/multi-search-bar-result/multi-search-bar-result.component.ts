import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { MultiSearchResult } from 'app/core/search/search.types';
import { MultiSearchBarResultPersonComponent } from './multi-search-bar-result-person/multi-search-bar-result-person.component';
import { MultiSearchBarResultMovieComponent } from './multi-search-bar-result-movie/multi-search-bar-result-movie.component';

@Component({
    selector: 'multi-search-bar-result',
    templateUrl: './multi-search-bar-result.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MultiSearchBarResultMovieComponent, MultiSearchBarResultPersonComponent]
})
export class MultiSearchBarResultComponent {

    media = input.required<MultiSearchResult>();
}
