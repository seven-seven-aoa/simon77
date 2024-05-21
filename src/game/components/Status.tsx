export enum Value {
    None,
    Loading,
    Ready,
    Running,
    WaitingForTouchStart,
    WaitingForTouchEnd,
    GameLost,
    GameWon,
}

let _value: Value = Value.None;

export function get() {
    return _value;
}

export function set(value: Value) {
    _value = value;
}
