// core //
import { fadeAnimation, FadeDefaults } from "../core/FadeAnimation";
import { initInput, InputInfo } from "../core/InputManager";
import { EventType } from "../core/EventTypes";
import { initAudioContext } from "../core/SoundManager";

// app //
import { delayTime, fadeTime } from "./TimeConstants";
import { GameStatus } from "./GameTypes";
import { isGameEvent, setGameStatus } from "./GameStatus";
import { playStartupMusic } from "./MusicPlayer";
import { controlLayer, mainContainer, titleLayer } from "./GameElements";

export { initGame, };

function initGame(): number {
    setGameStatus(GameStatus.InitGame);
    FadeDefaults.in.durationMs = fadeTime.default.in;
    FadeDefaults.out.durationMs = fadeTime.default.out;

    initInput({
        captor: mainContainer(),
        observers: [triggerInitAudioContext, startGameIntro],
    });

    return setTimeout(showTitleScreen, delayTime.gameIntro);
}

async function showTitleScreen(): Promise<void> {
    await fadeAnimation(titleLayer().fadeInfo);
}

async function triggerInitAudioContext(inputInfo: InputInfo): Promise<void> {
    if (isGameEvent(GameStatus.InitGame, inputInfo, EventType.pointerdown)) {
        initAudioContext();
        setGameStatus(GameStatus.Ready);
    }
}

async function startGameIntro(inputInfo: InputInfo): Promise<void> {
    if (isGameEvent(GameStatus.Ready, inputInfo, EventType.pointerup)) {
        
        playStartupMusic();
        await fadeAnimation(titleLayer().fadeInfo);
        await fadeAnimation(controlLayer().fadeInfo);

        setGameStatus(GameStatus.Running);
    }
}
