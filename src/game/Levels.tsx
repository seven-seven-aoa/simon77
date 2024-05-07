/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dom from "./GameDom";
import * as time from "./GameTiming";
import * as seq from "./Sequence";
import * as buttons from "./Buttons";

export { init, next, run };

const levels: any[] = [];

function init() {
    const count: number = 10;
    const increment: number = 23;
    let speed: number = 260;
    let glow: number = 160;

    for (let i = 0; i < count; i++) {
        levels.push({ speed, glow });
        speed += increment;
        glow += increment;
    }
}

function next() {
    const level = levels.pop();
    if (level) {
        dom.setGlowSpeed(level.speed);
    }
    return level;
}

async function run(level: any) {
    seq.addSequenceStep();

    let sequenceStep = -1;
    while (true) {
        const step = seq.getSequenceStep(++sequenceStep);
        if (!step) {
            break;
        }

        const { button } = step;
        buttons.trigger(button, level.glow);
        await time.Delay.levelSpeed(level);
    }

    seq.clearUserSequence();
    const isGameOver: boolean = await buttons.waitForUserInput();
    return isGameOver;
}
