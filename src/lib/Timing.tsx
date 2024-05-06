export function delay(ms: number, multiplier?: number) {
    ms = Math.max(ms * (multiplier || 1), 1);
    return new Promise((r) => setTimeout(r, ms));
}