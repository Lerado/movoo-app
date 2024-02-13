import { Component, signal } from '@angular/core';
import { map } from 'rxjs';
import { MovooMediaWatcherService } from '@movoo/services/media-watcher';
import { MovooNavigationService, MovooVerticalNavigationComponent } from '@movoo/components/navigation';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { MovooLoadingBarComponent } from '../../../../../@movoo/components/loading-bar/loading-bar.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    styleUrls: ['./classy.component.scss'],
    standalone: true,
    imports: [MovooLoadingBarComponent, MovooVerticalNavigationComponent, NgOptimizedImage, MatIconModule, RouterOutlet]
})
export class ClassyLayoutComponent {

    isScreenSmall = toSignal(this._movooMediaWatcherService.onMediaChange$.pipe(
        map(({ matchingAliases }) => !matchingAliases.includes('md'))
    ));

    navigation = toSignal(this._navigationService.navigation$);

    currentYear = signal(new Date().getFullYear());

    /**
     * Constructor
     */
    constructor(
        private readonly _navigationService: NavigationService,
        private readonly _movooMediaWatcherService: MovooMediaWatcherService,
        private readonly _movooNavigationService: MovooNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._movooNavigationService.getComponent<MovooVerticalNavigationComponent>(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
