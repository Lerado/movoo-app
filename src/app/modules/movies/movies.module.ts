import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { HorizontalScrollContainerComponent } from 'app/shared/components/horizontal-scroll-container/horizontal-scroll-container.component';
import { MovieLoaderComponent } from 'app/shared/components/movie/movie-loader/movie-loader.component';
import { MoviesGridComponent } from 'app/shared/components/movie/movies-grid/movies-grid.component';
import { SharedModule } from 'app/shared/shared.module';
import { EmbedVideo } from 'ngx-embed-video';
import { MovieBannerComponent } from './components/movie-banner/movie-banner.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { moviesRoutes } from './movies.routing';
import { PlayingMoviesPageComponent } from './pages/playing-movies-page/playing-movies-page.component';
import { UpcomingMoviesPageComponent } from './pages/upcoming-movies-page/upcoming-movies-page.component';
import { MovieCardComponent } from 'app/shared/components/movie/movie-card/movie-card.component';
import { PopularMoviesPageComponent } from './pages/popular-movies-page/popular-movies-page.component';
import { BaseMoviesPageComponent } from './components/base-movies-page/base-movies-page.component';
import { TopRatedMoviesPageComponent } from './pages/top-rated-movies-page/top-rated-movies-page.component';

@NgModule({
    declarations: [
        BaseMoviesPageComponent,
        PlayingMoviesPageComponent,
        UpcomingMoviesPageComponent,
        PopularMoviesPageComponent,
        TopRatedMoviesPageComponent,

        MovieDetailsPageComponent,

        MovieBannerComponent,
    ],
    imports: [
        RouterModule.forChild(moviesRoutes),

        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatTooltipModule,

        EmbedVideo.forRoot(),
        ContentLoaderModule,

        HorizontalScrollContainerComponent,

        MoviesGridComponent,
        MovieCardComponent,
        MovieLoaderComponent,

        SharedModule
    ]
})
export class MoviesModule {}
