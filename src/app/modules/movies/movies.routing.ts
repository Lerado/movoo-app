import { Route } from '@angular/router';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { PlayingMoviesPageComponent } from './pages/playing-movies-page/playing-movies-page.component';
import { PopularMoviesPageComponent } from './pages/popular-movies-page/popular-movies-page.component';
import { UpcomingMoviesPageComponent } from './pages/upcoming-movies-page/upcoming-movies-page.component';

export const moviesRoutes: Route[] = [

    // Now playing
    {
        path: 'now-playing',
        component: PlayingMoviesPageComponent
    },

    // Upcoming
    {
        path: 'upcoming',
        component: UpcomingMoviesPageComponent
    },

     // Popular
     {
        path: 'popular',
        component: PopularMoviesPageComponent
    },

    // Movie detail
    {
        path: ':id',
        component: MovieDetailsPageComponent
    }
];
