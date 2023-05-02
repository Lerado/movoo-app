import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovooConfirmationConfig } from '@movoo/services/confirmation/confirmation.types';

@Component({
    selector     : 'movoo-confirmation-dialog',
    templateUrl  : './dialog.component.html',
    styles       : [
        `
            .movoo-confirmation-dialog-panel {
                @screen md {
                    @apply w-128;
                }

                .mat-dialog-container {
                    padding: 0 !important;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class MovooConfirmationDialogComponent
{
    /**
     * Constructor
     */
    constructor(@Inject(MAT_DIALOG_DATA) public data: MovooConfirmationConfig)
    {
    }

}
