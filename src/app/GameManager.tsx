import { delayTime, fadeTime } from "./TimeConstants";
import { dxMultiple, dxSingle } from "../lib/DomX";
import { ElementX } from "../lib/ElementX";
import { fade } from "../lib/animation/Fade";
import { FadeDefaults } from "../lib/animation/Types";
import { GameStatus } from "./Types";
import { playStartupMusic } from "./MusicPlayer";
import { setGameStatus } from "./Status";
import { InputObserver } from "../lib/InputManager";

export function initGame(): number {
    setGameStatus(GameStatus.InitGame);
    FadeDefaults.in.durationMs = fadeTime.default.in;
    FadeDefaults.out.durationMs = fadeTime.default.out;

    return setTimeout(async () => {
        titleLayer().style.display = "block";
        await fade(titleLayer().fadeInfo);
        setGameStatus(GameStatus.Ready);
    }, delayTime.gameIntro);
}

export function startGame(inputObserver: InputObserver): void {
    inputObserver.inputEvent
    setGameStatus(GameStatus.Running);
    fade(titleLayer().fadeInfo);
    playStartupMusic();
}

export function mainContainer(): ElementX {
    return dxSingle("main");
}

export function buttonArray(): ElementX[] {
    const elx: ElementX[] = dxMultiple("main > section.buttonLayer > div.button");
    return elx;
}

export function buttonLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.buttonLayer");
    elx.fadeInfo.fadeInConfig.durationMs = fadeTime.buttons.in;
    elx.fadeInfo.fadeOutConfig.durationMs = fadeTime.buttons.out;
    return elx;
}

export function controlLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.controlLayer");
    elx.fadeInfo.fadeInConfig.durationMs = fadeTime.control.in;
    elx.fadeInfo.fadeOutConfig.durationMs = fadeTime.control.out;
    return elx;
}

export function debugLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.debugLayer");
    elx.fadeInfo.fadeInConfig.durationMs = fadeTime.debug.in;
    elx.fadeInfo.fadeOutConfig.durationMs = fadeTime.debug.out;
    return elx;
}

export function scoreLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.scoreLayer");
    elx.fadeInfo.fadeInConfig.durationMs = fadeTime.score.in;
    elx.fadeInfo.fadeOutConfig.durationMs = fadeTime.score.out;
    return elx;
}

export function titleLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.titleLayer");
    elx.fadeInfo.fadeInConfig.durationMs = fadeTime.title.in;
    elx.fadeInfo.fadeOutConfig.durationMs = fadeTime.title.out;
    return elx;
}
