import { BTreeNode } from './BTreeNode.ts';

/**
 * Class representing a B-Tree data structure.
 * @template T - The type of the keys stored in the tree.
 */
export class BTree<T> {
    private root: BTreeNode<T> | null = null;
    private readonly t: number;

    /**
     * Creates an instance of BTree.
     * @param {number} t - Minimum degree (defines the range for the number of keys in nodes).
     */
    constructor(t: number) {
        this.t = t;
    }

    /**
     * Searches for a key in the B-Tree.
     * @param {T} key - The key to search for.
     * @param {BTreeNode<T> | null} [node=this.root] - The node to start the search from.
     * @returns {BTreeNode<T> | null} - The node containing the key, or null if not found.
     */
    search(key: T, node: BTreeNode<T> | null = this.root): BTreeNode<T> | null {
        if (!node) return null;

        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }

        if (i < node.keys.length && node.keys[i] === key) {
            return node;
        }

        if (node.leaf) {
            return null;
        } else {
            return this.search(key, node.children[i]);
        }
    }

    /**
     * Inserts a key into the B-Tree.
     * @param {T} key - The key to insert.
     */
    insert(key: T): void {
        if (!this.root) {
            this.root = new BTreeNode<T>(true);
            this.root.keys.push(key);
        } else {
            if (this.root.keys.length === 2 * this.t - 1) {
                const newRoot = new BTreeNode<T>(false);
                newRoot.children.push(this.root);
                this.splitChild(newRoot, 0, this.root);
                this.root = newRoot;
            }
            this.insertNonFull(this.root, key);
        }
    }

    /**
     * Deletes a key from the B-Tree.
     * @param {T} key - The key to delete.
     */
    delete(key: T): void {
        if (!this.root) return;
        this.deleteFromNode(this.root, key);

        if (this.root.keys.length === 0) {
            if (!this.root.leaf) {
                this.root = this.root.children[0];
            } else {
                this.root = null;
            }
        }
    }

    /**
     * Inserts a key into a non-full node.
     * @param {BTreeNode<T>} node - The node to insert into.
     * @param {T} key - The key to insert.
     * @private
     */
    private insertNonFull(node: BTreeNode<T>, key: T): void {
        let i = node.keys.length - 1;

        if (node.leaf) {
            node.keys.push(key);
            node.keys.sort((a, b) => (a < b ? -1 : 1));
        } else {
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            i++;

            if (node.children[i].keys.length === 2 * this.t - 1) {
                this.splitChild(node, i, node.children[i]);
                if (key > node.keys[i]) {
                    i++;
                }
            }
            this.insertNonFull(node.children[i], key);
        }
    }

    /**
     * Splits a child node.
     * @param {BTreeNode<T>} parent - The parent node.
     * @param {number} i - The index of the child to split.
     * @param {BTreeNode<T>} child - The child node to split.
     * @private
     */
    private splitChild(parent: BTreeNode<T>, i: number, child: BTreeNode<T>): void {
        const newNode = new BTreeNode<T>(child.leaf);
        const t = this.t;

        newNode.keys = child.keys.splice(t, t - 1);

        if (!child.leaf) {
            newNode.children = child.children.splice(t);
        }

        parent.children.splice(i + 1, 0, newNode);
        parent.keys.splice(i, 0, child.keys.pop()!);
    }

    /**
     * Deletes a key from a specific node.
     * @param {BTreeNode<T>} node - The node to delete from.
     * @param {T} key - The key to delete.
     * @private
     */
    private deleteFromNode(node: BTreeNode<T>, key: T): void {
        if (!node) return;

        const i = node.keys.findIndex((k) => k === key);

        if (i !== -1) {
            if (node.leaf) {
                node.keys.splice(i, 1);
            } else {
                if (node.children[i].keys.length >= this.t) {
                    const pred = this.getPredecessor(node, i);
                    node.keys[i] = pred;
                    this.deleteFromNode(node.children[i], pred);
                } else if (node.children[i + 1].keys.length >= this.t) {
                    const succ = this.getSuccessor(node, i);
                    node.keys[i] = succ;
                    this.deleteFromNode(node.children[i + 1], succ);
                } else {
                    this.merge(node, i);
                    this.deleteFromNode(node.children[i], key);
                }
            }
        } else {
            if (node.leaf) {
                return;
            }

            let childIndex = node.keys.length;
            for (let j = 0; j < node.keys.length; j++) {
                if (key < node.keys[j]) {
                    childIndex = j;
                    break;
                }
            }

            if (node.children[childIndex].keys.length < this.t) {
                this.fill(node, childIndex);
            }

            this.deleteFromNode(node.children[childIndex], key);
        }
    }

    /**
     * Gets the predecessor key of a given key.
     * @param {BTreeNode<T>} node - The node to find the predecessor for.
     * @param {number} idx - The index of the key in the node.
     * @returns {T} - The predecessor key.
     * @private
     */
    private getPredecessor(node: BTreeNode<T>, idx: number): T {
        let current = node.children[idx];
        while (!current.leaf) {
            current = current.children[current.keys.length];
        }
        return current.keys[current.keys.length - 1];
    }

    /**
     * Gets the successor key of a given key.
     * @param {BTreeNode<T>} node - The node to find the successor for.
     * @param {number} idx - The index of the key in the node.
     * @returns {T} - The successor key.
     * @private
     */
    private getSuccessor(node: BTreeNode<T>, idx: number): T {
        let current = node.children[idx + 1];
        while (!current.leaf) {
            current = current.children[0];
        }
        return current.keys[0];
    }

    /**
     * Fills a child node at a given index if it has less than `t` keys.
     * @param {BTreeNode<T>} node - The parent node.
     * @param {number} i - The index of the child to fill.
     * @private
     */
    private fill(node: BTreeNode<T>, i: number): void {
        if (i > 0 && node.children[i - 1].keys.length >= this.t) {
            this.borrowFromPrev(node, i);
        } else if (i < node.keys.length && node.children[i + 1].keys.length >= this.t) {
            this.borrowFromNext(node, i);
        } else {
            if (i < node.keys.length) {
                this.merge(node, i);
            } else {
                this.merge(node, i - 1);
            }
        }
    }

    /**
     * Borrows a key from the previous sibling.
     * @param {BTreeNode<T>} node - The parent node.
     * @param {number} i - The index of the child to borrow into.
     * @private
     */
    private borrowFromPrev(node: BTreeNode<T>, i: number): void {
        const child = node.children[i];
        const sibling = node.children[i - 1];

        child.keys.unshift(node.keys[i - 1]);
        node.keys[i - 1] = sibling.keys.pop()!;

        if (!child.leaf) {
            child.children.unshift(sibling.children.pop()!);
        }
    }

    /**
     * Borrows a key from the next sibling.
     * @param {BTreeNode<T>} node - The parent node.
     * @param {number} i - The index of the child to borrow into.
     * @private
     */
    private borrowFromNext(node: BTreeNode<T>, i: number): void {
        const child = node.children[i];
        const sibling = node.children[i + 1];

        child.keys.push(node.keys[i]);
        node.keys[i] = sibling.keys.shift()!;

        if (!child.leaf) {
            child.children.push(sibling.children.shift()!);
        }
    }

    /**
     * Merges two child nodes at a given index.
     * @param {BTreeNode<T>} node - The parent node.
     * @param {number} i - The index of the child to merge.
     * @private
     */
    private merge(node: BTreeNode<T>, i: number): void {
        const child = node.children[i];
        const sibling = node.children[i + 1];

        child.keys.push(node.keys[i]);
        child.keys = child.keys.concat(sibling.keys);

        if (!child.leaf) {
            child.children = child.children.concat(sibling.children);
        }

        node.keys.splice(i, 1);
        node.children.splice(i + 1, 1);
    }
}
