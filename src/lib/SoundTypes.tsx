export enum RampType {
    none,
    exponential,
    liner,
}

export interface MusicNote {
    gain?: EnvelopeNode[];
    nostop?: boolean;
    note?: string;
    startGain?: number;
    wave?: OscillatorType;
}

export interface EnvelopeNode {
    ramp?: RampType;
    time?: number;
    value?: number;
}
