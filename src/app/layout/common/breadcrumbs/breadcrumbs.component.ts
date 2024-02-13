import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BreadcrumbsService } from './breadcrumbs.service';
import { NgTemplateOutlet } from '@angular/common';
import { movooAnimations } from '@movoo/animations';

@Component({
    selector: 'breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    animations: movooAnimations,
    imports: [NgTemplateOutlet, RouterLink]
})
export class BreadcrumbsComponent {

    breadcrumbs = toSignal(this._breadcrumbsService.breadcrumbs$, { requireSync: true });

    /**
     * Constructor
     */
    constructor(
        private readonly _breadcrumbsService: BreadcrumbsService
    ) {}
}
