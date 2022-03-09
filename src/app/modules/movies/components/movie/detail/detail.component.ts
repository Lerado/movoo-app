import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CreditService } from 'app/shared/services/credits/credits.service';
import { MovieCredits } from 'app/shared/services/credits/credits.types';
import { GenreService } from 'app/shared/services/genre/genre.service';
import { MovieGenre } from 'app/shared/services/genre/genre.types';
import { ImageService } from 'app/shared/services/image/image.service';
import { MovieImages } from 'app/shared/services/image/image.types';
import { MovieService } from 'app/shared/services/movie/movie.service';
import { Movie } from 'app/shared/services/movie/movie.types';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'movie-detail',
    templateUrl: './detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailComponent implements OnInit, OnDestroy {

    movie$: Observable<Movie>;

    genres: MovieGenre[];
    credits: MovieCredits;
    images: MovieImages;

    actorsContainer: ElementRef<HTMLElement>;
    scrollStep: number = 200;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _movieService: MovieService,
        private _genreService: GenreService,
        private _creditService: CreditService,
        private _imageService: ImageService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Init observable for movie
        this.movie$ = this._movieService.movie$.pipe(
            takeUntil(this._unsubscribeAll)
        );

        // Get genres
        this._genreService.genres$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((genres: MovieGenre[]) => {
                this.genres = genres;
            });

        // Get movie credits
        this._creditService.movieCredits$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((movieCredits) => {
                this.credits = movieCredits;
            });

        // Get movie images
        this._imageService.movieImages$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((movieImages) => {
                this.images = movieImages;
            });

        this.movie$.subscribe(console.log);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Map genres ids to genre labels
     *
     * @param movie
     */
    getGenres(movie: Movie): string[] {

        if (movie.genres) {
            return movie.genres.map(genre => genre.name);
        }

        return movie.genre_ids.map(genreId => this.genres.find(genre => genre.id === genreId).name);
    }

    /**
     * Map production countries to their labels
     *
     * @param movie
     */
    getProductionCountries(movie: Movie): string[] {
        return movie.production_countries.map(country => country.name);
    }

    /**
     * Get production director name
     */
    getDirectorName(): string {

        // Get director object
        const director = this.credits.crew.find(member => member.department === 'Directing' && member.job === 'Director');

        return director?.name || '';
    }

    /**
     * Scroll element horizontally
     *
     * @param element
     * @param offsetX
     */
    scrollX(element: ElementRef<HTMLElement>, offsetX?: number): void {
        element?.nativeElement.scrollBy({ top: 0, left: offsetX || this.scrollStep, behavior: 'smooth' });
    }
}
