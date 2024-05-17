export function applyProgress(
    duration: number,
    progressUpdater: (progress: number) => void,
    onComplete?: () => void
) {
    const startTime: number = performance.now();
    return new Promise((resolve) => {
        function step() {
            const elapsed: number = performance.now() - startTime;
            const progress: number = Math.min(elapsed / duration, 1);
            progressUpdater(progress);
            if (progress < 1) {
                window.requestAnimationFrame(step);
                return;
            }
            if (onComplete) {
                onComplete();
            }
            resolve(void 0);
        }
        window.requestAnimationFrame(step);
    });
}