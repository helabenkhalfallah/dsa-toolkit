/**
 * Class representing a node in the doubly linked list for LRU Cache.
 */
class LRUNode<T> {
    key: number;
    value: T;
    prev: LRUNode<T> | null;
    next: LRUNode<T> | null;

    constructor(key: number, value: T) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

/**
 * Class representing an LRU Cache.
 */
export class LRUCache<T> {
    private capacity: number;
    private cache: Map<number, LRUNode<T>>;
    private head: LRUNode<T>;
    private tail: LRUNode<T>;

    /**
     * Creates an instance of LRUCache.
     * @param {number} capacity - The maximum number of items the cache can hold.
     */
    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map<number, LRUNode<T>>();
        this.head = new LRUNode(0, null!); // Dummy head
        this.tail = new LRUNode(0, null!); // Dummy tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * Retrieves the value associated with the specified key.
     * @param {number} key - The key to look up.
     * @returns {T | null} The value associated with the key, or null if not found.
     */
    get(key: number): T | null {
        if (!this.cache.has(key)) {
            return null;
        }

        const node = this.cache.get(key)!;
        this.moveToHead(node);
        return node.value;
    }

    /**
     * Inserts or updates the value associated with the specified key.
     * @param {number} key - The key to insert or update.
     * @param {T} value - The value to associate with the key.
     */
    put(key: number, value: T): void {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!;
            node.value = value;
            this.moveToHead(node);
        } else {
            const newNode = new LRUNode(key, value);
            this.cache.set(key, newNode);
            this.addNode(newNode);

            if (this.cache.size > this.capacity) {
                this.removeLRU();
            }
        }
    }

    /**
     * Moves a node to the head of the linked list.
     * @param {LRUNode<T>} node - The node to move.
     * @private
     */
    private moveToHead(node: LRUNode<T>): void {
        this.removeNode(node);
        this.addNode(node);
    }

    /**
     * Adds a node right after the head.
     * @param {LRUNode<T>} node - The node to add.
     * @private
     */
    private addNode(node: LRUNode<T>): void {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    /**
     * Removes a node from the linked list.
     * @param {LRUNode<T>} node - The node to remove.
     * @private
     */
    private removeNode(node: LRUNode<T>): void {
        const prevNode = node.prev;
        const nextNode = node.next;

        prevNode!.next = nextNode;
        nextNode!.prev = prevNode;
    }

    /**
     * Removes the least recently used node from the cache.
     * @private
     */
    private removeLRU(): void {
        const lruNode = this.tail.prev!;
        this.removeNode(lruNode);
        this.cache.delete(lruNode.key);
    }
}
