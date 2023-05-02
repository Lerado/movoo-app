import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MovooDrawerModule } from '@movoo/components/drawer';
import { SettingsComponent } from 'app/layout/common/settings/settings.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'app/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MovooConfirmationModule } from '@movoo/services/confirmation';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports     : [
        RouterModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatProgressSpinnerModule,

        MovooConfirmationModule,
        MovooDrawerModule,

        SharedModule
    ],
    exports     : [
        SettingsComponent
    ]
})
export class MovooSettingsModule
{
}
