/* eslint-disable @typescript-eslint/no-namespace */
import * as dom from "../lib/Dom";

export const GameScreen = {
    NONE: 0,
    TITLE: 1,
    PLAY: 2
};

export namespace Class {
    export const control  :string = "control";
    export const game     :string = "game";
    export const title    :string = "title";
    export const overlay  :string = "overlay";
}

export namespace FadeIn {
    const dir = " fade_in";
    export const control:string = Class.control + dir;
    export const game   :string = Class.game    + dir;
    export const title  :string = Class.title   + dir;
}

export namespace FadeOut {
    const dir = " fade_out";
    export const control:string = Class.control + dir;
    export const game   :string = Class.game    + dir;
    export const title  :string = Class.title   + dir;
}

export namespace Query {
    export const buttons:string = ".button";
    export const control:string = `.${Class.control}`;
    export const game   :string = `.${Class.game}`;
    export const title  :string = `.${Class.title}`;
    export const overlay:string = `.${Class.overlay}`;

    export const gameSequence:string = "#game_sequence";
    export const userSequence:string = "#user_sequence";
}

export namespace Layer {
    export function buttons() { return  dom.getDomAll(Query.buttons);    }
    export function control() { return  dom.getDomSingle(Query.control); }
    export function game   () { return  dom.getDomSingle(Query.game);    }
    export function title  () { return  dom.getDomSingle(Query.title);   }
}

export namespace Hidden {
    export function gameSequence() { return dom.getDomSingle(Query.gameSequence); }
    export function userSequence() { return dom.getDomSingle(Query.userSequence); }
    export function overlay()      { return dom.getDomSingle(Query.overlay); }
}

export function setGlowColor(index: number, color: string) {
    dom.setCssVar(`glow_color_${index}`, color);
}

export function setGlowSpeed(ms: number) {
    dom.setCssVar("glow_speed", `${ms}ms`);
}

export function setFadeSpeed(ms: number) {
    dom.setCssVar("fade_speed", `${ms}ms`);
}

export function toggleOverlay(show: boolean) {
    Hidden.overlay().style.display = show ? "block" : "none";
}