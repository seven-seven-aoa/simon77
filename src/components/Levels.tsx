/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCSSVariable } from "./Dom";

export { init, next, run };

const levels: any[] = [];

function init() {
    const count     = 10;
    const increment = 23;
    let   speed     = 260;
    let   glow      = 160;

    for (let i = 0; i < count; i++) {
        levels.push({ speed, glow });
        speed += increment;
        glow += increment;
    }
}

function next() {
    const level = levels.pop();
    if (level) {
        setCSSVariable("glow_speed", `${level.speed}ms`);
    }
    return level;
}

async function run(level: any, 
    buttons: any, inputLoop: number, seq: any, time: any) {
    seq.addSequenceStep();

    let sequenceStep = -1;
    while (true) {
        const step = seq.getSequenceStep(++sequenceStep);
        if (!step) { break; }

        const { button } = step;
        buttons.trigger(button, level.glow, sequenceStep);
        await time.delay(level.speed);
    }

    seq.clearUserSequence();
    buttons.enableInput();

    let state = null;
    while (state === null || state.inputEnabled) {
        await time.delay(inputLoop);
        state = buttons.getState();
    }

    const isGameOver = (state.compareResult === seq.CompareResult.MISMATCH);
    return isGameOver;
}