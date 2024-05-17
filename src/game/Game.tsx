export enum State {
    None,
    Loading,
    Ready,
    Running,
    GameLost,
    GameWon,
}

let _state: State = State.None;

export function getState() {
    return _state;
}

export function setState(state: State) {
    _state = state;
}
