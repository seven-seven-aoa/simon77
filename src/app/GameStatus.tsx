import { ElementX } from "../core/ElementX";
import { InputObserver } from "../core/InputManager";
import { GameStatus } from "./GameTypes";
export { getGameStatus, setGameStatus };

let _value: GameStatus = GameStatus.None;

function getGameStatus() {
    return _value;
}

function setGameStatus(value: GameStatus) {
    _value = value;
    console.debug({ GameStatus: GameStatus[_value] });
}

interface GameEvent {
    gameStatus?: GameStatus;
    inputObserver?: InputObserver;
    elementFacts?: ElementFact[];
}

interface ElementFact {
    element: ElementX;
    condition: boolean;
}

function checkGameEvent(gameEvent: GameEvent): boolean {
    if (
        gameEvent.gameStatus !== undefined &&
        gameEvent.gameStatus !== getGameStatus()
    ) {
        return false;
    }
}
