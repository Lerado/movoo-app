import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { TMDBImageUrlPipe } from './pipes/tmdb-image-url.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        NgOptimizedImage,

        TMDBImageUrlPipe,
        ContentLayoutComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        NgOptimizedImage,

        TMDBImageUrlPipe,
        ContentLayoutComponent
    ]
})
export class SharedModule {}
