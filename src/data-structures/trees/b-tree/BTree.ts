import { BTreeNode } from './BTreeNode.ts';

export class BTree<T> {
    private root: BTreeNode<T> | null = null;
    private readonly t: number;

    constructor(t: number) {
        this.t = t; // Minimum degree (defines the range for the number of keys)
    }

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
            node.keys.push(key); // Add the key to the leaf node
            node.keys.sort((a, b) => (a < b ? -1 : 1)); // Sort the keys
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

        // Move the right half of keys from child to newNode
        newNode.keys = child.keys.splice(t, t - 1);

        if (!child.leaf) {
            // Move the corresponding children to newNode
            newNode.children = child.children.splice(t);
        }

        parent.children.splice(i + 1, 0, newNode); // Insert newNode to parent's children
        parent.keys.splice(i, 0, child.keys.pop()!); // Move middle key from child to parent
    }

    delete(key: T): void {
        if (!this.root) return;
        this.deleteFromNode(this.root, key);

        // If the root becomes empty after deletion
        if (this.root.keys.length === 0) {
            if (!this.root.leaf) {
                this.root = this.root.children[0];
            } else {
                this.root = null;
            }
        }
    }

    private deleteFromNode(node: BTreeNode<T>, key: T): void {
        if (!node) return; // Key not found

        const i = node.keys.findIndex((k) => k === key);

        if (i !== -1) {
            // Key is present in the node
            if (node.leaf) {
                // Case 1: If the node is a leaf, simply remove the key
                node.keys.splice(i, 1);
            } else {
                // Case 2: If the node is an internal node
                if (node.children[i].keys.length >= this.t) {
                    // Case 2a: If the child that precedes key in the node has at least t keys,
                    // find the predecessor 'pred' of key in the subtree rooted at that child.
                    // Replace key by pred. Recursively delete pred in the child.
                    const pred = this.getPredecessor(node, i);
                    node.keys[i] = pred;
                    this.deleteFromNode(node.children[i], pred);
                } else if (node.children[i + 1].keys.length >= this.t) {
                    // Case 2b: If the child that succeeds key in the node has at least t keys,
                    // find the successor 'succ' of key in the subtree rooted at that child.
                    // Replace key by succ. Recursively delete succ in the child.
                    const succ = this.getSuccessor(node, i);
                    node.keys[i] = succ;
                    this.deleteFromNode(node.children[i + 1], succ);
                } else {
                    // Case 2c: If both the child that precedes key and the child that succeeds it
                    // have less that t keys, merge key and all of the child that succeeds key into
                    // the child that precedes key so that the child now contains 2t-1 keys.
                    // Free the child that succeeds key, which is now empty.
                    // Recursively delete key from the child which now contains 2t-1 keys.
                    this.merge(node, i);
                    this.deleteFromNode(node.children[i], key);
                }
            }
        } else {
            // Key is not present in the node, descend to appropriate child
            if (node.leaf) {
                return; // Key not found
            }

            let childIndex = node.keys.length;
            for (let j = 0; j < node.keys.length; j++) {
                if (key < node.keys[j]) {
                    childIndex = j;
                    break;
                }
            }

            // If the child has less than t keys, fill it up
            if (node.children[childIndex].keys.length < this.t) {
                this.fill(node, childIndex);
            }

            // Recursively delete from the appropriate child
            this.deleteFromNode(node.children[childIndex], key);
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
        node.keys[i - 1] = sibling.keys.pop()!;

        if (!child.leaf) {
            child.children.unshift(sibling.children.pop()!);
        }
    }

    private borrowFromNext(node: BTreeNode<T>, i: number): void {
        const child = node.children[i];
        const sibling = node.children[i + 1];

        child.keys.push(node.keys[i]);
        node.keys[i] = sibling.keys.shift()!;

        if (!child.leaf) {
            child.children.push(sibling.children.shift()!);
        }
    }

    private merge(node: BTreeNode<T>, i: number): void {
        const child = node.children[i];
        const sibling = node.children[i + 1];

        child.keys.push(node.keys[i]); // Move the key from the parent to the child
        child.keys = child.keys.concat(sibling.keys); // Merge sibling's keys into child

        if (!child.leaf) {
            child.children = child.children.concat(sibling.children); // Merge sibling's children
        }

        node.keys.splice(i, 1); // Remove the key from the parent
        node.children.splice(i + 1, 1); // Remove the sibling
    }
}
