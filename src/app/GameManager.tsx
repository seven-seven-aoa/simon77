// core //
import { initInput, InputInfo } from "../core/InputManager";
import { EventType } from "../core/EventTypes";
import { initAudioContext } from "../core/SoundManager";

// app //
import { time } from "./TimeConstants";
import { GameStatus } from "./GameTypes";
import { isGameStatus, isGameStatusAny, setGameStatus } from "./GameStatus";
import { playStartupMusic } from "./MusicPlayer";
import { buttonLayer, cacheElements, controlLayer, mainContainer, restartButton, scoreLayer, titleLayer } from "./GameElements";
import { pushButton, releaseButton } from "./ButtonManager";

export { initGame };

function initGame(): number {
    setGameStatus(GameStatus.GameIntro);
    initInput({
        captor: mainContainer(),
        observers: [triggerInitAudioContext, startGameIntro, triggerRestart, executeRestart, pushButton, releaseButton],
    });
    cacheElements();
    return setTimeout(showTitleScreen, time.beforeTitleLayerFadeIn);
}

async function showTitleScreen(): Promise<void> {
    await titleLayer().fade({ targetOpacity: 1, durationMs: time.titleLayerFadeIn });
    setGameStatus(GameStatus.UserInitReady);
}

function triggerInitAudioContext(inputInfo: InputInfo) {
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
    buttonLayer().fade({ targetOpacity: 1, durationMs: time.scoreLayerFadeIn });

    setGameStatus(GameStatus.Running);
    setGameStatus(GameStatus.UserTurnReady);
}

async function triggerRestart(inputInfo: InputInfo): Promise<void> {
    if (!isGameStatusAny(GameStatus.Running, GameStatus.UserTurnReady)) return;
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
