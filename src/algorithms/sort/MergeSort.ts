/**
 * Merges two sorted arrays into a single sorted array using a comparison function.
 *
 * @template T - The type of elements in the arrays.
 * @param {T[]} left - The left sorted array.
 * @param {T[]} right - The right sorted array.
 * @param {(a: T, b: T) => number} compareFn - The comparison function.
 * @returns {T[]} The merged sorted array.
 */
function merge<T>(left: T[], right: T[], compareFn: (a: T, b: T) => number): T[] {
    const result: T[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (compareFn(left[i], right[j]) <= 0) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
}

/**
 * Sorts an array using the Merge Sort algorithm with a comparison function.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to sort.
 * @param {(a: T, b: T) => number} compareFn - The comparison function.
 * @returns {T[]} The sorted array.
 */
export function mergeSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), compareFn);
    const right = mergeSort(arr.slice(mid), compareFn);

    return merge(left, right, compareFn);
}
