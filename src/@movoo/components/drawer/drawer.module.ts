import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovooDrawerComponent } from '@movoo/components/drawer/drawer.component';

@NgModule({
    declarations: [
        MovooDrawerComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        MovooDrawerComponent
    ]
})
export class MovooDrawerModule
{
}
