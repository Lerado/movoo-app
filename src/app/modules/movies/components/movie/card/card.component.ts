import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MovieService } from 'app/shared/services/movie/movie.service';

@Component({
    selector: 'movie-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MovieCardComponent {

    // Inputs
    @Input() movie;

    /**
     * Constructor
     */
    constructor(
        private _movieService: MovieService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
