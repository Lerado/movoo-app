import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'firstUppercase'
})
export class FirstUppercasePipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {

        if ( !(typeof value === 'string') ) {
            return value;
        }

        if (!value) {
            return value;
        }

        return value[0].toUpperCase() + value.slice(1).toLowerCase();
    }
}
