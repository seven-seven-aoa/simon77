import { ElementX } from "../../lib/ElementX";
import * as dom from "../../lib/DomX";
import * as time from "./Time";

export function buttonsEach(): ElementX[] {
    const elx: ElementX[] = dom.multiple("main > section.buttons > div.button");
    return elx;
}

export function buttonsSection(): ElementX {
    const elx: ElementX = dom.single("main > section.buttons");
    elx.fadeConfig.in.durationMs = time.fade.buttons.in;
    elx.fadeConfig.out.durationMs = time.fade.buttons.out;
    return elx;
}

export function controlSection(): ElementX {
    const elx: ElementX = dom.single("main > section.control");
    elx.fadeConfig.in.durationMs = time.fade.control.in;
    elx.fadeConfig.out.durationMs = time.fade.control.out;
    return elx;
}

export function debugSection(): ElementX {
    const elx: ElementX = dom.single("main > section.debug");
    elx.fadeConfig.in.durationMs = time.fade.debug.in;
    elx.fadeConfig.out.durationMs = time.fade.debug.out;
    return elx;
}

export function scoreSection(): ElementX {
    const elx: ElementX = dom.single("main > section.score");
    elx.fadeConfig.in.durationMs = time.fade.score.in;
    elx.fadeConfig.out.durationMs = time.fade.score.out;
    return elx;
}

export function titleSection(): ElementX {
    const elx: ElementX = dom.single("main > section.title");
    elx.fadeConfig.in.durationMs = time.fade.title.in;
    elx.fadeConfig.out.durationMs = time.fade.title.out;
    return elx;
}



