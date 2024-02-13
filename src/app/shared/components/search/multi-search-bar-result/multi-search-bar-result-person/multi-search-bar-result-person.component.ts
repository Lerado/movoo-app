import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PersonGender } from 'app/core/people/people.types';
import { PersonSearchResult } from 'app/core/search/search.types';
import { mediaNameAttribute, mediaRoutes } from '../../search.types';
import { TMDBImageUrlPipe } from '../../../../pipes/tmdb-image-url.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage, DecimalPipe } from '@angular/common';

@Component({
    selector: 'multi-search-bar-result-person',
    templateUrl: './multi-search-bar-result-person.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgOptimizedImage, MatIconModule, RouterLink, MatTooltipModule, DecimalPipe, TMDBImageUrlPipe]
})

export class MultiSearchBarResultPersonComponent {

    person = input.required<PersonSearchResult>();
    mediaKnownFor = computed(() => this.person().known_for);

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

    mediaRoutes = mediaRoutes;
    mediaNameAttribute = mediaNameAttribute;
}
