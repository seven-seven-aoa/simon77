import { delay } from "../lib/Timing";
import * as buttons from "./GameButton";
import * as cvar from "../lib/CSSVars";
import * as seq from "./Sequence";

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
        cvar.set("glow_speed", `${level.speed}ms`);
    }
    return level;
}

async function run(level: Level) {
    seq.addSequenceStep(1);
    let sequenceStep: number = -1;
    let levelComplete: boolean = false;

    while (!levelComplete) {
        const step: seq.SequenceStep = seq.getSequenceStep(++sequenceStep);
        if (!step) {
            levelComplete = true;
            break;
        }
        buttons.trigger(step.button, level.glow);
        await delay(level.speed);
    }

    seq.clearUserSequence();
    await buttons.waitForUserInput();
}
