/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { delay } from "../lib/Timing";
import * as buttons from "./Buttons";
import * as cvar from "../lib/CSSVars";
import * as seq from "./Sequence";

export { init, next, run };

const levels: any[] = [];

function init() {
    const speeds: number[] = [150, 200, 250, 300, 350, 400, 450, 500, 550, 600];

    for (let i = 0; i < speeds.length; i++) {
        const speed = speeds[i];
        levels.push({ speed, glow: speed * 0.65, number: speeds.length - i });
    }
}

function next() {
    const level = levels.pop();
    if (level) {
        cvar.set("glow_speed", `${level.speed}ms`);
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
        await delay(level.speed);
    }

    seq.clearUserSequence();
    const isGameOver: boolean = await buttons.waitForUserInput();
    return isGameOver;
}
