import { MovieService } from 'app/core/movie/movie.service';
import { MoviesPagination } from 'app/core/movie/movie.types';
import { GetMoviesDto } from 'app/core/movie/movies.dto';
import { Observable } from 'rxjs';
import { BaseMoviesPageComponent, ShouldLoadMovies } from '../base-movies-page/base-movies-page.component';
import { Component } from '@angular/core';
import { ContentLayoutComponent } from 'app/shared/components/content-layout/content-layout.component';
import { MoviesGridComponent } from 'app/shared/components/movie/movies-grid/movies-grid.component';
import { MovieBannerComponent } from '../../components/movie-banner/movie-banner.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'app/core/settings/settings.service';

@Component({
    templateUrl: './popular-movies-page.component.html',
    standalone: true,
    imports: [ContentLayoutComponent, MovieBannerComponent, MoviesGridComponent]
})
export class PopularMoviesPageComponent extends BaseMoviesPageComponent implements ShouldLoadMovies {

    /**
     * Constructor
     */
    constructor(
        protected readonly _movieService: MovieService,
        protected readonly _settingsService: SettingsService,
        protected readonly _router: Router,
        protected readonly _route: ActivatedRoute
    ) {
        super(_movieService, _settingsService, _router, _route);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Load upcoming movies
     *
     * @override
     * @param movieParams
     */
    override loadMovies(movieParams: GetMoviesDto): Observable<MoviesPagination> {
        return this._movieService.getPopular(movieParams);
    }
}
