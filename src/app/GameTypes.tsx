import { CSSProperties } from "react";
import { MusicNote } from "../core/SoundManager";

export type { Button, ButtonInput, GameLevel, SequenceStep };
export { GameStatus, CompareResult };

interface Button {
    index: number;
    input: ButtonInput;
    sound: ButtonSound;
    spot: string;
    style: ButtonStyle;
}

interface ButtonInput {
    push: () => void;
    release: () => void;
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
    FreePlay             = "FreePlay",
    FreePlayPushedButton = "FreePlayPushedButton",
    GameButtonInit       = "GameButtonInit",
    GameIntro            = "GameIntro",
    GameLevelInit        = "GameLevelInit",
    GameOverLoser        = "GameOverLoser",
    GameOverWinner       = "GameOverWinner",
    Restarting           = "Restarting",
    RestartInit          = "RestartInit",
    Running              = "Running",
    Starting             = "Starting",
    Stopped              = "Stopped",
    UserInit             = "UserInit",
    UserInitReady        = "UserInitReady",
    UserPushedButton     = "UserPushedButton",
    UserTurnNext         = "UserTurnNext",
    UserTurnSuccess      = "UserTurnSuccess",
    UserTurnFailure      = "UserTurnFailure",
}

interface SequenceStep {
    button: number;
}
