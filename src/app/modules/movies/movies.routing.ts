import { Route } from '@angular/router';
import { NowPlayingMoviesResolver } from './movies.resolvers';
import { MoviesNowPlayingComponent } from './now-playing/now.playing.component';

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
    }
];
