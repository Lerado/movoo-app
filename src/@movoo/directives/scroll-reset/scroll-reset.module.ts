import { NgModule } from '@angular/core';
import { MovooScrollResetDirective } from '@movoo/directives/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [
        MovooScrollResetDirective
    ],
    exports     : [
        MovooScrollResetDirective
    ]
})
export class MovooScrollResetModule
{
}
