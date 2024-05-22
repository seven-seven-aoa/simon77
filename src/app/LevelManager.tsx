import { delay } from "../core/TimeManager";

import { addSequenceStep, clearUserSequence,  getSequenceStep } from "./Sequencer";
import { GameLevel, GameStatus, SequenceStep } from "./GameTypes";
import { sequenceTrigger } from "./ButtonManager";
import { setGameStatus } from "./GameStatus";

export { initLevels, popLevel, runLevel };

const _levels: GameLevel[] = [];

function initLevels() {
    setGameStatus(GameStatus.InitLevels);
    const speeds: number[] = [150, 200, 250, 300, 350, 400, 450, 500, 550, 600];

    for (let i = 0; i < speeds.length; i++) {
        const speed = speeds[i];
        _levels.push({
            levelNumber: speeds.length - i,
            glowSpeedMs: speed * 0.65,
            playNoteSpeedMs: speed,
        });
    }
}

function popLevel(): GameLevel | undefined {
    return _levels.pop();
}

async function runLevel(level: GameLevel) {
    addSequenceStep(1);

    let sequenceStep: number = -1;
    let levelComplete: boolean = false;

    while (!levelComplete) {
        const step: SequenceStep = getSequenceStep(++sequenceStep);
        if (!step) {
            levelComplete = true;
            break;
        }
        sequenceTrigger(step.button, level.glowSpeedMs);
        await delay(level.playNoteSpeedMs);
    }

    clearUserSequence();
    setGameStatus(GameStatus.WaitingForTouchStart);
}
