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
    None               = "None",
    GameButtonInit     = "GameButtonInit",
    GameIntro          = "GameIntro",
    GameLevelInit      = "GameLevelInit",
    GameOverLoser      = "GameOverLoser",
    GameOverWinner     = "GameOverWinner",
    Restarting         = "Restarting",
    RestartInit        = "RestartInit",
    Running            = "Running",
    Starting           = "Starting",
    Stopped            = "Stopped",
    UserInit           = "UserInit",
    UserInitReady      = "UserInitReady",
    UserTurnReady      = "UserTurnReady",
}

interface SequenceStep {
    button: number;
}
