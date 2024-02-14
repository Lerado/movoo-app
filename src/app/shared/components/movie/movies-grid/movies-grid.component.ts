import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, Output, input } from '@angular/core';
import { Movie } from 'app/core/movie/movie.types';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgTemplateOutlet } from '@angular/common';
import { MovieLoaderComponent } from '../movie-loader/movie-loader.component';
import { movooAnimations } from '@movoo/animations';

@Component({
    standalone: true,
    imports: [NgTemplateOutlet, MovieCardComponent, MovieLoaderComponent],
    selector: 'movies-grid',
    templateUrl: './movies-grid.component.html',
    styleUrl: './movies-grid.component.scss',
    animations: movooAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesGridComponent {

    @ContentChild('listEmpty') emptyListTemplate: ElementRef;
    @ContentChild('listLoading') loadingListTemplate: ElementRef;

    // Inputs
    movies = input.required<Movie[]>();
    loading = input<boolean>();

    @Output() selected: EventEmitter<Movie> = new EventEmitter<Movie>();

    loadingSkeletonsIds: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Emits when a movie is clicked
     *
     * @param movie
     */
    onMovieSelected(movie): void {
        this.selected.emit(movie);
    }

}
