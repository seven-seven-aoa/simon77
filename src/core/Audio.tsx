export { initAudioContext, getAudioContext };
export type { AudioStart, AudioFade };

interface AudioStart {
    gain: number;
}

interface AudioFade {
    targetGain?: number;
    durationMs: number;
}

let ctx: AudioContext | null = null;
function getAudioContext(): AudioContext {
    if (ctx === null) {
        throw new Error("AudioContext not initialized");
    }
    ctx.resume();
    return ctx;
}

function initAudioContext() {
    if (ctx !== null) {
        throw new Error("AudioContext already initialized");
    }
    ctx = new AudioContext();
}
