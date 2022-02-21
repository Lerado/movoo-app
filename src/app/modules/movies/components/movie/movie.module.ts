import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MovieCardComponent } from './card/card.component';

@NgModule({
    declarations: [
        MovieCardComponent
    ],
    imports: [
        MatIconModule,
        SharedModule
    ],
    exports: [
        MovieCardComponent
    ]
})
export class MovieComponentsModule {}
