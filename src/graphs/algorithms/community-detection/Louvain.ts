import { GraphInterface } from '../../commons/GraphInterface.js';

export class Louvain<T, E extends number> {
    private graph: GraphInterface<T, E>;

    constructor(graph: GraphInterface<T, E>) {
        this.graph = graph;
    }

    private calculateModularity(community: Map<T, number>): number {
        const totalWeight = this.graph.getTotalEdgeWeight(); // Total weight (2m)
        const processedEdges = new Set<string>();
        let modularity = 0;

        console.log('--- Debugging Modularity Calculation ---');
        console.log(`Total Weight (2m): ${totalWeight}`);
        console.log('Edge Contributions:');

        // Calculate modularity for all edges
        for (const source of this.graph.getVertices()) {
            const k_i = this.graph.getNodeDegree(source);

            for (const target of this.graph.getNeighbors(source)) {
                const edgeKey = source < target ? `${source}-${target}` : `${target}-${source}`;
                if (processedEdges.has(edgeKey)) continue; // Avoid double-counting edges
                processedEdges.add(edgeKey);

                const weight = this.graph.getEdgeData(source, target) ?? 0;
                const k_j = this.graph.getNodeDegree(target);

                const sameCommunity = community.get(source) === community.get(target) ? 1 : 0;
                const modularityContribution =
                    (weight - (k_i * k_j) / (2 * totalWeight)) * sameCommunity;

                modularity += modularityContribution;

                console.log(
                    `Edge (${source}-${target}): Weight = ${weight}, SameCommunity = ${sameCommunity}, Contribution: ${modularityContribution}`,
                );
            }
        }

        console.log(`Final Modularity (before normalization): ${modularity}`);
        const normalizedModularity = modularity / (2 * totalWeight);
        console.log(`Normalized Modularity: ${normalizedModularity}`);

        return normalizedModularity; // Return normalized modularity
    }

    private optimizeCommunities(community: Map<T, number>): boolean {
        let moved = false;
        const totalWeight = this.graph.getTotalEdgeWeight();

        // Optimize community assignments for each node
        for (const node of this.graph.getVertices()) {
            const currentCommunity = community.get(node)!;

            const communityWeights = new Map<number, number>();
            const k_i = this.graph.getNodeDegree(node);

            // Sum weights for each community that the node's neighbors belong to
            for (const neighbor of this.graph.getNeighbors(node)) {
                const weight = this.graph.getEdgeData(node, neighbor) ?? 0;
                const neighborCommunity = community.get(neighbor)!;

                communityWeights.set(
                    neighborCommunity,
                    (communityWeights.get(neighborCommunity) || 0) + weight,
                );
            }

            let bestCommunity = currentCommunity;
            let maxDeltaModularity = 0;

            // Evaluate modularity gain for each community
            for (const [targetCommunity, sumIn] of communityWeights.entries()) {
                const sumTot = Array.from(community.entries())
                    .filter(([, c]) => c === targetCommunity)
                    .reduce((sum, [n]) => sum + this.graph.getNodeDegree(n), 0);

                const deltaModularity =
                    (sumIn - (k_i * sumTot) / (2 * totalWeight)) / (2 * totalWeight);

                if (deltaModularity > maxDeltaModularity) {
                    maxDeltaModularity = deltaModularity;
                    bestCommunity = targetCommunity;
                }
            }

            // Update community if a better community was found
            if (bestCommunity !== currentCommunity) {
                community.set(node, bestCommunity);
                moved = true;
            }
        }

        return moved;
    }

    private normalizeCommunities(community: Map<T, number>): Map<T, number> {
        const labelMap = new Map<number, number>();
        let labelCounter = 0;

        for (const [node, communityLabel] of community.entries()) {
            if (!labelMap.has(communityLabel)) {
                labelMap.set(communityLabel, labelCounter++);
            }
            community.set(node, labelMap.get(communityLabel)!);
        }

        return community;
    }

    run(): { modularity: number; communities: Map<T, number> } {
        const community = new Map<T, number>();

        // Initialize each node in its own community
        for (const [index, vertex] of this.graph.getVertices().entries()) {
            community.set(vertex, index);
        }

        let improved = true;
        while (improved) {
            improved = this.optimizeCommunities(community);
        }

        // Calculate modularity and normalize communities
        const modularity = this.calculateModularity(community);
        const normalizedCommunity = this.normalizeCommunities(community);

        return { modularity, communities: normalizedCommunity };
    }
}
