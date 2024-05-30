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
import { initLevels, runNextLevel } from "./LevelManager";

export { initGame };

function initGame(): number {
    initLevels();
    setGameStatus(GameStatus.GameIntro);
    initInput({
        captor: mainContainer(),
        observers: [triggerInitAudioContext, startGameIntro, triggerRestart, executeRestart, pushButton, releaseButton],
    });
    cacheElements();
    return setTimeout(showTitleScreen, time.beforeTitleLayerFadeIn);
}

async function showTitleScreen() {
    await titleLayer().fade({ targetOpacity: 1, durationMs: time.titleLayerFadeIn });
    setGameStatus(GameStatus.UserInitReady);
}

function triggerInitAudioContext(inputInfo: InputInfo) {
    if (!isGameStatus(GameStatus.UserInitReady)) return;
    if (!inputInfo.isType(EventType.pointerdown)) return;

    initAudioContext();
    setGameStatus(GameStatus.UserInit);
}

async function startGameIntro(inputInfo: InputInfo) {
    if (!isGameStatus(GameStatus.UserInit)) return;
    if (!inputInfo.isType(EventType.pointerup)) return;

    setGameStatus(GameStatus.Starting);
    playStartupMusic();
    await titleLayer().fade({ targetOpacity: 0, durationMs: time.titleLayerFadeOut });

    await Promise.all([
        controlLayer().fade({ targetOpacity: 1, durationMs: time.controlLayerFadeIn }),
        scoreLayer().fade({ targetOpacity: 1, durationMs: time.scoreLayerFadeIn }),
        buttonLayer().fade({ targetOpacity: 1, durationMs: time.buttonLayerFadeIn }),
    ]);
    runGame();
}

async function runGame() {
    setGameStatus(GameStatus.Running);
    runNextLevel();
}

async function triggerRestart(inputInfo: InputInfo) {
    if (!isGameStatusAny(GameStatus.Running, GameStatus.UserTurnNext, GameStatus.GameOverLoser, GameStatus.GameOverWinner)) return;
    if (!inputInfo.isType(EventType.pointerdown)) return;
    if (!restartButton().containsPoint(inputInfo.screenPosition)) return;

    restartButton().fade({ targetOpacity: 1, durationMs: time.restartButtonFadeIn });
    setGameStatus(GameStatus.Restarting);
}

async function executeRestart(inputInfo: InputInfo) {
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
