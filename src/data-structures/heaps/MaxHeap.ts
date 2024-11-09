/**
 * Class representing a Max Heap data structure.
 * A Max Heap is a complete binary tree where the value of each node is greater than or equal to the values of its children.
 *
 * @template T - The type of values stored in the heap.
 */
export class MaxHeap<T> {
    private heap: T[] = [];

    /**
     * Inserts a value into the max heap.
     *
     * @param {T} value - The value to insert into the heap.
     */
    insert(value: T): void {
        this.heap.push(value);
        this.bubbleUp();
    }

    /**
     * Bubbles up the last element to maintain the max-heap property.
     * This method compares the inserted element with its parent and swaps them if the element is greater.
     *
     * @private
     */
    private bubbleUp(): void {
        let index = this.heap.length - 1;
        const element = this.heap[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];

            if (element <= parent) break;

            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }

    /**
     * Extracts the maximum value (root) from the max heap.
     *
     * @returns {T | null} - The maximum value from the heap, or null if the heap is empty.
     */
    extractMax(): T | null {
        if (this.heap.length === 0) return null;
        const max = this.heap[0];
        const end = this.heap.pop()!;

        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return max;
    }

    /**
     * Bubbles down the root element to maintain the max-heap property.
     * This method compares the root with its children and swaps it with the larger child if necessary.
     *
     * @private
     */
    private bubbleDown(): void {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swap: number | null = null;

            if (leftChildIndex < length) {
                const leftChild = this.heap[leftChildIndex];
                if (leftChild > element) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                const rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild > element) ||
                    (swap !== null && rightChild > this.heap[leftChildIndex])
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            index = swap;
        }
        this.heap[index] = element;
    }

    /**
     * Gets the value of the root element.
     *
     * @returns {T | null} - The root value of the heap, or null if the heap is empty.
     */
    get root(): T | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    /**
     * Gets the size of the heap.
     *
     * @returns {number} - The number of elements in the heap.
     */
    get size(): number {
        return this.heap.length;
    }

    /**
     * Checks if the heap is empty.
     *
     * @returns {boolean} - True if the heap is empty, false otherwise.
     */
    isEmpty(): boolean {
        return this.heap.length === 0;
    }
}
