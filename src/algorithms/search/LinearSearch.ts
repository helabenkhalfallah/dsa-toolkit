/**
 * Performs a linear search on the data array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} data - The array to search through.
 * @param {T} target - The target value to find.
 * @param {(a: T, b: T) => number} compareFn - Comparison function.
 * @returns {number} - The index of the target in the array, or -1 if not found.
 */
export function linearSearch<T>(data: T[], target: T, compareFn: (a: T, b: T) => number): number {
    for (let i = 0; i < data.length; i++) {
        if (compareFn(data[i], target) === 0) return i;
    }
    return -1;
}
