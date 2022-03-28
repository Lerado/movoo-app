import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MovieComponentsModule } from './components/movie/movie.module';
import { moviesRoutes } from './movies.routing';
import { MoviesNowPlayingComponent } from './now-playing/now.playing.component';

@NgModule({
    declarations: [
        MoviesNowPlayingComponent
    ],
    imports: [
        RouterModule.forChild(moviesRoutes),
        MovieComponentsModule,
        SharedModule
    ],
})
export class MoviesModule {}
