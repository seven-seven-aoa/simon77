export type { MusicNote };
export { playNote, RampType, initAudioContext };

enum RampType {
    none        = "none",
    exponential = "exponential",
    liner       = "liner",
}

interface MusicNote {
    gain?: EnvelopeNode[];
    nostop?: boolean;
    note?: string;
    startGain?: number;
    wave?: OscillatorType;
}

interface EnvelopeNode {
    ramp?: RampType;
    time?: number;
    value?: number;
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

function playNote(props: MusicNote) {
    
    props.note ??= "A4";
    props.wave ??= "triangle";
    props.gain ??= [];
    props.nostop ??= false;
    props.startGain ??= 0;

    const ctx = getAudioContext();
    const volume = ctx.createGain();

    const startTime = ctx.currentTime;
    volume.gain.setValueAtTime(props.startGain, startTime);

    let endTime = startTime;
    for (const node of props.gain) {
        node.value ??= 0.33;
        node.value = Math.max(node.value, 0);

        node.time ??= 0;
        endTime = startTime + node.time;

        node.ramp ??= RampType.none;
        switch (node.ramp) {
            case RampType.exponential:
                node.value = Math.max(node.value, minExponentialValue);
                volume.gain.exponentialRampToValueAtTime(node.value, endTime);
                break;
            case RampType.liner:
                volume.gain.linearRampToValueAtTime(node.value, endTime);
                break;
            default:
                volume.gain.setValueAtTime(node.value, endTime);
                break;
        }
    }

    const osc = ctx.createOscillator();
    osc.type = props.wave;
    osc.frequency.value = noteFreq(props.note);

    volume.connect(ctx.destination);
    osc.connect(volume);
    osc.start(startTime);
    if (!props.nostop) {
        osc.stop(endTime);
    }
    return osc;
}

const minExponentialValue: number = 0.000001;

//    gain = Math.round((gain + Number.EPSILON) * 100) / 100;

function noteFreq(note: string) {
    const octave: number = Number(note[note.length - 1]);
    if (note.length === 1) note += "_";
    if (note.indexOf("C#") === 0) note = "Db" + octave;
    if (note.indexOf("D#") === 0) note = "Eb" + octave;
    if (note.indexOf("F#") === 0) note = "Gb" + octave;
    if (note.indexOf("G#") === 0) note = "Ab" + octave;
    if (note.indexOf("A#") === 0) note = "Bb" + octave;
    return notes[note];
}

const notes: any = {
    // Octave 0
    C0: 16.35,
    Db0: 17.32,
    D0: 18.35,
    Eb0: 19.45,
    E0: 20.6,
    F0: 21.83,
    Gb0: 23.12,
    G0: 24.5,
    Ab0: 25.96,
    A0: 27.5,
    Bb0: 29.14,
    B0: 30.87,

    // Octave 1
    C1: 32.7,
    Db1: 34.65,
    D1: 36.71,
    Eb1: 38.89,
    E1: 41.2,
    F1: 43.65,
    Gb1: 46.25,
    G1: 49.0,
    Ab1: 51.91,
    A1: 55.0,
    Bb1: 58.27,
    B1: 61.74,

    // Octave 2
    C2: 65.41,
    Db2: 69.3,
    D2: 73.42,
    Eb2: 77.78,
    E2: 82.41,
    F2: 87.31,
    Gb2: 92.5,
    G2: 98.0,
    Ab2: 103.83,
    A2: 110.0,
    Bb2: 116.54,
    B2: 123.47,

    // Octave 3
    C3: 130.81,
    Db3: 138.59,
    D3: 146.83,
    Eb3: 155.56,
    E3: 164.81,
    F3: 174.61,
    Gb3: 185.0,
    G3: 196.0,
    Ab3: 207.65,
    A3: 220.0,
    Bb3: 233.08,
    B3: 246.94,

    // Octave 4
    C4: 261.63,
    Db4: 277.18,
    D4: 293.66,
    Eb4: 311.13,
    E4: 329.63,
    F4: 349.23,
    Gb4: 369.99,
    G4: 392.0,
    Ab4: 415.3,
    A4: 440.0,
    Bb4: 466.16,
    B4: 493.88,

    // Octave 5
    C5: 523.25,
    Db5: 554.37,
    D5: 587.33,
    Eb5: 622.25,
    E5: 659.25,
    F5: 698.46,
    Gb5: 739.99,
    G5: 783.99,
    Ab5: 830.61,
    A5: 880.0,
    Bb5: 932.33,
    B5: 987.77,

    // Octave 6
    C6: 1046.5,
    Db6: 1108.73,
    D6: 1174.66,
    Eb6: 1244.51,
    E6: 1318.51,
    F6: 1396.91,
    Gb6: 1479.98,
    G6: 1567.98,
    Ab6: 1661.22,
    A6: 1760.0,
    Bb6: 1864.66,
    B6: 1975.53,

    // Octave 7
    C7: 2093.0,
    Db7: 2217.46,
    D7: 2349.32,
    Eb7: 2489.02,
    E7: 2637.02,
    F7: 2793.83,
    Gb7: 2959.96,
    G7: 3135.96,
    Ab7: 3322.44,
    A7: 3520.0,
    Bb7: 3729.31,
    B7: 3951.07,

    // Octave 8
    C8: 4186.01,
    Db8: 4434.92,
    D8: 4698.63,
    Eb8: 4978.03,
    E8: 5274.04,
    F8: 5587.65,
    Gb8: 5919.91,
    G8: 6271.93,
    Ab8: 6644.88,
    A8: 7040.0,
    Bb8: 7458.62,
    B8: 7902.13,
};
