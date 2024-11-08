export function measureTime(fn: () => void): number {
    const start = performance.now();
    fn();
    return performance.now() - start;
}
