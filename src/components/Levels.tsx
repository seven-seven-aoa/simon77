/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCSSVariable } from "./Dom";

export { create, getNext };

const levels: any[] = [];

function create() {
    const count     = 12;
    const increment = 23;
    let   speed     = 260;
    let   glow      = 160;

    for (let i = 0; i < count; i++) {
        levels.push({ speed, glow });
        speed += increment;
        glow += increment;
    }
}

function getNext() {
    const level = levels.pop();
    if (level) {
        setCSSVariable("glow_speed", `${level.speed}ms`);
    }
    return level;
}
