import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLayoutModule } from './components/content-layout/content-layout,module';
import { TMDBImageUrlPipe } from './pipes/tmdb-image-url.pipe';

@NgModule({
    declarations: [
        TMDBImageUrlPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ContentLayoutModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TMDBImageUrlPipe,
        ContentLayoutModule
    ]
})
export class SharedModule {}
