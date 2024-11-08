/**
 * Class representing a node in an AVL Tree.
 * @template T - The type of the value stored in the node.
 */
export class AVLTreeNode<T> {
    /**
     * The value stored in the node.
     * @type {T}
     */
    value: T;

    /**
     * The height of the node, used to maintain AVL balance.
     * @type {number}
     */
    height: number = 1;

    /**
     * The left child of the node.
     * @type {AVLTreeNode<T> | null}
     */
    left: AVLTreeNode<T> | null = null;

    /**
     * The right child of the node.
     * @type {AVLTreeNode<T> | null}
     */
    right: AVLTreeNode<T> | null = null;

    /**
     * Creates an instance of AVLTreeNode.
     * @param {T} value - The value to store in the node.
     */
    constructor(value: T) {
        this.value = value;
    }
}
