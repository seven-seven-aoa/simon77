import * as time from "./GameTime";
import * as dom from "../lib/Dom";
import { ElementX } from "../lib/ElementX";

export function buttons(): ElementX[] {
    return dom.multiple("b");
}

export function control(): ElementX {
    const elx: ElementX = dom.single("main > section.control");
    elx.fade.in.durationMs = time.fade.control.in;
    elx.fade.out.durationMs = time.fade.control.out;
    return elx;
}

export function debug(): ElementX {
    const elx: ElementX = dom.single("main > section.debug");
    elx.fade.in.durationMs = time.fade.debug.in;
    elx.fade.out.durationMs = time.fade.debug.out;
    return elx;
}

export function game(): ElementX {
    const elx: ElementX = dom.single("main > section.game");
    elx.fade.in.durationMs = time.fade.game.in;
    elx.fade.out.durationMs = time.fade.game.out;
    return elx;
}

export function score(): ElementX {
    const elx: ElementX = dom.single("main > section.score");
    elx.fade.in.durationMs = time.fade.score.in;
    elx.fade.out.durationMs = time.fade.score.out;
    return elx;
}

export function title(): ElementX {
    const elx: ElementX = dom.single("main > section.title");
    elx.fade.in.durationMs = time.fade.title.in;
    elx.fade.out.durationMs = time.fade.title.out;
    return elx;
}
