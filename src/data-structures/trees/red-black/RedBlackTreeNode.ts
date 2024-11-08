/**
 * Enum representing the color of a Red-Black Tree node.
 */
export enum Color {
    /** Red color */
    RED,
    /** Black color */
    BLACK,
}

/**
 * Class representing a node in a Red-Black Tree.
 * @template T - The type of value stored in the node.
 */
export class RedBlackTreeNode<T> {
    /** The value of the node */
    value: T;

    /** The color of the node (either RED or BLACK) */
    color: Color;

    /** The left child of the node */
    left: RedBlackTreeNode<T> | null = null;

    /** The right child of the node */
    right: RedBlackTreeNode<T> | null = null;

    /** The parent node */
    parent: RedBlackTreeNode<T> | null = null;

    /**
     * Creates an instance of a RedBlackTreeNode.
     * @param {T} value - The value to store in the node.
     * @param {Color} color - The color of the node (default is RED).
     */
    constructor(value: T, color: Color = Color.RED) {
        this.value = value;
        this.color = color;
    }
}
