import { CSSProperties } from "react";
import { MusicNote } from "../core/SoundManager";

export type { Button, GameLevel, SequenceStep };
export { GameStatus, CompareResult };

interface Button {
    key: number;
    sound: ButtonSound;
    style: ButtonStyle;
}

interface ButtonSound {
    musicNote: MusicNote;
    oscillator: OscillatorNode | null;
}

interface ButtonStyle {
    cssProperties: CSSProperties;
    cssVarGlowColor: string;
    isGlowing: boolean;
}

enum CompareResult {
    None = 0,
    Match = 1,
    Partial = 2,
    Mismatch = 3,
}

interface GameLevel {
    levelNumber: number;
    glowSpeedMs: number;
    playNoteSpeedMs: number;
}

enum GameStatus {
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

interface SequenceStep {
    button: number;
}
