import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MovooNavigationModule } from '@movoo/components/navigation';
import { SharedModule } from 'app/shared/shared.module';
import { ClassyLayoutComponent } from './classy.component';

@NgModule({
    declarations: [
        ClassyLayoutComponent,
    ],
    imports: [
        RouterModule,
        MatIconModule,
        MovooNavigationModule,
        SharedModule
    ],
    exports: [
        ClassyLayoutComponent
    ]
})
export class ClassyLayoutModule {}
