/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCSSVariable } from "./Dom";

export { init, next };

const levels: any[] = [];

function init() {
    const count     = 2;
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
