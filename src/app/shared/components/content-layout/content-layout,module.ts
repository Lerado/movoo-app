import { NgModule } from '@angular/core';
import { MovooScrollbarModule } from '@movoo/directives/scrollbar';
import { ContentLayoutComponent } from './content-layout,component';

@NgModule({
    declarations: [
        ContentLayoutComponent
    ],
    imports: [
        MovooScrollbarModule
    ],
    exports: [
        ContentLayoutComponent
    ]
})
export class ContentLayoutModule { }
