import { GameStatus } from "./GameTypes";
export { getGameStatus, setGameStatus, isGameStatus };

let _value: GameStatus = GameStatus.None;

function getGameStatus(): GameStatus {
    return _value;
}

function setGameStatus(value: GameStatus): GameStatus {
    _value = value;
    console.info({ GameStatus: _value });
    return _value;
}

function isGameStatus(value: GameStatus): boolean {
    return _value === value;
}