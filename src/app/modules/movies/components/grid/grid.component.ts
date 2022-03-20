import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Movie } from 'app/shared/services/movie/movie.types';

@Component({
    selector: 'movies-grid',
    templateUrl: './grid.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MoviesGridComponent {

    // Inputs
    @Input() movies: Movie[];
    @Output() selected: EventEmitter<Movie> = new EventEmitter<Movie>();

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

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    /**
     * Emits when a movie is clicked
     *
     * @param movie
     */
    onMovieSelected(movie): void {
        this.selected.emit(movie);
    }

}
