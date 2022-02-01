import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: LayoutComponent, data: { layout: 'classy' } }
];
