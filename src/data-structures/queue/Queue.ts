class QueueNode<T> {
    value: T;
    next: QueueNode<T> | null = null;

    /**
     * Creates a new QueueNode.
     * @param {T} value - The value of the node.
     */
    constructor(value: T) {
        this.value = value;
    }
}

/**
 * Queue data structure implemented with a linked list for O(1) enqueue and dequeue operations.
 * @template T - The type of elements held in the queue.
 */
export class Queue<T> {
    private head: QueueNode<T> | null = null;
    private tail: QueueNode<T> | null = null;
    private _size: number = 0;

    /**
     * Gets the number of elements in the queue.
     * @returns {number} The size of the queue.
     */
    get size(): number {
        return this._size;
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean} True if the queue is empty, false otherwise.
     */
    isEmpty(): boolean {
        return this._size === 0;
    }

    /**
     * Adds an element to the end of the queue.
     * @param {T} value - The value to add.
     */
    enqueue(value: T): void {
        const newNode = new QueueNode(value);
        if (this.tail) {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        if (!this.head) {
            this.head = newNode;
        }
        this._size++;
    }

    /**
     * Removes and returns the element at the front of the queue.
     * @returns {T | undefined} The value of the dequeued element, or undefined if the queue is empty.
     */
    dequeue(): T | undefined {
        if (!this.head) return undefined;
        const value = this.head.value;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null;
        }
        this._size--;
        return value;
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * @returns {T | undefined} The value at the front, or undefined if the queue is empty.
     */
    peek(): T | undefined {
        return this.head?.value;
    }
}
