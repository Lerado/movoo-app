import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { movooAnimations } from '@movoo/animations';
import { CreditService } from 'app/core/credits/credits.service';
import { MovieCredit, MovieCredits } from 'app/core/credits/credits.types';
import { GenreService } from 'app/core/genre/genre.service';
import { MovieGenre } from 'app/core/genre/genre.types';
import { MovieService } from 'app/core/movie/movie.service';
import { Movie } from 'app/core/movie/movie.types';
import { SettingsService } from 'app/core/settings/settings.service';
import { VideoService } from 'app/core/video/video.service';
import { MovieVideo, MovieVideos } from 'app/core/video/video.types';
import { BreadcrumbsService } from 'app/layout/common/breadcrumbs/breadcrumbs.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { combineLatestWith, map, Observable, shareReplay, switchMap, take, tap } from 'rxjs';

@Component({
    selector: 'movie-details-page',
    templateUrl: './movie-details-page.component.html',
    animations: movooAnimations
})
export class MovieDetailsPageComponent {

    movie$: Observable<Movie> = this._settingsService.settings$.pipe(
        switchMap(({ language }) => this._movieService.getById(+this._route.snapshot.paramMap.get('id'), { language })),
        tap(movie => this._breadcrumbsService.setMarkers({ movie_title: movie.title })),
        shareReplay()
    ) ;
    movieProductionCountries$: Observable<string> = this.movie$.pipe(
        map(movie => this._getMovieProductionCountries(movie)),
        shareReplay()
    );

    movieVideos$: Observable<MovieVideos> = this.movie$.pipe(
        switchMap(movie => this._videoService.getByMovieId(movie.id)),
        shareReplay()
    );
    movieTrailer$: Observable<MovieVideo> = this.movieVideos$.pipe(
        map(videos => this._getTrailer(videos)),
        shareReplay()
    );

    movieCredits$: Observable<MovieCredits> = this.movie$.pipe(
        switchMap(movie => this._creditService.getByMovieId(movie.id)),
        shareReplay()
    );
    movieDirector$: Observable<MovieCredit> = this.movieCredits$.pipe(
        map(credits => this._getMovieDirector(credits)),
        shareReplay()
    );

    similarMovies$: Observable<Movie[]> = this.movie$.pipe(
        switchMap(movie => this._movieService.getSimilar(movie.id)),
        map(pagination => pagination.results),
        shareReplay()
    );
    recommendedMovies$: Observable<Movie[]> = this.movie$.pipe(
        switchMap(movie => this._movieService.getRecommended(movie.id)),
        map(pagination => pagination.results),
        shareReplay()
    );

    movieGenresLabels$: Observable<string> = this.movie$.pipe(
        combineLatestWith(this._genreService.genres$),
        map(([movie, genres]) => this._getMovieGenresLabels(movie, genres)),
        shareReplay()
    );

    mainContainer: ElementRef<HTMLElement>;
    actorsContainer: ElementRef<HTMLElement>;
    similarMoviesContainer: ElementRef<HTMLElement>;
    recommendedMoviesContainer: ElementRef<HTMLElement>;

    trailerEmbed: string;
    showTrailer: boolean = false;
    scrollStep: number = 200;
    baseUrl: string = window.location.pathname;

    /**
     * Constructor
     */
    constructor(
        private readonly _movieService: MovieService,
        private readonly _genreService: GenreService,
        private readonly _creditService: CreditService,
        private readonly _videoService: VideoService,
        private readonly _embedService: EmbedVideoService,
        private readonly _settingsService: SettingsService,
        private readonly _breadcrumbsService: BreadcrumbsService,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Play trailer
     */
    playTrailer(): void {

        this.movieTrailer$.pipe(take(1)).subscribe((movieTrailer) => {

            if (!this.trailerEmbed) {
                this.trailerEmbed = this._embedService[`embed_${movieTrailer.site.toLowerCase()}`](movieTrailer.key, {
                    attr: {
                        style: 'width:80%;height:80%;'
                    }
                });
            }

            this.showTrailer = true;
        });
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

    /**
     * Map genres ids to genre labels
     *
     * @param movie
     */
    private _getMovieGenresLabels(movie: Movie, genres: MovieGenre[]): string {

        if (movie.genres) {
            return movie.genres.map(genre => genre.name).join(', ');
        }
        else {
            return movie.genre_ids.map(genreId => genres.find(genre => genre.id === genreId).name).join(', ');
        }
    }

    /**
     * Get production director name
     */
    private _getMovieDirector(credits: MovieCredits): MovieCredit {
        // Get director object
        return credits.crew.find(member => member.department === 'Directing' && member.job === 'Director');
    }

    /**
     * Map production countries to their labels
     *
     * @param movie
     */
    private _getMovieProductionCountries(movie: Movie): string {
        return movie.production_countries.map(country => country.name).join(', ');
    }
}
