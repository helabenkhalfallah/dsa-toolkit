/**
 * Class representing a node in an AVL Tree.
 * @template T - The type of the value stored in the node.
 */
export class AVLTreeNode<T> {
    /** The value stored in the node. */
    value: T;

    /** The height of the node, used to maintain AVL balance. */
    height: number = 1;

    /** Pointer to the left child node. */
    left: AVLTreeNode<T> | null = null;

    /** Pointer to the right child node. */
    right: AVLTreeNode<T> | null = null;

    /**
     * Creates an instance of AVLTreeNode.
     * @param {T} value - The value to store in the node.
     */
    constructor(value: T) {
        this.value = value;
    }
}
