// core //
import { initInput, InputInfo } from "../core/InputManager";
import { EventType } from "../core/EventTypes";
import { initAudioContext } from "../core/SoundManager";

// app //
import { time } from "./TimeConstants";
import { GameStatus } from "./GameTypes";
import { isGameStatus, setGameStatus } from "./GameStatus";
import { playStartupMusic } from "./MusicPlayer";
import { buttonArray, buttonLayer, cacheElements, controlLayer, glowingArray, mainContainer, restartButton, scoreLayer, titleLayer } from "./GameElements";
import { delay } from "../core/TimeManager";

export { initGame };

function initGame(): number {
    setGameStatus(GameStatus.GameIntro);
    initInput({
        captor: mainContainer(),
        observers: [triggerInitAudioContext, startGameIntro, triggerRestart, executeRestart],
    });
    cacheElements();
    return setTimeout(showTitleScreen, time.beforeTitleLayerFadeIn);
}

async function blinkTest() {
    const button = glowingArray()[0];
    await button.fade({
        targetOpacity: button.opacity.get() === 0 ? 1 : 0,
        durationMs: 120,
    });
    await delay(600);
    await blinkTest();
}

async function showTitleScreen(): Promise<void> {
    blinkTest();
    await titleLayer().fade({ targetOpacity: 1, durationMs: time.titleLayerFadeIn });
    setGameStatus(GameStatus.UserInitReady);
}

function triggerInitAudioContext(inputInfo: InputInfo): void {
    if (!isGameStatus(GameStatus.UserInitReady)) return;
    if (!inputInfo.isType(EventType.pointerdown)) return;

    initAudioContext();
    setGameStatus(GameStatus.UserInit);
}

async function startGameIntro(inputInfo: InputInfo): Promise<void> {
    if (!isGameStatus(GameStatus.UserInit)) return;
    if (!inputInfo.isType(EventType.pointerup)) return;

    setGameStatus(GameStatus.Starting);
    playStartupMusic();
    await titleLayer().fade({ targetOpacity: 0, durationMs: time.titleLayerFadeOut });
    await controlLayer().fade({ targetOpacity: 1, durationMs: time.controlLayerFadeIn });
    scoreLayer().fade({ targetOpacity: 1, durationMs: time.scoreLayerFadeIn });
    setGameStatus(GameStatus.Running);
}

async function triggerRestart(inputInfo: InputInfo): Promise<void> {
    if (!isGameStatus(GameStatus.Running)) return;
    if (!inputInfo.isType(EventType.pointerdown)) return;
    if (!restartButton().containsPoint(inputInfo.screenPosition)) return;

    restartButton().fade({ targetOpacity: 1, durationMs: time.restartButtonFadeIn });
    setGameStatus(GameStatus.Restarting);
}

async function executeRestart(inputInfo: InputInfo): Promise<void> {
    if (!isGameStatus(GameStatus.Restarting)) return;
    if (!inputInfo.isType(EventType.pointerup)) return;

    setTimeout(
        () =>
            restartButton().fade({
                targetOpacity: 0,
                durationMs: time.restartButtonFadeOut,
            }),
        time.restartButtonFadeSustain,
    );
    await mainContainer().fade({ targetOpacity: 0, durationMs: time.mainContainerFadeOut });
    window.location.reload();
}
