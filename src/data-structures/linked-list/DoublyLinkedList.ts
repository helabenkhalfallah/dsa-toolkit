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

    // Insert a new value at the end of the doubly linked list
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

    // Insert at a specific position
    insertAt(value: T, index: number): void {
        const newNode = new DoublyLinkedListNode(value);

        if (index <= 0 || !this.head) {
            // Insert at the beginning
            newNode.next = this.head;
            if (this.head) this.head.prev = newNode;
            this.head = newNode;
            if (!this.tail) this.tail = newNode;
            return;
        }

        let current = this.head;
        let currentIndex = 0;

        while (current && currentIndex < index - 1) {
            current = current.next;
            currentIndex++;
        }

        if (current) {
            // Insert in the middle or end
            newNode.next = current.next;
            newNode.prev = current;
            if (current.next) current.next.prev = newNode;
            current.next = newNode;
            if (!newNode.next) this.tail = newNode;
        } else {
            // If the index is out of bounds, append to the end
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    // Search for a value in the doubly linked list
    search(value: T): boolean {
        let current = this.head;
        while (current) {
            if (current.value === value) return true;
            current = current.next;
        }
        return false;
    }

    // Delete a value from the doubly linked list
    delete(value: T): void {
        if (!this.head) return;

        if (this.head.value === value) {
            this.head = this.head.next;
            if (this.head) this.head.prev = null;
            if (this.head === null) this.tail = null;
            return;
        }

        let current = this.head;
        while (current && current.value !== value) {
            current = current.next;
        }

        if (current) {
            if (current.next) current.next.prev = current.prev;
            if (current.prev) current.prev.next = current.next;
            if (current === this.tail) this.tail = current.prev;
        }
    }
}
