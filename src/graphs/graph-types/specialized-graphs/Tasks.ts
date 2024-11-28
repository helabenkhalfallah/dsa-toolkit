import { DAG } from '../general-graphs/DAG.ts';

/**
 * Represents a Task Dependency Graph.
 * A TaskGraph is a Directed Acyclic Graph (DAG) where nodes represent tasks
 * and edges represent dependencies between tasks.
 */
export class TaskGraph extends DAG<string, number> {
    /**
     * Adds a task to the graph.
     *
     * @param task - The name of the task to be added.
     */
    addTask(task: string): void {
        this.addVertex(task);
    }

    /**
     * Adds a dependency between two tasks.
     * Specifies that `task2` is dependent on `task1` and optionally assigns a weight
     * to the dependency (e.g., priority, cost, or time).
     *
     * @param task1 - The task that must be completed first.
     * @param task2 - The task that depends on the completion of `task1`.
     * @param weight - The weight of the dependency (optional, e.g., priority or time).
     */
    addDependency(task1: string, task2: string, weight: number): void {
        this.addEdge(task1, task2, weight);
    }
}
