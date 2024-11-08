import { BTreeNode } from './BTreeNode.ts';

export class BTree<T> {
    private root: BTreeNode<T> | null = null;
    private readonly t: number;

    constructor(t: number) {
        this.t = t;
    }

    // Utility function to search a key in this tree
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

    // Insert a new key into this B-tree
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

    private insertNonFull(node: BTreeNode<T>, key: T): void {
        let i = node.keys.length - 1;

        if (node.leaf) {
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            node.keys.splice(i + 1, 0, key);
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

    // Deletes a key from this B-tree
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

    private deleteFromNode(node: BTreeNode<T> | null, key: T): void {
        if (!node) return; // Check if node is null

        const idx = node.keys.findIndex((k) => k === key);

        // Case 1: The key is found in this node
        if (idx !== -1) {
            if (node.leaf) {
                // Case 1a: The node is a leaf node
                node.keys.splice(idx, 1);
            } else {
                // Case 1b: The node is an internal node
                if (node.children[idx].keys.length >= this.t) {
                    // Predecessor
                    node.keys[idx] = this.getPredecessor(node, idx);
                    this.deleteFromNode(node.children[idx], node.keys[idx]);
                } else if (node.children[idx + 1].keys.length >= this.t) {
                    // Successor
                    node.keys[idx] = this.getSuccessor(node, idx);
                    this.deleteFromNode(node.children[idx + 1], node.keys[idx]);
                } else {
                    // Merge
                    this.merge(node, idx);
                    this.deleteFromNode(node.children[idx], key);
                }
            }
        } else if (!node.leaf) {
            // Case 2: The key is not found in this node and node is not a leaf
            let i = node.keys.findIndex((k) => key < k);
            if (i === -1) i = node.keys.length; // If key is greater than all keys

            const child = node.children[i];
            if (child.keys.length < this.t) {
                this.fill(node, i);
            }
            this.deleteFromNode(node.children[i], key);
        }
    }

    private getPredecessor(node: BTreeNode<T>, idx: number): T {
        let current = node.children[idx];
        while (!current.leaf) {
            current = current.children[current.keys.length];
        }
        return current.keys[current.keys.length - 1];
    }

    private getSuccessor(node: BTreeNode<T>, idx: number): T {
        let current = node.children[idx + 1];
        while (!current.leaf) {
            current = current.children[0];
        }
        return current.keys[0];
    }

    private fill(node: BTreeNode<T>, i: number): void {
        // const child = node.children[i];
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

    private borrowFromPrev(node: BTreeNode<T>, i: number): void {
        const child = node.children[i];
        const sibling = node.children[i - 1];

        child.keys.unshift(node.keys[i - 1]);
        if (!child.leaf) child.children.unshift(sibling.children.pop()!);
        node.keys[i - 1] = sibling.keys.pop()!;
    }

    private borrowFromNext(node: BTreeNode<T>, i: number): void {
        const child = node.children[i];
        const sibling = node.children[i + 1];

        child.keys.push(node.keys[i]);
        if (!child.leaf) child.children.push(sibling.children.shift()!);
        node.keys[i] = sibling.keys.shift()!;
    }

    private merge(node: BTreeNode<T>, i: number): void {
        const child = node.children[i];
        const sibling = node.children[i + 1];

        child.keys.push(node.keys[i]);
        child.keys.push(...sibling.keys);
        if (!child.leaf) child.children.push(...sibling.children);

        node.keys.splice(i, 1);
        node.children.splice(i + 1, 1);
    }
}
