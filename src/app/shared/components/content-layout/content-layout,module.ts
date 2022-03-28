import { NgModule } from '@angular/core';
import { MovooScrollbarModule } from '@movoo/directives/scrollbar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ContentLayoutComponent } from './content-layout,component';

@NgModule({
    declarations: [
        ContentLayoutComponent
    ],
    imports: [
        MovooScrollbarModule,
        InfiniteScrollModule,
    ],
    exports: [
        ContentLayoutComponent
    ]
})
export class ContentLayoutModule { }
