/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import * as dom from "../lib/Dom";
import { bind, InputEvents } from "../lib/Events";

export const buttons      = () => dom.getDomAll("b");
export const controlArea  = () => dom.getDomSingle(".controlArea");
export const gameArea     = () => dom.getDomSingle(".gameArea");
export const scoreArea    = () => dom.getDomSingle(".scoreArea");
export const titleArea    = () => dom.getDomSingle(".titleArea");

export const gameSequence = () => dom.getDomSingle("#gameSequence");
export const userSequence = () => dom.getDomSingle("#userSequence");

export function init(varFadeSpeedMs: number) {
    bind(
        [
            ...buttons(),
            controlArea(),
            gameArea(),
            scoreArea(),
            titleArea(),
        ],
        [InputEvents.DBL_CLICK, InputEvents.SELECT_START],
        (_handler: any) => {
            _handler.preventDefault();
            return false;
        }
    );
    setVarFadeSpeed(varFadeSpeedMs);
}

export function setVarGlowColor(index: number, color: string) {
    dom.setCssVar(`glow_color_${index}`, color);
}
export function setVarGlowSpeed(ms: number) {
    dom.setCssVar("glow_speed", `${ms}ms`);
}
export function setVarFadeSpeed(ms: number) {
    dom.setCssVar("fade_speed", `${ms}ms`);
}

