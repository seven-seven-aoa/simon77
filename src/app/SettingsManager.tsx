import { EventType } from "../core/EventTypes";
import { InputInfo } from "../core/InputManager";
import { restartButton, mainContainer } from "./GameElements";
import { isGameStatusAny, setGameStatus, isGameStatus } from "./GameStatus";
import { GameStatus } from "./GameTypes";
import { time } from "./TimeConstants";

export { triggerRestart, executeRestart };

async function triggerRestart(inputInfo: InputInfo) {
    if (!isGameStatusAny(GameStatus.Running, GameStatus.UserTurnNext, GameStatus.GameOverLoser, GameStatus.GameOverWinner, GameStatus.FreePlay)) return;
    if (!inputInfo.isType(EventType.pointerdown)) return;
    if (!restartButton().containsPoint(inputInfo.screenPosition)) return;

    restartButton().fade({ targetValue: 1, durationMs: time.restartButtonFadeIn });
    setGameStatus(GameStatus.Restarting);
}

async function executeRestart(inputInfo: InputInfo) {
    if (!isGameStatus(GameStatus.Restarting)) return;
    if (!inputInfo.isType(EventType.pointerup)) return;

    setTimeout(
        () =>
            restartButton().fade({
                targetValue: 0,
                durationMs: time.restartButtonFadeOut,
            }),
        time.restartButtonFadeSustain,
    );
    await mainContainer().fade({ targetValue: 0, durationMs: time.mainContainerFadeOut });
    window.location.reload();
}
