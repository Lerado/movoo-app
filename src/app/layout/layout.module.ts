import { NgModule } from '@angular/core';
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
        ...layoutModules
    ],
    exports: [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule {}
