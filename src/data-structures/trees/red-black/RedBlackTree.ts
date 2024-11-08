import { Color, RedBlackTreeNode } from './RedBlackTreeNode.ts';

export class RedBlackTree<T> {
    private root: RedBlackTreeNode<T> | null = null;

    // Helper function to rotate left at node x
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

    // Helper function to rotate right at node x
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

    // Insert a value into the Red-Black Tree
    insert(value: T): void {
        const newNode = new RedBlackTreeNode(value);
        if (!this.root) {
            this.root = newNode;
            this.root.color = Color.BLACK;
            return;
        }

        let node = this.root;
        let parent: RedBlackTreeNode<T> | null = null;
        while (node) {
            parent = node;
            if (value < node.value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }

        newNode.parent = parent;
        if (value < parent!.value) {
            parent!.left = newNode;
        } else {
            parent!.right = newNode;
        }

        this.fixInsert(newNode);
    }

    // Balances the tree after insertion
    private fixInsert(node: RedBlackTreeNode<T>): void {
        while (node.parent && node.parent.color === Color.RED) {
            const parent = node.parent;
            const grandparent = parent.parent!;

            if (grandparent) {
                if (parent === grandparent.left) {
                    const uncle = grandparent.right;
                    if (uncle && uncle.color === Color.RED) {
                        parent.color = Color.BLACK;
                        uncle.color = Color.BLACK;
                        grandparent.color = Color.RED;
                        node = grandparent;
                    } else {
                        if (node === parent.right) {
                            node = parent;
                            this.rotateLeft(node);
                        }
                        parent.color = Color.BLACK;
                        grandparent.color = Color.RED;
                        this.rotateRight(grandparent);
                    }
                } else {
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
                        }
                        parent.color = Color.BLACK;
                        grandparent.color = Color.RED;
                        this.rotateLeft(grandparent);
                    }
                }
            } else {
                break;
            }
        }
        this.root!.color = Color.BLACK;
    }

    // Search for a value in the Red-Black Tree
    search(value: T): boolean {
        return this.findNode(value) !== null;
    }

    private findNode(value: T): RedBlackTreeNode<T> | null {
        let node = this.root;
        while (node) {
            if (value === node.value) return node;
            node = value < node.value ? node.left : node.right;
        }
        return null;
    }

    // Delete a value from the Red-Black Tree
    delete(value: T): void {
        const nodeToDelete = this.findNode(value);
        if (!nodeToDelete) return;
        this.deleteNode(nodeToDelete);
    }

    private deleteNode(node: RedBlackTreeNode<T>): void {
        let replacement = node;
        let originalColor = replacement.color;
        let x: RedBlackTreeNode<T> | null;

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
        if (v) v.parent = u?.parent || null;
    }

    private minimum(node: RedBlackTreeNode<T>): RedBlackTreeNode<T> {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    private fixDelete(x: RedBlackTreeNode<T> | null): void {
        while (x !== this.root && (!x || x.color === Color.BLACK)) {
            if (x && x.parent && x === x.parent.left) {
                let sibling = x.parent.right;
                if (sibling?.color === Color.RED) {
                    sibling.color = Color.BLACK;
                    x.parent.color = Color.RED;
                    this.rotateLeft(x.parent);
                    sibling = x.parent.right;
                }
                if (
                    (!sibling?.left || sibling.left.color === Color.BLACK) &&
                    (!sibling?.right || sibling.right.color === Color.BLACK)
                ) {
                    if (sibling) sibling.color = Color.RED;
                    x = x.parent;
                } else {
                    if (!sibling?.right || sibling.right.color === Color.BLACK) {
                        if (sibling?.left) sibling.left.color = Color.BLACK;
                        if (sibling) sibling.color = Color.RED;
                        this.rotateRight(sibling);
                        sibling = x.parent.right;
                    }
                    if (sibling) sibling.color = x.parent.color;
                    x.parent.color = Color.BLACK;
                    if (sibling?.right) sibling.right.color = Color.BLACK;
                    this.rotateLeft(x.parent);
                    x = this.root;
                }
            } else if (x && x.parent) {
                let sibling = x.parent.left;
                if (sibling?.color === Color.RED) {
                    sibling.color = Color.BLACK;
                    x.parent.color = Color.RED;
                    this.rotateRight(x.parent);
                    sibling = x.parent.left;
                }
                if (
                    (!sibling?.right || sibling.right.color === Color.BLACK) &&
                    (!sibling?.left || sibling.left.color === Color.BLACK)
                ) {
                    if (sibling) sibling.color = Color.RED;
                    x = x.parent;
                } else {
                    if (!sibling?.left || sibling.left.color === Color.BLACK) {
                        if (sibling?.right) sibling.right.color = Color.BLACK;
                        if (sibling) sibling.color = Color.RED;
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
                break; // Safeguard in case `x` or `x.parent` is `null`
            }
        }
        if (x) x.color = Color.BLACK;
    }
}
