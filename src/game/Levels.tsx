import { delay } from "../lib/Timing";
import * as cssVariable from "../lib/CSSVariable";
import * as sequence from "./Sequence";

export { init, next, run };

interface Level {
    speed: number;
    glow: number;
    number: number;
}
const _levels: Level[] = [];

function init() {
    const speeds: number[] = [150, 200, 250, 300, 350, 400, 450, 500, 550, 600];

    for (let i = 0; i < speeds.length; i++) {
        const speed = speeds[i];
        _levels.push({ speed, glow: speed * 0.65, number: speeds.length - i });
    }
}

function next() {
    const level = _levels.pop();
    if (level) {
        cssVariable.set("glow_speed", `${level.speed}ms`);
    }
    return level;
}

async function run(level: Level) {
    sequence.addSequenceStep(1);
    let sequenceStep: number = -1;
    let levelComplete: boolean = false;

    while (!levelComplete) {
        const step: sequence.SequenceStep = sequence.getSequenceStep(++sequenceStep);
        if (!step) {
            levelComplete = true;
            break;
        }
        buttons.trigger(step.button, level.glow);
        await delay(level.speed);
    }

    sequence.clearUserSequence();
    await buttons.waitForUserInput();
}
