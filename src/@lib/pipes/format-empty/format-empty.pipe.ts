import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatEmpty',
    standalone: true
})
export class FormatEmptyPipe implements PipeTransform {

    defaultEmptyMark = '-';

    /**
     * Transform
     *
     * @param value
     * @param args
     */
    transform(value: unknown, ...args: unknown[]): unknown {
        const check = value !== '' && value !== undefined && value !== null;
        return check ? value : this.defaultEmptyMark;
    }
}
