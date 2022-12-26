/**
 * Serializes an object
 *
 * The idea is to serialize each object like so {id: 123, name: 'Mr. Smith', favoriteColor: 'blue'} => to 123mr. smithblue
 *
 * @param object
 */
const objectToFlatString = (object: any): string => {

    // A treatment stack
    const stack: string[] = [];
    let result: string = '';

    // Initializaton
    for (const key in object) {
        if (object[key] !== null) {
            stack.push(object[key]);
        }
    }
    stack.reverse(); // Just to pop in the same order of the keys

    // Iteration and serialization
    while (stack.length) {

        const value: any = stack.pop();

        if (typeof value === 'object') {
            for (const key in value) {
                if (value[key] !== null) {
                    stack.push(value[key]);
                }
            }
        }
        else {
            result += String(value).toLowerCase();
        }
    }

    return result;
};

export { objectToFlatString };
