/**
 * Node class representing each element in the Skip List.
 */
class SkipListNode<T> {
    value: T; // Value of the node
    forward: SkipListNode<T>[]; // Array of forward pointers

    /**
     * Creates a new SkipListNode.
     * @param {T} value - The value to be stored in the node.
     * @param {number} level - The level of the node.
     */
    constructor(value: T, level: number) {
        this.value = value;
        this.forward = new Array(level + 1).fill(null); // Initialize forward pointers
    }
}

/**
 * Class representing a Skip List data structure.
 */
export class SkipList<T> {
    private head: SkipListNode<T>; // Head node of the Skip List
    private maxLevel: number; // Maximum level of the Skip List
    private p: number; // Probability factor for level generation
    private level: number; // Current level of the Skip List

    /**
     * Creates a new SkipList.
     * @param {number} maxLevel - The maximum level of the Skip List.
     * @param {number} p - Probability factor for level generation (default: 0.5).
     */
    constructor(maxLevel: number, p: number = 0.5) {
        this.head = new SkipListNode<T>(null, maxLevel); // Initialize head node
        this.maxLevel = maxLevel;
        this.p = p;
        this.level = 0; // Initially, the skip list is empty
    }

    /**
     * Inserts a value into the Skip List.
     * @param {T} value - The value to insert.
     */
    insert(value: T): void {
        const update: SkipListNode<T>[] = new Array(this.maxLevel + 1);
        let current: SkipListNode<T> = this.head;

        // Find the position to insert the new node
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] !== null && current.forward[i].value < value) {
                current = current.forward[i];
            }
            update[i] = current; // Store the last node before the insertion point
        }

        current = current.forward[0]; // Move to the next level down

        // If the value is not already present, insert it
        if (current === null || current.value !== value) {
            const newLevel = this.randomLevel();
            if (newLevel > this.level) {
                for (let i = this.level + 1; i <= newLevel; i++) {
                    update[i] = this.head; // Update head for new levels
                }
                this.level = newLevel; // Update current level
            }

            const newNode = new SkipListNode(value, newLevel);
            for (let i = 0; i <= newLevel; i++) {
                newNode.forward[i] = update[i].forward[i];
                update[i].forward[i] = newNode;
            }
        }
    }

    /**
     * Searches for a value in the Skip List.
     * @param {T} value - The value to search for.
     * @returns {boolean} True if the value is found, false otherwise.
     */
    search(value: T): boolean {
        let current: SkipListNode<T> = this.head;

        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] !== null && current.forward[i].value < value) {
                current = current.forward[i];
            }
        }

        current = current.forward[0]; // Move to the next level down
        return current !== null && current.value === value; // Return true if found
    }

    /**
     * Deletes a value from the Skip List.
     * @param {T} value - The value to delete.
     */
    delete(value: T): void {
        const update: SkipListNode<T>[] = new Array(this.maxLevel + 1);
        let current: SkipListNode<T> = this.head;

        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] !== null && current.forward[i].value < value) {
                current = current.forward[i];
            }
            update[i] = current; // Store the last node before the deletion point
        }

        current = current.forward[0]; // Move to the next level down

        // If the value is found, remove it
        if (current !== null && current.value === value) {
            for (let i = 0; i <= this.level; i++) {
                if (update[i].forward[i] !== current) break; // Stop if the node is not found
                update[i].forward[i] = current.forward[i]; // Bypass the node
            }

            // Remove levels if necessary
            while (this.level > 0 && this.head.forward[this.level] === null) {
                this.level--;
            }
        }
    }

    /**
     * Generates a random level for a new node.
     * @returns {number} The generated level.
     */
    private randomLevel(): number {
        let lvl = 0;
        while (Math.random() < this.p && lvl < this.maxLevel) {
            lvl++;
        }
        return lvl;
    }
}
