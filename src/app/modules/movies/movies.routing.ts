import { Route } from '@angular/router';
import { MoviesNowPlayingComponent } from './now-playing/now.playing.component';

export const moviesRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'now-playing'
    },

    // Now playing
    {
        path: 'now-playing',
        component: MoviesNowPlayingComponent
    }
];
