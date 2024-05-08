/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { delay } from "../lib/Timing";

export namespace WaitTime {
    export const fadeSpeed        :number = 800;
    export const inputLoopThrottle:number = 100;
    export const newLevelDelay    :number = 1000;
}

export namespace Delay {
    export async function fadeSpeed         (x?: number) { await delay(WaitTime.fadeSpeed, x); }
    export async function inputLoopThrottle (x?: number) { await delay(WaitTime.inputLoopThrottle, x); }
    export async function newLevelDelay     (x?: number) { await delay(WaitTime.newLevelDelay, x); }

    export async function levelSpeed(level: any) { await delay(level.speed, 1); }
}
