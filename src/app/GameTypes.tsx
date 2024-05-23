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
    None     = "None",
    Match    = "Match",
    Mismatch = "Mismatch",
    Partial  = "Partial",
}

interface GameLevel {
    levelNumber: number;
    glowSpeedMs: number;
    playNoteSpeedMs: number;
}

enum GameStatus {
    None                 = "None",
    FinalLost            = "FinalLost",
    FinalWon             = "FinalWon",
    InitButtons          = "InitButtons",
    InitGame             = "InitGame",
    InitLevels           = "InitLevels",
    Ready                = "Ready",
    Running              = "Running",
    WaitingForTouchEnd   = "WaitingForTouchEnd",
    WaitingForTouchStart = "WaitingForTouchStart",
}

interface SequenceStep {
    button: number;
}
