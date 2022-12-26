interface SimpleChange<T> {
    firstChange: boolean;
    previousValue: T;
    currentValue: T;
    isFirstChange: () => boolean;
}

type CallbackFunction<T> = (value: T, change?: SimpleChange<T>) => void;

// eslint-disable-next-line @typescript-eslint/naming-convention
const OnChange = <T = any>(callback: CallbackFunction<T> | string): CallableFunction => {

    const cachedValueKey = Symbol();
    const isFirstChangeKey = Symbol();

    return (target: any, key: PropertyKey) => {

        const callbackFn: CallbackFunction<T> = typeof callback === 'string' ? target[callback] : callback;
        if (!callbackFn) {
            throw new Error(`Cannot find method ${callback} in class ${target.constructor.name}`);
        }

        Object.defineProperty(target, key, {

            set: function(value) {
                // Change status of "isFirstChange"
                this[isFirstChangeKey] = this[isFirstChangeKey] === undefined;

                // Do nothing if old value is the same as new value
                if (!this[isFirstChangeKey] && this[cachedValueKey] === value) {
                    return;
                }

                const oldValue = this[cachedValueKey];
                this[cachedValueKey] = value;
                const change: SimpleChange<T> = {
                    firstChange: this[isFirstChangeKey],
                    previousValue: oldValue,
                    currentValue: this[cachedValueKey],
                    isFirstChange: () => this[isFirstChangeKey]
                };

                callbackFn.call(this, this[cachedValueKey], change);
            },

            get: function() {
                return this[cachedValueKey];
            }

        });
    };
};

export { OnChange };
