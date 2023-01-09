import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, startWith, tap } from 'rxjs';
import { Breadcrumbs } from './breadcrumbs.types';

@Injectable()
export class BreadcrumbsService {

    _breadcrumbs: BehaviorSubject<Breadcrumbs> = new BehaviorSubject<Breadcrumbs>([]);

    breadcrumbs$: Observable<Breadcrumbs> = this._breadcrumbs.asObservable();

    /**
     * Constructor
     */
    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute
    ) {
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            distinctUntilChanged(),
            map(() => this._buildBreadcrumbs(this._route.root)),
            startWith(this._buildBreadcrumbs(this._route.root)),
            tap(breadcrumbs => this._breadcrumbs.next(breadcrumbs)),
        ).subscribe();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set marker values in breadcrumbs
     *
     * @param values
     */
    setMarkers(values: Record<string, string>): void {
        const breadcrumbs: Breadcrumbs = this._breadcrumbs.getValue();
        breadcrumbs.forEach((breadcrumb) => {
            Object.entries(values).forEach(([key, value]) => {
                if (breadcrumb.label.includes(`[${key}]`)) {
                    breadcrumb.label = breadcrumb.label.replaceAll(`[${key}]`, value);
                }
            });
        });
        this._breadcrumbs.next(breadcrumbs);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Recursively build breadcrumbs from route config
     *
     * @param route
     * @param url
     * @param breadcrumbs
     */
    private _buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumbs = []): Breadcrumbs {
        //If no routeConfig is avalailable we are on the root path
        let label = route.routeConfig?.data?.breadcrumb ?? '';
        let path = route.routeConfig?.path ?? '';

        // If the route is dynamic route such as ':id', remove it
        const lastRoutePart = path.split('/').pop();
        const isDynamicRoute = lastRoutePart.startsWith(':');
        if (isDynamicRoute && !!route.snapshot) {
            const paramName = lastRoutePart.split(':')[1];
            path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
        }

        //In the routeConfig the complete path is not available,
        //so we rebuild it each time
        const nextUrl = url !== '/' ? `${url}/${path}` : `${url}${path}`;
        const breadcrumb = {
            label: label,
            url: nextUrl
        };
        const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
        if (route.firstChild) {
            //If we are not on our current path yet,
            //there will be more children to look after, to build our breadcumb
            return this._buildBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }
}
