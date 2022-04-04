import { Route } from '@angular/router';
import { ComingSoonComponent } from './coming-soon.component';

export const comingSoonRoutes: Route[] = [
    {
        path: '**',
        component: ComingSoonComponent
    }
];
