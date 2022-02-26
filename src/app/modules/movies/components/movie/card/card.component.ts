import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Movie } from 'app/shared/services/movie/movie.types';

@Component({
    selector: 'movie-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MovieCardComponent {

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
