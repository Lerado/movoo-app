import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
    standalone: true,
    selector: 'horizontal-scroll-container',
    templateUrl: './horizontal-scroll-container.component.html',
    styleUrls: ['./horizontal-scroll-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalScrollContainerComponent implements AfterViewInit {

    @Output() containerRef: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

    @ViewChild('containerEl') containerEl: ElementRef<HTMLDivElement>;

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this.containerRef.emit(this.containerEl);
    }
}
