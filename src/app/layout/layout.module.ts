import { NgModule } from '@angular/core';
import { MovooTitleBarModule } from '@movoo/components/title-bar';
import { SharedModule } from 'app/shared/shared.module';
import { LayoutComponent } from './layout.component';
import { EmptyLayoutModule } from './layouts/empty/empty.module';
import { ClassyLayoutModule } from './layouts/vertical/classy/classy.module';

const layoutModules = [

    // Empty
    EmptyLayoutModule,

    // Vertical navigation
    ClassyLayoutModule
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        SharedModule,
        MovooTitleBarModule,
        ...layoutModules
    ],
    exports: [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule {}
