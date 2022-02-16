import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MovooTitleBarComponent } from '@movoo/components/title-bar/title-bar.component';

@NgModule({
    declarations: [
        MovooTitleBarComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MovooTitleBarComponent
    ]
})
export class MovooTitleBarModule {}
