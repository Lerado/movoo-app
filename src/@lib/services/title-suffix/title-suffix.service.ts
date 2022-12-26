import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class TitleSuffixStrategy extends TitleStrategy {

    /**
     * Constructor
     */
    constructor(
        private readonly _title: Title,
        private readonly _translocoService: TranslocoService
    ) {
        super();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update title
     *
     * @param snapshot
     */
    override updateTitle(snapshot: RouterStateSnapshot): void {

        const title = this.buildTitle(snapshot);

        const titleSplit = document.title.split(' - ');

        // Remove the previous added prefix when it exists
        // This prefix is always at the end
        if (titleSplit.length > 1) {
            titleSplit.pop();
        }

        const rootTitle = titleSplit.join('');

        // If route has a custom title, add it as a suffix
        if (title) {
            this._title.setTitle(`${ rootTitle } - ${ this._translocoService.translate(title) }`);
        }
        else {
             this._title.setTitle(rootTitle);
        }
    }
}

