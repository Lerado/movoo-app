import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MovooConfirmationService } from '@movoo/services/confirmation/confirmation.service';
import { MovooConfirmationDialogComponent } from '@movoo/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        MovooConfirmationDialogComponent
    ],
    imports     : [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        CommonModule
    ],
    providers   : [
        MovooConfirmationService
    ]
})
export class MovooConfirmationModule
{
    /**
     * Constructor
     */
    constructor(private _movooConfirmationService: MovooConfirmationService)
    {
    }
}
