/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDomAll } from "./Dom";
import { CompareResult, addUserStep, compareSequences } from "./Sequence";
import { Events } from "./Events";

export { init, enableInput, getState, trigger };

let _buttons: any[] = [];
const _state: any = {
    inputEnabled: false,
    compareResult: null,
};

function init(sound: any) {
    _buttons = getDomAll("button");

    _buttons.forEach((button: any, index: number) => {
        button.gameId = index;
        button.playSound = () => {
            sound.playButton(index);
        };
        button.stopSound = () => {
            sound.stop();
        };

        button.addEventListener(Events.TOUCH_START, handleTouchStart);
        button.addEventListener(Events.TOUCH_END, handleTouchEnd);
        button.addEventListener(Events.MOUSE_DOWN, handleTouchStart);
        button.addEventListener(Events.MOUSE_UP, handleTouchEnd);
    });
}

function handleTouchStart(event: Event) {
    if (!_state.inputEnabled) return;
    event.preventDefault();
    animateTouchStart(event.target);
}

function handleTouchEnd(event: any) {
    if (!_state.inputEnabled) return;
    event.preventDefault();
    animateTouchEnd(event.target);
    addUserStep(event.target.gameId);
    _state.compareResult = compareSequences();
    _state.inputEnabled = _state.compareResult === CompareResult.PARTIAL;
}

function getState() {
    return _state;
}

function enableInput() {
    _state.inputEnabled = true;
}

function trigger(index: number, glow: number, sequenceStep: number) {
    const button = _buttons[index];
    button.innerHTML = sequenceStep;
    animateTouchStart(button);
    setTimeout(() => animateTouchEnd(button), glow);
}

function animateTouchStart(button: any) {
    button.className = "glow";
    button.playSound();
}

function animateTouchEnd(button: any) {
    button.stopSound();
    button.innerHTML = "&nbsp;";
    button.className = "";
}
