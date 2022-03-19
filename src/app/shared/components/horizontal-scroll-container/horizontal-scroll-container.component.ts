import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'horizontal-scroll-container',
    templateUrl: './horizontal-scroll-container.component.html',
    styleUrls: ['./horizontal-scroll-container.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorizontalScrollContainerComponent implements OnInit, AfterViewInit {

    @Output() containerRef: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

    @ViewChild('containerEl') containerEl;

    /**
     * Constructor
     */
    constructor() { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void { }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this.containerRef.emit(this.containerEl);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
