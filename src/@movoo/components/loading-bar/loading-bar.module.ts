import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MovooLoadingBarComponent } from '@movoo/components/loading-bar/loading-bar.component';

@NgModule({
    declarations: [
        MovooLoadingBarComponent
    ],
    imports     : [
        CommonModule,
        MatProgressBarModule
    ],
    exports     : [
        MovooLoadingBarComponent
    ]
})
export class MovooLoadingBarModule
{
}
