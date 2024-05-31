// core //
import { initInput, InputInfo } from "../core/InputManager";
import { EventType } from "../core/EventTypes";
import { initAudioContext } from "../core/SoundManager";

// app //
import { time } from "./TimeConstants";
import { GameStatus } from "./GameTypes";
import { isGameStatus, setGameStatus } from "./GameStatus";
import { playStartupMusic } from "./MusicPlayer";
import { buttonLayer, cacheElements, settingsBarLayer, mainContainer, scoreLayer, titleLayer } from "./GameElements";
import { pressButton, releaseButton } from "./ButtonManager";
import { initLevels, runNextLevel } from "./LevelManager";
import { triggerRestart, executeRestart } from "./SettingsManager";

export { initGame };

function initGame(): number {
    initLevels();
    setGameStatus(GameStatus.GameIntro);
    initInput({
        captor: mainContainer(),
        observers: [triggerInitAudioContext, startGameIntro, triggerRestart, executeRestart, pressButton, releaseButton],
    });
    cacheElements();
    return setTimeout(showTitleScreen, time.beforeTitleLayerFadeIn);
}

async function showTitleScreen() {
    await titleLayer().fade({ targetValue: 1, durationMs: time.titleLayerFadeIn });
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
    await titleLayer().fade({ targetValue: 0, durationMs: time.titleLayerFadeOut });

    await Promise.all([
        settingsBarLayer().fade({ targetValue: 1, durationMs: time.settingsBarLayerFadeIn }),
        scoreLayer().fade({ targetValue: 1, durationMs: time.scoreLayerFadeIn }),
        buttonLayer().fade({ targetValue: 1, durationMs: time.buttonLayerFadeIn }),
    ]);
    runGame();
}

async function runGame() {
    setGameStatus(GameStatus.Running);
    runNextLevel();
}
