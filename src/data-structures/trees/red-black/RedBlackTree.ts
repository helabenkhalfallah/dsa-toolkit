import { Color, RedBlackTreeNode } from './RedBlackTreeNode.ts';

export class RedBlackTree<T> {
    private root: RedBlackTreeNode<T> | null = null;

    private rotateLeft(x: RedBlackTreeNode<T>): void {
        const y = x.right!;
        x.right = y.left;
        if (y.left) y.left.parent = x;
        y.parent = x.parent;
        if (!x.parent) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
    }

    private rotateRight(x: RedBlackTreeNode<T>): void {
        const y = x.left!;
        x.left = y.right;
        if (y.right) y.right.parent = x;
        y.parent = x.parent;
        if (!x.parent) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        y.right = x;
        x.parent = y;
    }

    insert(value: T): void {
        const newNode = new RedBlackTreeNode(value);
        this.root = this._insert(this.root, newNode);
        this.fixInsert(newNode);
    }

    private _insert(
        node: RedBlackTreeNode<T> | null,
        newNode: RedBlackTreeNode<T>,
    ): RedBlackTreeNode<T> | null {
        if (node === null) {
            return newNode;
        }

        if (newNode.value < node.value) {
            node.left = this._insert(node.left, newNode);
            if (node.left) node.left.parent = node;
        } else if (newNode.value > node.value) {
            node.right = this._insert(node.right, newNode);
            if (node.right) node.right.parent = node;
        } else {
            return node; // Duplicate values are not allowed
        }

        return node;
    }

    private fixInsert(node: RedBlackTreeNode<T>): void {
        while (node.parent && node.parent.color === Color.RED) {
            let parent = node.parent;
            const grandparent = parent.parent!;

            if (parent === grandparent.left) {
                const uncle = grandparent.right;
                if (uncle && uncle.color === Color.RED) {
                    // Case 1: Uncle is red
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    node = grandparent;
                } else {
                    // Case 2: Uncle is black, node is right child
                    if (node === parent.right) {
                        node = parent;
                        this.rotateLeft(node);
                        parent = node.parent!;
                    }
                    // Case 3: Uncle is black, node is left child
                    parent.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    this.rotateRight(grandparent);
                }
            } else {
                // Symmetric cases for when parent is right child
                const uncle = grandparent.left;
                if (uncle && uncle.color === Color.RED) {
                    parent.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    node = grandparent;
                } else {
                    if (node === parent.left) {
                        node = parent;
                        this.rotateRight(node);
                        parent = node.parent!;
                    }
                    parent.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    this.rotateLeft(grandparent);
                }
            }
        }
        this.root!.color = Color.BLACK;
    }

    search(value: T): boolean {
        return this._search(this.root, value);
    }

    private _search(node: RedBlackTreeNode<T> | null, value: T): boolean {
        if (node === null) {
            return false;
        }
        if (value === node.value) {
            return true;
        }
        if (value < node.value) {
            return this._search(node.left, value);
        } else {
            return this._search(node.right, value);
        }
    }

    delete(value: T): void {
        const nodeToDelete = this.findNode(value);
        if (!nodeToDelete) return;
        this.deleteNode(nodeToDelete);
    }

    private deleteNode(node: RedBlackTreeNode<T>): void {
        let replacement = node;
        let originalColor = replacement.color;
        let x: RedBlackTreeNode<T> | null = null;

        if (!node.left) {
            x = node.right;
            this.transplant(node, node.right);
        } else if (!node.right) {
            x = node.left;
            this.transplant(node, node.left);
        } else {
            replacement = this.minimum(node.right!);
            originalColor = replacement.color;
            x = replacement.right;

            if (replacement.parent === node) {
                if (x) x.parent = replacement;
            } else {
                this.transplant(replacement, replacement.right);
                replacement.right = node.right;
                if (replacement.right) replacement.right.parent = replacement;
            }

            this.transplant(node, replacement);
            replacement.left = node.left;
            if (replacement.left) replacement.left.parent = replacement;
            replacement.color = node.color;
        }

        if (originalColor === Color.BLACK) {
            this.fixDelete(x);
        }
    }

    private transplant(u: RedBlackTreeNode<T> | null, v: RedBlackTreeNode<T> | null): void {
        if (!u?.parent) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        if (v) v.parent = u?.parent;
    }

    private minimum(node: RedBlackTreeNode<T>): RedBlackTreeNode<T> {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    private findNode(value: T): RedBlackTreeNode<T> | null {
        let node = this.root;
        while (node) {
            if (value === node.value) return node;
            node = value < node.value ? node.left : node.right;
        }
        return null;
    }

    private fixDelete(x: RedBlackTreeNode<T> | null): void {
        while (x !== this.root && (!x || x.color === Color.BLACK)) {
            if (x && x.parent && x === x.parent.left) {
                let sibling = x.parent.right;
                if (sibling && sibling.color === Color.RED) {
                    sibling.color = Color.BLACK;
                    x.parent.color = Color.RED;
                    this.rotateLeft(x.parent);
                    sibling = x.parent.right;
                }
                if (
                    sibling &&
                    (!sibling.left || sibling.left.color === Color.BLACK) &&
                    (!sibling.right || sibling.right.color === Color.BLACK)
                ) {
                    sibling.color = Color.RED;
                    x = x.parent;
                } else if (sibling) {
                    if (!sibling.right || sibling.right.color === Color.BLACK) {
                        if (sibling.left) sibling.left.color = Color.BLACK;
                        sibling.color = Color.RED;
                        this.rotateRight(sibling);
                        sibling = x.parent.right;
                    }
                    sibling.color = x.parent.color;
                    x.parent.color = Color.BLACK;
                    if (sibling.right) sibling.right.color = Color.BLACK;
                    this.rotateLeft(x.parent);
                    x = this.root;
                }
            } else if (x && x.parent) {
                // Symmetric case for x being a right child
                let sibling = x.parent.left;
                if (sibling && sibling.color === Color.RED) {
                    sibling.color = Color.BLACK;
                    x.parent.color = Color.RED;
                    this.rotateRight(x.parent);
                    sibling = x.parent.left;
                }
                if (
                    sibling &&
                    (!sibling.right || sibling.right.color === Color.BLACK) &&
                    (!sibling.left || sibling.left.color === Color.BLACK)
                ) {
                    sibling.color = Color.RED;
                    x = x.parent;
                } else if (sibling) {
                    if (!sibling.left || sibling.left.color === Color.BLACK) {
                        if (sibling.right) sibling.right.color = Color.BLACK;
                        sibling.color = Color.RED;
                        this.rotateLeft(sibling);
                        sibling = x.parent.left;
                    }
                    sibling.color = x.parent.color;
                    x.parent.color = Color.BLACK;
                    if (sibling.left) sibling.left.color = Color.BLACK;
                    this.rotateRight(x.parent);
                    x = this.root;
                }
            } else {
                break; // Exit the loop if x becomes null or x.parent becomes null
            }

            // Move x up the tree
            x = x?.parent;
        }
        if (x) x.color = Color.BLACK;
    }
}
