import { Route } from '@angular/router';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { PlayingMoviesPageComponent } from './pages/playing-movies-page/playing-movies-page.component';
import { PopularMoviesPageComponent } from './pages/popular-movies-page/popular-movies-page.component';
import { TopRatedMoviesPageComponent } from './pages/top-rated-movies-page/top-rated-movies-page.component';
import { UpcomingMoviesPageComponent } from './pages/upcoming-movies-page/upcoming-movies-page.component';

export const moviesRoutes: Route[] = [

    // Default
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'now-playing'
    },

    // Now playing
    {
        path: 'now-playing',
        title: 'Playing now',
        children: [
            {
                path: '',
                component: PlayingMoviesPageComponent,
                data: {
                    breadcrumb: 'Playing now'
                }
            },
            // Movie detail
            {
                path: ':id',
                data: {
                    breadcrumb: '[movie_title]'
                },
                component: MovieDetailsPageComponent
            }
        ]
    },

    // Upcoming
    {
        path: 'upcoming',
        title: 'Upcoming',
        children: [
            {
                path: '',
                component: UpcomingMoviesPageComponent,
                data: {
                    breadcrumb: 'Upcoming'
                },
            },
            // Movie detail
            {
                path: ':id',
                data: {
                    breadcrumb: '[movie_title]'
                },
                component: MovieDetailsPageComponent
            }
        ]
    },

    // Popular
    {
        path: 'popular',
        children: [
            {
                path: '',
                component: PopularMoviesPageComponent,
                data: {
                    breadcrumb: 'Popular'
                },
            },
            // Movie detail
            {
                path: ':id',
                data: {
                    breadcrumb: '[movie_title]'
                },
                component: MovieDetailsPageComponent
            }
        ]
    },

    // Popular
    {
        path: 'top-rated',
        children: [
            {
                path: '',
                component: TopRatedMoviesPageComponent,
                data: {
                    breadcrumb: 'Top rated'
                },
            },
            // Movie detail
            {
                path: ':id',
                data: {
                    breadcrumb: '[movie_title]'
                },
                component: MovieDetailsPageComponent
            }
        ]
    },

    // Movie detail
    {
        path: ':id',
        pathMatch: 'full',
        data: {
            breadcrumb: '[movie_title]'
        },
        component: MovieDetailsPageComponent
    }
];
