import { NgModule } from '@angular/core';
import { MovooScrollbarDirective } from '@movoo/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        MovooScrollbarDirective
    ],
    exports     : [
        MovooScrollbarDirective
    ]
})
export class MovooScrollbarModule
{
}
