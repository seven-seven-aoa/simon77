// core //
import { fadeAnimation, FadeDefaults } from "../core/FadeAnimation";
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
    setGameStatus(GameStatus.InitGame);
    FadeDefaults.in.durationMs = fadeTime.default.in;
    FadeDefaults.out.durationMs = fadeTime.default.out;

    initInput({
        captor: mainContainer(),
        observers: [triggerInitAudioContext, startGameIntro, resetButtonClick],
    });

    return setTimeout(showTitleScreen, delayTime.gameIntro);
}

async function showTitleScreen(): Promise<void> {
    await fadeAnimation(titleLayer().fadeInfo);
}

async function triggerInitAudioContext(inputInfo: InputInfo): Promise<void> {
    if (isGameStatus(GameStatus.InitGame) && inputInfo.isType(EventType.pointerdown)) {
        initAudioContext();
        setGameStatus(GameStatus.Ready);
    }
}

async function startGameIntro(inputInfo: InputInfo): Promise<void> {
    if (isGameStatus(GameStatus.Ready) && inputInfo.isType(EventType.pointerup)) {
        playStartupMusic();
        await fadeAnimation(titleLayer().fadeInfo);
        await fadeAnimation(controlLayer().fadeInfo);

        setGameStatus(GameStatus.Running);
    }
}

async function resetButtonClick(inputInfo: InputInfo): Promise<void> {
    if (isGameStatus(GameStatus.Running)
         && inputInfo.isType(EventType.pointerdown)
         && restartButton().containsPoint(inputInfo.screenPosition)) {


        setGameStatus(GameStatus.Stopped);
        window.location.reload();
    }
}
