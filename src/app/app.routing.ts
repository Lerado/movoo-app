/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Route } from '@angular/router';
import { InitialDataResolver } from './app.resolvers';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [

    // Redirect empty path to '/tops'
    { path: '', pathMatch: 'full', redirectTo: '/movies/now-playing' },

    // Routes under basic layout
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'classy'
        },
        resolve: {
            initialData: InitialDataResolver
        },
        children: [

            // Movies
            {
                path: 'movies',
                data: { breadcrumb: 'Movies' },
                loadChildren: () => import('app/modules/movies/movies.module').then(m => m.MoviesModule)
            },

            // Coming soon
            {
                path: 'coming-soon',
                loadChildren: () => import('app/modules/coming-soon/coming-soon.module').then(m => m.ComingSoonModule)
            }
        ]
    },
];
