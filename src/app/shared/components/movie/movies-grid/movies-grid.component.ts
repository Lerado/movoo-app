import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'app/core/movie/movie.types';
import { SharedModule } from 'app/shared/shared.module';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
    standalone: true,
    imports: [MovieCardComponent, SharedModule],
    selector: 'movies-grid',
    templateUrl: './movies-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
