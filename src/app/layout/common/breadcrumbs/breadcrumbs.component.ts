import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumbsService } from './breadcrumbs.service';
import { Breadcrumbs } from './breadcrumbs.types';

@Component({
    selector: 'breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {

    breadcrumbs$: Observable<Breadcrumbs> = this._breadcrumbsService.breadcrumbs$;

    /**
     * Constructor
     */
    constructor(
        private readonly _breadcrumbsService: BreadcrumbsService
    ) {}
}
