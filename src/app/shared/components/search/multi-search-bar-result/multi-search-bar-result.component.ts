import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MultiSearchResult } from 'app/core/search/search.types';

@Component({
    selector: 'multi-search-bar-result',
    templateUrl: './multi-search-bar-result.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSearchBarResultComponent {

    @Input() media: MultiSearchResult;
}
