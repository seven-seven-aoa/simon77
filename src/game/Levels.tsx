/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as buttons from "./Buttons";
import * as dom from "./Dom";
import * as seq from "./Sequence";
import * as time from "./Timing";

export { init, next, run };

const levels: any[] = [];

function init() {
    const speeds: number[] = [150, 200, 250, 300, 350, 400, 450, 500, 550, 600];

    for (let i = 0; i < speeds.length; i++) {
        const speed = speeds[i];
        levels.push({ speed, glow: speed * 0.40, number: speeds.length - i });
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
    seq.addSequenceStep(1);

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
