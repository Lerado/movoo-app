import { Routes } from '@angular/router';
import { InitialDataResolver } from './app.resolver';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Routes = [

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
                loadChildren: () => import('app/modules/movies/movies.routes')
            },

            // Coming soon
            {
                path: 'coming-soon',
                loadChildren: () => import('app/modules/coming-soon/coming-soon.routes')
            }
        ]
    },
];
