import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MovooLoadingService } from '@movoo/services/loading';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'movoo-loading-bar',
    templateUrl: './loading-bar.component.html',
    styleUrls: ['./loading-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'movooLoadingBar',
    standalone: true,
    imports: [NgIf, MatProgressBarModule, AsyncPipe]
})
export class MovooLoadingBarComponent implements OnChanges, OnInit, OnDestroy
{
    @Input() autoMode: boolean = true;

    mode$: Observable<'determinate' | 'indeterminate' | 'query'>;
    progress$: Observable<number>;
    show$: Observable<boolean>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _movooLoadingService: MovooLoadingService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void
    {
        // Auto mode
        if ( 'autoMode' in changes )
        {
            // Set the auto mode in the service
            this._movooLoadingService.setAutoMode(coerceBooleanProperty(changes.autoMode.currentValue));
        }
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to the service
        this.mode$ = this._movooLoadingService.mode$.pipe(takeUntil(this._unsubscribeAll));

        this.progress$ = this._movooLoadingService.progress$.pipe(takeUntil(this._unsubscribeAll));

        this.show$ = this._movooLoadingService.show$.pipe(takeUntil(this._unsubscribeAll));
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
