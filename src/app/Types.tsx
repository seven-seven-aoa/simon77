import { CSSProperties } from "react";
import { MusicNote } from "../lib/SoundTypes";

export interface Button {
    key: number;
    sound: ButtonSound;
    style: ButtonStyle;
}

export interface ButtonSound {
    musicNote: MusicNote;
    oscillator: OscillatorNode | null;
}

export interface ButtonStyle {
    cssProperties: CSSProperties;
    cssVarGlowColor: string;
    isGlowing: boolean;
}

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

export enum GameStatus {
    None,
    InitLevels,
    InitButtons,
    InitGame,
    Ready,
    Running,
    WaitingForTouchStart,
    WaitingForTouchEnd,
    FinalLost,
    FinalWon,
}

export interface SequenceStep {
    button: number;
}
