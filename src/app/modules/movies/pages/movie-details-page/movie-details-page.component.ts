import { CurrencyPipe, DatePipe, DecimalPipe, NgOptimizedImage, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, computed, input, numberAttribute, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { movooAnimations } from '@movoo/animations';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { CreditService } from 'app/core/credits/credits.service';
import { GenreService } from 'app/core/genre/genre.service';
import { MovieService } from 'app/core/movie/movie.service';
import { Movie } from 'app/core/movie/movie.types';
import { SettingsService } from 'app/core/settings/settings.service';
import { VideoService } from 'app/core/video/video.service';
import { BreadcrumbsService } from 'app/layout/common/breadcrumbs/breadcrumbs.service';
import { ContentLayoutComponent } from 'app/shared/components/content-layout/content-layout.component';
import { HorizontalScrollContainerComponent } from 'app/shared/components/horizontal-scroll-container/horizontal-scroll-container.component';
import { TMDBImageUrlPipe } from 'app/shared/pipes/tmdb-image-url.pipe';
import { combineLatestWith, map, shareReplay, switchMap, tap } from 'rxjs';
import { MovieCardComponent } from 'app/shared/components/movie/movie-card/movie-card.component';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
    selector: 'movie-details-page',
    templateUrl: './movie-details-page.component.html',
    animations: movooAnimations,
    standalone: true,
    imports: [NgTemplateOutlet, NgStyle, MatIconModule, MatTooltipModule, MatTabsModule, NgOptimizedImage, YouTubePlayer, ContentLayoutComponent, HorizontalScrollContainerComponent, MovieCardComponent, ContentLoaderModule, DecimalPipe, DatePipe, CurrencyPipe, TMDBImageUrlPipe]
})
export class MovieDetailsPageComponent {

    movieId = input(undefined, { transform: numberAttribute });
    movieId$ = toObservable(this.movieId);

    movie = toSignal(this.movieId$.pipe(
        combineLatestWith(this._settingsService.settings$),
        switchMap(([movieId, { language }]) => this._movieService.getById(movieId, { language })),
        tap(movie => this._breadcrumbsService.setMarkers({ movie_title: movie.title })),
        shareReplay()
    ));

    movieProductionCountries = computed(() => this.movie().production_countries.map(country => country.name).join(', '));

    movieVideos = toSignal(this.movieId$.pipe(
        switchMap(movieId => this._videoService.getByMovieId(movieId)),
        map(({ results }) => results)
    ), { initialValue: [] });
    movieTrailer = computed(() => {
        const availableTrailers = this.movieVideos().filter(video => video.official && video.type === 'Trailer');
        if (!availableTrailers.length) { return null; }
        const officialTrailer = availableTrailers.find(video => video.name === 'Official Trailer');
        if (officialTrailer) { return officialTrailer; }
        return availableTrailers[0];
    });

    movieCredits = toSignal(this.movieId$.pipe(
        switchMap(movieId => this._creditService.getByMovieId(movieId))
    ));
    movieDirector = computed(() => this.movieCredits().crew.find(member => member.department === 'Directing' && member.job === 'Director'));

    similarMovies = toSignal(this.movieId$.pipe(
        switchMap(movieId => this._movieService.getSimilar(movieId)),
        map(pagination => pagination.results)
    ), { initialValue: [] });

    recommendedMovies = toSignal(this.movieId$.pipe(
        switchMap(movieId => this._movieService.getRecommended(movieId)),
        map(pagination => pagination.results)
    ), { initialValue: [] });

    movieGenres = toSignal(this._genreService.genres$, { initialValue: [] });
    movieGenresLabels = computed(() => {
        if (!this.movieGenres().length) {
            return '';
        }
        if (this.movie().genres) {
            return this.movie().genres.map(genre => genre.name).join(', ');
        }
        else {
            return this.movie().genre_ids.map(genreId => this.movieGenres().find(genre => genre.id === genreId).name).join(', ');
        }
    });

    mainContainer: ElementRef<HTMLElement>;
    actorsContainer: ElementRef<HTMLElement>;
    similarMoviesContainer: ElementRef<HTMLElement>;
    recommendedMoviesContainer: ElementRef<HTMLElement>;

    trailerEmbed = signal<string>('');
    showTrailer = signal(false);

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
        private readonly _settingsService: SettingsService,
        private readonly _breadcrumbsService: BreadcrumbsService,
        private readonly _router: Router
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
                this.mainContainer.nativeElement?.scrollTo({ top: 0, left: 0 });
            });
    }
}
