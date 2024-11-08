/**
 * Class representing a node in a Binary Search Tree (BST).
 * @template T - The type of value stored in the node.
 */
export class BinarySearchTreeNode<T> {
    /** The value of the node */
    value: T;

    /** Left child of the node */
    left: BinarySearchTreeNode<T> | null = null;

    /** Right child of the node */
    right: BinarySearchTreeNode<T> | null = null;

    /**
     * Creates a new BinarySearchTreeNode.
     * @param {T} value - The value to store in the node.
     */
    constructor(value: T) {
        this.value = value;
    }
}
