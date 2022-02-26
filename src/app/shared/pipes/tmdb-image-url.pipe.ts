import { Pipe, PipeTransform } from '@angular/core';
import { TMDBSystemConfig, TMDBImagesConfig } from 'app/core/config/app.config';
import { AppConfigService } from 'app/core/config/app.service';

@Pipe({
    name: 'tmdbImageUrl'
})
export class TMDBImageUrlPipe implements PipeTransform {

    // Images config
    imagesConfig: TMDBImagesConfig;

    /**
     * Constructor
     */
    constructor(
        private _appConfigService: AppConfigService
    ) {
        // Loads the images informations
        this._appConfigService.config$.subscribe((config: TMDBSystemConfig) => {
            this.imagesConfig = config.images;
        });
    }

    /**
     * Transform
     *
     * @param value
     * @param args
     */
    transform(value: any, ...args: any[]): any {

        const defaultSize = this.imagesConfig.poster_sizes[this.imagesConfig.poster_sizes.length - 2];

        const size = args[0] || defaultSize;

        return `${ this.imagesConfig.secure_base_url }${ size }${ value }`;
    }
}
