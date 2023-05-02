import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OnChange } from '@lib/decorators';
import { PersonGender } from 'app/core/people/people.types';
import { MovieSearchResult, PersonSearchResult, TvShowSearchResult } from 'app/core/search/search.types';
import { mediaNameAttribute, mediaRoutes } from '../../search.types';

@Component({
    selector: 'multi-search-bar-result-person',
    templateUrl: './multi-search-bar-result-person.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MultiSearchBarResultPersonComponent {

    @OnChange('_onPersonChange')
    @Input() person: PersonSearchResult;

    genderIcons: Partial<Record<PersonGender, string>> = {
        0: 'mat_solid:face_retouching_off',
        1: 'mat_solid:female',
        2: 'mat_solid:male'
    }

    genderLabels: Partial<Record<PersonGender, string>> = {
        0: 'Unknown gender',
        1: 'Female',
        2: 'Male'
    }

    mediaKnownFor: Array<MovieSearchResult | TvShowSearchResult>;
    mediaRoutes = mediaRoutes;
    mediaNameAttribute = mediaNameAttribute;

    /**
     * Constructor
     */
    constructor() { }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On person change
     *
     * @param person
     */
    private _onPersonChange(person: PersonSearchResult): void {

        // Media known for
        this.mediaKnownFor = person.known_for;
    }
}
