import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';


@Component({
    selector: 'content-layout',
    templateUrl: './content-layout.component.html'
})
export class ContentLayoutComponent implements AfterViewInit {

    @Output() scrollElement: EventEmitter<ElementRef<HTMLDivElement>> = new EventEmitter<ElementRef<HTMLDivElement>>();

    @ViewChild('scrollElement') scrollElementRef;

    /**
     * Constructor
     */
    constructor() { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * After view init
     */
     ngAfterViewInit(): void {
        this.scrollElement.emit(this.scrollElementRef);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
