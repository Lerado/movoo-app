import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ClassyLayoutComponent } from './classy.component';

@NgModule({
    declarations: [
        ClassyLayoutComponent
    ],
    imports: [
        RouterModule,
        SharedModule
    ],
    exports: [
        ClassyLayoutComponent
    ]
})
export class ClassyLayoutModule {}
