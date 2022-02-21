import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLayoutModule } from './components/content-layout/content-layout,module';

@NgModule({
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
        ContentLayoutModule
    ]
})
export class SharedModule {}
