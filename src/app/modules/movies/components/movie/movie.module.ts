import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HorizontalScrollModule } from 'app/shared/components/horizontal-scroll-container/horizontal-scroll.module';
import { SharedModule } from 'app/shared/shared.module';
import { MoviesGridComponent } from '../grid/grid.component';
import { MovieBannerComponent } from './banner/banner.component';
import { MovieCardComponent } from './card/card.component';
import { MovieDetailComponent } from './detail/detail.component';

@NgModule({
    declarations: [
        MovieCardComponent,
        MovieBannerComponent,
        MoviesGridComponent,
        MovieDetailComponent
    ],
    imports: [
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        HorizontalScrollModule,
        SharedModule
    ],
    exports: [
        MovieCardComponent,
        MovieBannerComponent,
        MoviesGridComponent,
        MovieDetailComponent
    ]
})
export class MovieComponentsModule {}
