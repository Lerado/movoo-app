import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MovooLoadingBarModule } from '@movoo/components/loading-bar';
import { MovooNavigationModule } from '@movoo/components/navigation';
import { SharedModule } from 'app/shared/shared.module';
import { ClassyLayoutComponent } from './classy.component';

@NgModule({
    declarations: [
        ClassyLayoutComponent,
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MovooNavigationModule,
        MovooLoadingBarModule,
        SharedModule
    ],
    exports: [
        ClassyLayoutComponent
    ]
})
export class ClassyLayoutModule {}
