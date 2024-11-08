/**
 * Class representing a node in a doubly linked list.
 * @template T - The type of value stored in the node.
 */
class DoublyLinkedListNode<T> {
    /** The value stored in the node */
    value: T;

    /** Pointer to the next node in the list */
    next: DoublyLinkedListNode<T> | null = null;

    /** Pointer to the previous node in the list */
    prev: DoublyLinkedListNode<T> | null = null;

    /**
     * Creates an instance of a DoublyLinkedListNode.
     * @param {T} value - The value to store in the node.
     */
    constructor(value: T) {
        this.value = value;
    }
}

/**
 * Class representing a doubly linked list.
 * @template T - The type of values stored in the list.
 */
export class DoublyLinkedList<T> {
    /** The head node of the list */
    private head: DoublyLinkedListNode<T> | null = null;

    /** The tail node of the list */
    private tail: DoublyLinkedListNode<T> | null = null;

    /**
     * Inserts a new value at the end of the list.
     * @param {T} value - The value to insert.
     */
    insert(value: T): void {
        const newNode = new DoublyLinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    /**
     * Retrieves the value at a specified index.
     * Optimizes traversal by choosing direction based on the index.
     * @param {number} index - The index of the value to retrieve.
     * @returns {T | null} - The value at the specified index or null if out of bounds.
     */
    getAt(index: number): T | null {
        let current: DoublyLinkedListNode<T> | null;
        let currentIndex: number;

        if (index <= this.size() / 2) {
            current = this.head;
            currentIndex = 0;
            while (current) {
                if (currentIndex === index) return current.value;
                current = current.next;
                currentIndex++;
            }
        } else {
            current = this.tail;
            currentIndex = this.size() - 1;
            while (current) {
                if (currentIndex === index) return current.value;
                current = current.prev;
                currentIndex--;
            }
        }
        return null; // If index is out of bounds
    }

    /**
     * Searches for a value in the list.
     * @param {T} value - The value to search for.
     * @returns {boolean} - True if the value is found, otherwise false.
     */
    search(value: T): boolean {
        let current = this.head;
        while (current) {
            if (current.value === value) return true;
            current = current.next;
        }
        return false;
    }

    /**
     * Deletes a value from the list.
     * Removes the first occurrence of the specified value.
     * @param {T} value - The value to delete.
     */
    delete(value: T): void {
        if (!this.head) return;

        let current = this.head;
        while (current && current.value !== value) {
            current = current.next;
        }

        if (current) {
            if (current === this.head) {
                this.head = this.head.next;
                if (this.head) this.head.prev = null;
                if (!this.head) this.tail = null;
            } else {
                if (current.next) current.next.prev = current.prev;
                if (current.prev) current.prev!.next = current.next;
                if (current === this.tail) this.tail = current.prev;
            }
        }
    }

    /**
     * Computes the current size of the list.
     * @returns {number} - The number of nodes in the list.
     */
    size(): number {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }
}
