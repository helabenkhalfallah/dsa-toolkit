class DoublyLinkedListNode<T> {
    value: T;
    next: DoublyLinkedListNode<T> | null = null;
    prev: DoublyLinkedListNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

export class DoublyLinkedList<T> {
    private head: DoublyLinkedListNode<T> | null = null;
    private tail: DoublyLinkedListNode<T> | null = null;

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

    // Get value at specific index
    getAt(index: number): T | null {
        let current: DoublyLinkedListNode<T> | null;
        let currentIndex: number;

        // Choose traversal direction based on index
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

    search(value: T): boolean {
        let current = this.head;
        while (current) {
            if (current.value === value) return true;
            current = current.next;
        }
        return false;
    }

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

    // Helper to get the current size of the list
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
