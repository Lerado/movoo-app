import { Route } from '@angular/router';
import { MovieDetailComponent } from './components/movie/detail/detail.component';
import { MovieDetailResolver, NowPlayingMoviesResolver, UpcomingMoviesResolver } from './movies.resolvers';
import { MoviesNowPlayingComponent } from './now-playing/now.playing.component';
import { MoviesUpcomingComponent } from './upcoming/upcoming.component';

export const moviesRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'now-playing'
    },

    // Now playing
    {
        path: 'now-playing',
        component: MoviesNowPlayingComponent,
        resolve: {
            movies: NowPlayingMoviesResolver
        }
    },

    // Upcoming
    {
        path: 'upcoming',
        component: MoviesUpcomingComponent,
        resolve: {
            movies: UpcomingMoviesResolver
        }
    },

    // Movie detail
    {
        path: ':id',
        component: MovieDetailComponent,
        resolve: {
            movie: MovieDetailResolver,
            // credits: MovieCreditsResolver,
            // images: MovieImagesResolver,
            // videos: MovieVideosResolver,
        }
    }
];
