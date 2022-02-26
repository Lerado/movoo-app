import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Movie } from 'app/shared/services/movie/movie.types';

@Component({
    selector: 'movie-banner',
    templateUrl: './banner.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MovieBannerComponent {

    // Inputs
    @Input() movie: Movie;

    /**
     * Constructor
     */
    constructor() { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
