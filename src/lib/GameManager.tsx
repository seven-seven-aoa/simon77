import { dxMultiple, dxSingle } from "./core/DomX";
import { ElementX } from "./core/ElementX";
import { fadeAnimation, FadeDefaults } from "./core/FadeAnimation";
import { InputObserver } from "./core/InputManager";

import { delayTime, fadeTime } from "./TimeConstants";
import { GameStatus } from "./GameTypes";
import { playStartupMusic } from "./MusicPlayer";
import { setGameStatus } from "./Status";

export { initGame, startGame, mainContainer, buttonArray, buttonLayer, controlLayer, debugLayer, scoreLayer, titleLayer };

function initGame(): number {
    setGameStatus(GameStatus.InitGame);
    FadeDefaults.in.durationMs = fadeTime.default.in;
    FadeDefaults.out.durationMs = fadeTime.default.out;

    return setTimeout(async () => {
        titleLayer().style.display = "block";
        await fadeAnimation(titleLayer().fadeInfo);
        setGameStatus(GameStatus.Ready);
    }, delayTime.gameIntro);
}

function startGame(inputObserver: InputObserver): void {
    inputObserver.inputEvent;
    setGameStatus(GameStatus.Running);
    fadeAnimation(titleLayer().fadeInfo);
    playStartupMusic();
}

function mainContainer(): ElementX {
    return dxSingle("main");
}

function buttonArray(): ElementX[] {
    const elx: ElementX[] = dxMultiple("main > section.buttonLayer > div.button");
    return elx;
}

function buttonLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.buttonLayer");
    elx.fadeInfo.fadeInConfig.durationMs = fadeTime.buttons.in;
    elx.fadeInfo.fadeOutConfig.durationMs = fadeTime.buttons.out;
    return elx;
}

function controlLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.controlLayer");
    elx.fadeInfo.fadeInConfig.durationMs = fadeTime.control.in;
    elx.fadeInfo.fadeOutConfig.durationMs = fadeTime.control.out;
    return elx;
}

function debugLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.debugLayer");
    elx.fadeInfo.fadeInConfig.durationMs = fadeTime.debug.in;
    elx.fadeInfo.fadeOutConfig.durationMs = fadeTime.debug.out;
    return elx;
}

function scoreLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.scoreLayer");
    elx.fadeInfo.fadeInConfig.durationMs = fadeTime.score.in;
    elx.fadeInfo.fadeOutConfig.durationMs = fadeTime.score.out;
    return elx;
}

function titleLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.titleLayer");
    elx.fadeInfo.fadeInConfig.durationMs = fadeTime.title.in;
    elx.fadeInfo.fadeOutConfig.durationMs = fadeTime.title.out;
    return elx;
}
