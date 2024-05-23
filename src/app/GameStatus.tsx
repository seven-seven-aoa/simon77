import { EventType } from "../core/EventTypes";
import { InputInfo } from "../core/InputManager";
import { GameStatus } from "./GameTypes";
export { getGameStatus, setGameStatus, isGameStatus, isGameEvent };

let _value: GameStatus = GameStatus.None;

function getGameStatus(): GameStatus {
    return _value;
}

function setGameStatus(value: GameStatus): GameStatus {
    _value = value;
    console.debug({ GameStatus: _value });
    return _value;
}

function isGameStatus(value: GameStatus): boolean {
    return _value === value;
}

function isGameEvent(gameStatus: GameStatus, inputInfo: InputInfo, eventType: EventType): boolean {
    return isGameStatus(gameStatus) && inputInfo.isType(eventType);
}
