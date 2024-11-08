class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

export class LinkedList<T> {
    private head: LinkedListNode<T> | null = null;
    private tail: LinkedListNode<T> | null = null;

    // Insert a new value at the end of the linked list in O(1) time
    insert(value: T): void {
        const newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
    }

    // Insert at a specific position
    insertAt(value: T, index: number): void {
        const newNode = new LinkedListNode(value);

        if (index <= 0 || !this.head) {
            // Insert at the beginning
            newNode.next = this.head;
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
            current.next = newNode;
            if (!newNode.next) this.tail = newNode;
        } else {
            // If the index is out of bounds, append to the end
            this.tail!.next = newNode;
            this.tail = newNode;
        }
    }

    // Search for a value in the linked list
    search(value: T): boolean {
        let current = this.head;
        while (current) {
            if (current.value === value) return true;
            current = current.next;
        }
        return false;
    }

    // Delete a value from the linked list
    delete(value: T): void {
        if (!this.head) return;

        if (this.head.value === value) {
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            return;
        }

        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }

        if (current.next) {
            if (current.next === this.tail) this.tail = current;
            current.next = current.next.next;
        }
    }
}
