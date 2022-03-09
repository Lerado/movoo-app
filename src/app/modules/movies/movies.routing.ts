import { Route } from '@angular/router';
import { MovieDetailComponent } from './components/movie/detail/detail.component';
import { MovieCreditsResolver, MovieDetailResolver, MovieImagesResolver, MovieVideosResolver, NowPlayingMoviesResolver } from './movies.resolvers';
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
    },

    // Movie detail
    {
        path: ':id',
        component: MovieDetailComponent,
        resolve: {
            movie: MovieDetailResolver,
            credits: MovieCreditsResolver,
            images: MovieImagesResolver,
            videos: MovieVideosResolver,
        }
    }
];
