import { Pipe, PipeTransform } from '@angular/core';
import { TMDBSystemConfig, TMDBImagesConfig } from 'app/core/config/app.config';
import { AppConfigService } from 'app/core/config/app.service';
import { take } from 'rxjs';

type ImageType = 'poster' | 'still' | 'logo' | 'profile';

@Pipe({
    standalone: true,
    name: 'tmdbImageUrl'
})
export class TMDBImageUrlPipe implements PipeTransform {

    // Images config
    imagesConfig: TMDBImagesConfig;

    /**
     * Constructor
     */
    constructor(
        private readonly _appConfigService: AppConfigService
    ) {
        // Loads the images informations
        this._appConfigService.config$.pipe(take(1))
            .subscribe((config: TMDBSystemConfig) => {
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

        if (!value) { return ''; }

        const argType: ImageType = args[1] || 'poster';
        const sizes = this.imagesConfig[`${argType}_sizes`] || this.imagesConfig.poster_sizes;
        const defaultSize = sizes[sizes.length - 2];
        const argSize = args[0] || defaultSize;
        const size = sizes.includes(argSize) ? argSize : defaultSize;

        return `${this.imagesConfig.secure_base_url}${size}${value}`;
    }
}
