import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovooTitleBarModule } from '@movoo/components/title-bar';
import { MultiSearchBarComponent } from 'app/shared/components/search/multi-search-bar/multi-search-bar.component';
import { SharedModule } from 'app/shared/shared.module';
import { MovooSettingsModule } from './common/settings/settings.module';
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
        MatButtonModule,
        MatIconModule,

        ...layoutModules,

        MovooTitleBarModule,
        MovooSettingsModule,

        MultiSearchBarComponent,

        SharedModule
    ],
    exports: [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule {}
