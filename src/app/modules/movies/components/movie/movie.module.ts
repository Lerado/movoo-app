import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MoviesGridComponent } from '../grid/grid.component';
import { MovieBannerComponent } from './banner/banner.component';
import { MovieCardComponent } from './card/card.component';

@NgModule({
    declarations: [
        MovieCardComponent,
        MovieBannerComponent,
        MoviesGridComponent
    ],
    imports: [
        MatIconModule,
        MatButtonModule,
        SharedModule
    ],
    exports: [
        MovieCardComponent,
        MovieBannerComponent,
        MoviesGridComponent
    ]
})
export class MovieComponentsModule {}
