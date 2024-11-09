class StackNode<T> {
    value: T;
    next: StackNode<T> | null = null;

    /**
     * Creates a new StackNode.
     * @param {T} value - The value of the node.
     */
    constructor(value: T) {
        this.value = value;
    }
}

/**
 * Stack data structure implemented with a linked list for O(1) push and pop operations.
 * @template T - The type of elements held in the stack.
 */
export class Stack<T> {
    private top: StackNode<T> | null = null;
    private _size = 0;

    /**
     * Gets the number of elements in the stack.
     * @returns {number} The size of the stack.
     */
    get size(): number {
        return this._size;
    }

    /**
     * Checks if the stack is empty.
     * @returns {boolean} True if the stack is empty, false otherwise.
     */
    isEmpty(): boolean {
        return this._size === 0;
    }

    /**
     * Adds an element to the top of the stack.
     * @param {T} value - The value to add.
     */
    push(value: T): void {
        const newNode = new StackNode(value);
        newNode.next = this.top;
        this.top = newNode;
        this._size++;
    }

    /**
     * Removes and returns the element at the top of the stack.
     * @returns {T | undefined} The value of the popped element, or undefined if the stack is empty.
     */
    pop(): T | undefined {
        if (!this.top) return undefined;
        const value = this.top.value;
        this.top = this.top.next;
        this._size--;
        return value;
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * @returns {T | undefined} The value at the top, or undefined if the stack is empty.
     */
    peek(): T | undefined {
        return this.top?.value;
    }

    /**
     * Clears all elements from the stack.
     */
    clear(): void {
        this.top = null;
        this._size = 0;
    }
}
