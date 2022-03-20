import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';


@Component({
    selector: 'content-layout',
    templateUrl: './content-layout.component.html'
})
export class ContentLayoutComponent implements AfterViewInit {

    @Input() infiniteSrollOptions: { [key: string]: any };

    @Output() scrollElement: EventEmitter<ElementRef<HTMLDivElement>> = new EventEmitter<ElementRef<HTMLDivElement>>();
    @Output() scrolled: EventEmitter<any> = new EventEmitter<any>();

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

    /**
     * Emits when grid is scrolled till the end
     *
     * @param $event
     */
    onScrolled($event: any): void {
        this.scrolled.emit($event);
    }
}
