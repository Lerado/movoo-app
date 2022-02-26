import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Movie } from 'app/shared/services/movie/movie.types';

@Component({
    selector: 'movies-grid',
    templateUrl: './grid.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MoviesGridComponent {

    // Inputs
    @Input() movies: Movie[];

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
