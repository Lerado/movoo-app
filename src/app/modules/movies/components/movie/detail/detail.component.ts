import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { movooAnimations } from '@movoo/animations';
import { CreditService } from 'app/shared/services/credits/credits.service';
import { MovieCredits } from 'app/shared/services/credits/credits.types';
import { GenreService } from 'app/shared/services/genre/genre.service';
import { MovieGenre } from 'app/shared/services/genre/genre.types';
import { MovieImages } from 'app/shared/services/image/image.types';
import { MovieService } from 'app/shared/services/movie/movie.service';
import { Movie } from 'app/shared/services/movie/movie.types';
import { VideoService } from 'app/shared/services/video/video.service';
import { MovieVideo, MovieVideos } from 'app/shared/services/video/video.types';
import { EmbedVideoService } from 'ngx-embed-video';
import { forkJoin, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'movie-detail',
    templateUrl: './detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: movooAnimations
})
export class MovieDetailComponent implements OnInit, OnDestroy {

    movie$: Observable<Movie>;

    trailer: MovieVideo;
    videos: MovieVideos;
    genres: MovieGenre[];
    credits: MovieCredits;
    images: MovieImages;
    similarMovies: Movie[];
    recommendedMovies: Movie[];

    mainContainer: ElementRef<HTMLElement>;
    actorsContainer: ElementRef<HTMLElement>;
    similarMoviesContainer: ElementRef<HTMLElement>;
    recommendedMoviesContainer: ElementRef<HTMLElement>;

    trailerEmbed: string;
    showTrailer: boolean = false;
    scrollStep: number = 200;
    baseUrl: string = window.location.pathname;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _movieService: MovieService,
        private _genreService: GenreService,
        private _creditService: CreditService,
        private _videoService: VideoService,
        private _embedService: EmbedVideoService,
        private _changeDetector: ChangeDetectorRef,
        private _router: Router
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

        // Init data associated to this movie
        this.movie$.pipe(

            switchMap(movie => forkJoin([

                // Get genres
                this._genreService.genres$.pipe(
                    tap((genres: MovieGenre[]) => {
                        this.genres = genres;
                    })
                ),

                // Get movie credits
                this._creditService.getByMovieId(movie.id).pipe(
                    tap((movieCredits) => {
                        this.credits = movieCredits;
                        this._changeDetector.markForCheck();
                    })
                ),

                // Get movie videos and trailer
                this._videoService.getByMovieId(movie.id).pipe(
                    tap((movieVideos) => {
                        this.videos = movieVideos;
                        this.trailer = this._getTrailer(movieVideos);
                        this._changeDetector.markForCheck();
                    })
                ),

                // Get recommended and similar movies
                this._movieService.getRecommended(movie.id).pipe(
                    tap((recommendedMovies) => {
                        this.recommendedMovies = recommendedMovies;
                        this._changeDetector.markForCheck();
                    })
                ),

                this._movieService.getSimilar(movie.id).pipe(
                    tap((similarMovies) => {
                        this.similarMovies = similarMovies;
                        this._changeDetector.markForCheck();
                    })
                )
            ]))
        ).subscribe();
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
     * Play trailer
     */
    playTrailer(): void {

        if (!this.trailer) { return; }

        if (!this.trailerEmbed) {
            this.trailerEmbed = this._embedService[`embed_${this.trailer.site.toLowerCase()}`](this.trailer.key, {
                attr: {
                    style: 'width:80%;height:80%;'
                }
            });
        }

        this.showTrailer = true;
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

    /**
     * Navigate to details for a movie
     */
    onMovieSelected(movie: Movie): void {
        this._router.navigate(['/movies', movie.id])
        .then(() => {
            this.mainContainer.nativeElement?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get trailer video for this movie
     *
     * @param movieVideos
     */
    private _getTrailer(movieVideos: MovieVideos): MovieVideo {

        const availableTrailers = movieVideos.results.filter(video => video.official && video.type === 'Trailer');

        if (!availableTrailers.length) { return null; }

        const officialTrailer = availableTrailers.find(video => video.name === 'Official Trailer');

        if (officialTrailer) { return officialTrailer; }

        return availableTrailers[0];
    }
}
