import { Route } from '@angular/router';
import { InitialDataResolver } from './app.resolvers';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [

    // Redirect empty path to '/tops'
    {path: '', pathMatch : 'full', redirectTo: 'tops'},

    // Routes under basic layout
    {
        path: 'tops',
        component: LayoutComponent,
        data: {
            layout: 'classy'
        },
        resolve: {
            initialData: InitialDataResolver
        }
    }
];
