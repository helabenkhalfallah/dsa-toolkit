/**
 * Class representing a node in a B-Tree.
 * @template T - The type of keys stored in the node.
 */
export class BTreeNode<T> {
    /** Array of keys in the node */
    keys: T[] = [];

    /** Array of child nodes */
    children: BTreeNode<T>[] = [];

    /** Boolean indicating whether the node is a leaf */
    leaf: boolean;

    /**
     * Creates an instance of BTreeNode.
     * @param {boolean} leaf - Indicates whether the node is a leaf.
     */
    constructor(leaf: boolean) {
        this.leaf = leaf;
    }
}
