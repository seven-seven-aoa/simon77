import { ProgressTracker } from "./Types";

export function trackProgress(progressTracker: ProgressTracker) {
    const startTime: number = performance.now();
    return new Promise((resolve) => {
        function step() {
            const elapsed: number = performance.now() - startTime;
            const progress: number = Math.min(elapsed / progressTracker.durationMs, 1);
            progressTracker.onUpdate(progress);
            if (progress < 1) {
                window.requestAnimationFrame(step);
                return;
            }
            resolve(void 0);
        }
        window.requestAnimationFrame(step);
    });
}
