import { delay } from "../../lib/TimeManager";
import {
    addSequenceStep,
    clearUserSequence,
    getSequenceStep,
} from "./SequenceManager";
import * as buttonSet from "./ButtonManager";
import * as gameStatus from "./Status";

export { init, pop, run };
const _levels: Level[] = [];

function init() {
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

function pop(): Level | undefined {
    return _levels.pop();
}

async function run(level: Level) {
    addSequenceStep(1);

    let sequenceStep: number = -1;
    let levelComplete: boolean = false;

    while (!levelComplete) {
        const step: SequenceStep = getSequenceStep(++sequenceStep);
        if (!step) {
            levelComplete = true;
            break;
        }
        buttonSet.trigger(step.button, level.glowSpeedMs);
        await delay(level.playNoteSpeedMs);
    }

    clearUserSequence();
    gameStatus.set(gameStatus.Value.WaitingForTouchStart);
}
