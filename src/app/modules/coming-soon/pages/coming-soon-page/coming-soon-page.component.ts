import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'coming-soon-page',
    templateUrl: './coming-soon-page.component.html',
    standalone: true,
    imports: [NgOptimizedImage, MatButtonModule, RouterLink]
})
export class ComingSoonPageComponent { }
