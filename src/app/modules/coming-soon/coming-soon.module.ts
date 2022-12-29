import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ComingSoonPageComponent } from './pages/coming-soon-page/coming-soon-page.component';
import { comingSoonRoutes } from './coming-soon.routing';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [
        RouterModule.forChild(comingSoonRoutes),

        MatButtonModule,

        SharedModule
    ],
    declarations: [
        ComingSoonPageComponent
    ]
})
export class ComingSoonModule {}
