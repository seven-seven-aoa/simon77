import { GameStatus } from "./Types";

let _value: GameStatus = GameStatus.None;

export function getGameStatus() {
    return _value;
}

export function setGameStatus(value: GameStatus) {
    _value = value;
}
