import { Injectable } from '@angular/core';

@Injectable()
export class Generator {

    strongPasswordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

    /**
     * Generates a strong password
     *
     * @param length Minimum of 8
     */
    strongPassword(length: number): string {

        if (length < 8) {
            throw new Error('Can not create a strong password less than 8 characters long');
        }

        const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let password;
        const array = new Uint32Array(length);

        do {
            password = '';
            window.crypto.getRandomValues(array);
            for (let i = 0; i < length; i++) {
                password += chars[array[i] % chars.length]; // % operator returns remainder of division
            }
        }
        while (!this.strongPasswordRegex.test(password));

        return password;
    }
}
