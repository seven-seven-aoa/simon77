// core //
import { initInput, InputInfo } from "../core/InputManager";
import { EventType } from "../core/EventTypes";
import { initAudioContext } from "../core/SoundManager";

// app //
import { delayTime, fadeTime } from "./TimeConstants";
import { GameStatus } from "./GameTypes";
import { isGameStatus, setGameStatus } from "./GameStatus";
import { playStartupMusic } from "./MusicPlayer";
import { controlLayer, mainContainer, restartButton, titleLayer } from "./GameElements";

export { initGame };

function initGame(): number {
    setGameStatus(GameStatus.GameIntro);
    initInput({
        captor: mainContainer(),
        observers: [triggerInitAudioContext, startGameIntro, triggerRestart, executeRestart],
    });
    return setTimeout(showTitleScreen, delayTime.gameIntro);
}

async function showTitleScreen(): Promise<void> {
    await titleLayer().fade({ targetOpacity: 1, durationMs: fadeTime.title });
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
    await titleLayer().fade({ targetOpacity: 0, durationMs: fadeTime.title });
    await controlLayer().fade({ targetOpacity: 1 });
    setGameStatus(GameStatus.Running);
}

async function triggerRestart(inputInfo: InputInfo): Promise<void> {
    if (!isGameStatus(GameStatus.Running)) return;
    if (!inputInfo.isType(EventType.pointerdown)) return;
    if (!restartButton().containsPoint(inputInfo.screenPosition)) return;

    await restartButton().fade({ targetOpacity: 1, durationMs: fadeTime.controlButtonActivate });
    setGameStatus(GameStatus.Restarting);
}

async function executeRestart(inputInfo: InputInfo): Promise<void> {
    if (!isGameStatus(GameStatus.Restarting)) return;
    if (!inputInfo.isType(EventType.pointerup)) return;

    await mainContainer().fade({ targetOpacity: 0 });
    window.location.reload();
}
