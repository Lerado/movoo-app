import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentLoaderModule } from '@ngneat/content-loader';

@Component({
    standalone: true,
    imports: [ContentLoaderModule],
    selector: 'movie-loader',
    templateUrl: './movie-loader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class MovieLoaderComponent { }
