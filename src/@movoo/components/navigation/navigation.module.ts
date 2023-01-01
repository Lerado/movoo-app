import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MovooVerticalNavigationComponent } from '@movoo/components/navigation/vertical/vertical.component';
import { MovooScrollbarModule } from '@movoo/directives/scrollbar';
import { MovooVerticalNavigationBasicItemComponent } from './vertical/components/basic/basic.component';
import { MovooVerticalNavigationGroupItemComponent } from './vertical/components/group/group.component';

@NgModule({
    declarations: [
        MovooVerticalNavigationBasicItemComponent,
        MovooVerticalNavigationGroupItemComponent,
        // MovooVerticalNavigationSpacerItemComponent,
        MovooVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        MovooScrollbarModule
    ],
    exports     : [
        // MovooHorizontalNavigationComponent,
        MovooVerticalNavigationComponent
    ]
})
export class MovooNavigationModule
{
}
