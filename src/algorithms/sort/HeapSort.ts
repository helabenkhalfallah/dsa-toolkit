/**
 * Heapifies a subtree rooted with node i which is an index in arr[].
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to heapify.
 * @param {number} n - The size of the heap.
 * @param {number} i - The index of the root element.
 * @param {(a: T, b: T) => number} compareFn - A comparison function that defines the sort order.
 */
// eslint-disable-next-line max-params
function heapify<T>(arr: T[], n: number, i: number, compareFn: (a: T, b: T) => number): void {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // left = 2*i + 1
    const right = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (left < n && compareFn(arr[left], arr[largest]) > 0) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && compareFn(arr[right], arr[largest]) > 0) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap

        // Recursively heapify the affected subtree
        heapify(arr, n, largest, compareFn);
    }
}

/**
 * Performs HeapSort on an array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to sort.
 * @param {(a: T, b: T) => number} compareFn - A comparison function that defines the sort order.
 * @returns {T[]} The sorted array.
 */
export function heapSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    const n = arr.length;

    // Build heap (rearrange the array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, compareFn);
    }

    // One by one extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap

        // Call max heapify on the reduced heap
        heapify(arr, i, 0, compareFn);
    }

    return arr;
}
