export enum CompareResult {
    None = 0,
    Match = 1,
    Partial = 2,
    Mismatch = 3,
}

export interface GameLevel {
    levelNumber: number;
    glowSpeedMs: number;
    playNoteSpeedMs: number;
}




export interface SequenceStep {
    button: number;
}