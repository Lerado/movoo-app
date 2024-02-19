import { Routes } from '@angular/router';
import { ComingSoonPageComponent } from './pages/coming-soon-page/coming-soon-page.component';

export default [
    {
        path: '**',
        title: 'Feature coming soon',
        component: ComingSoonPageComponent
    }
] as Routes;
