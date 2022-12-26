import { Route } from '@angular/router';
import { ComingSoonPageComponent } from './pages/coming-soon-page/coming-soon-page.component';

export const comingSoonRoutes: Route[] = [
    {
        path: '**',
        component: ComingSoonPageComponent
    }
];
