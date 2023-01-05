/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'app/core/movie/movie.service';
import { MoviesPagination } from 'app/core/movie/movie.types';
import { GetMoviesDto } from 'app/core/movie/movies.dtos';
import { SettingsService } from 'app/core/settings/settings.service';
import { Observable } from 'rxjs';
import { BaseMoviesPageComponent } from '../../components/base-movies-page/base-movies-page.component';

@Component({
    selector: 'upcoming-movies-page',
    templateUrl: '../../components/base-movies-page/base-movies-page.component.html'
})
export class UpcomingMoviesPageComponent extends BaseMoviesPageComponent {

    /**
     * Constructor
     */
    constructor(
        protected readonly _movieService: MovieService,
        protected readonly _settingsService: SettingsService,
        protected readonly _router: Router
    ) {
        super(
            _settingsService,
            _router
        );
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
    loadMovies(movieParams: GetMoviesDto): Observable<MoviesPagination> {
        return this._movieService.getUpcoming(movieParams);
    }
}

