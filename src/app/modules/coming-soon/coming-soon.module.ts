import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ComingSoonComponent } from './coming-soon.component';
import { comingSoonRoutes } from './coming-soon.routing';

@NgModule({
    imports: [
        RouterModule.forChild(comingSoonRoutes),
        MatButtonModule
    ],
    declarations: [
        ComingSoonComponent
    ]
})
export class ComingSoonModule {}
