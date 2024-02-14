import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'empty-layout',
    templateUrl: './empty.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class EmptyLayoutComponent { }
