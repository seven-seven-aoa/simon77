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
