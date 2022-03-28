import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { HorizontalScrollModule } from 'app/shared/components/horizontal-scroll-container/horizontal-scroll.module';
import { SharedModule } from 'app/shared/shared.module';
import { EmbedVideo } from 'ngx-embed-video';
import { MoviesGridComponent } from '../grid/grid.component';
import { MovieBannerComponent } from './banner/banner.component';
import { MovieCardComponent } from './card/card.component';
import { MovieDetailComponent } from './detail/detail.component';
import { MovieLoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [
        MovieCardComponent,
        MovieLoaderComponent,
        MovieBannerComponent,
        MoviesGridComponent,
        MovieDetailComponent
    ],
    imports: [
        EmbedVideo.forRoot(),
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatTooltipModule,
        ContentLoaderModule,
        HorizontalScrollModule,
        SharedModule
    ],
    exports: [
        MovieCardComponent,
        MovieLoaderComponent,
        MovieBannerComponent,
        MoviesGridComponent,
        MovieDetailComponent
    ]
})
export class MovieComponentsModule {}
