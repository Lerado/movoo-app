import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild, input } from '@angular/core';
import { MovooScrollbarDirective } from '@movoo/directives/scrollbar';
import { BreadcrumbsComponent } from 'app/layout/common/breadcrumbs/breadcrumbs.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@Component({
    standalone: true,
    imports: [BreadcrumbsComponent, InfiniteScrollModule, MovooScrollbarDirective],
    selector: 'content-layout',
    templateUrl: './content-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentLayoutComponent implements AfterViewInit {

    infiniteScrollOptions = input<Record<string, unknown>>({});

    @Output() scrollElement: EventEmitter<ElementRef<HTMLDivElement>> = new EventEmitter<ElementRef<HTMLDivElement>>();
    @Output() scrolled: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('scrollElement') scrollElementRef;

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
