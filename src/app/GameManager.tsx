import { delayTime, fadeTime } from "./TimeConstants";
import { disableCommomAnnnoyingEvents } from "../lib/EventManager";
import { dxMultiple, dxSingle } from "../lib/DomX";
import { ElementX } from "../lib/ElementX";
import { fade } from "../lib/animation/Fade";
import { FadeDefaults } from "../lib/animation/Types";
import { GameStatus } from "./Types";
import { initButtons } from "./ButtonManager";
import { initLevels } from "./LevelManager";
import { setGameStatus } from "./Status";

export function initGame(): number {
    setGameStatus(GameStatus.Initializing);
    FadeDefaults.in.durationMs = fadeTime.default.in;
    FadeDefaults.out.durationMs = fadeTime.default.out;

    initButtons();
    initLevels();

    disableCommomAnnnoyingEvents({
        elementObjects: [...buttonArray(), buttonLayer(), controlLayer(), debugLayer(), scoreLayer(), titleLayer()],
        includeDocument: true,
    });

    const ut: number = setTimeout(async () => {
        titleLayer().style.display = "block";
        await fade(titleLayer().fadeInfo);
        setGameStatus(GameStatus.Ready);
    }, delayTime.gameIntro);

    return ut;
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




