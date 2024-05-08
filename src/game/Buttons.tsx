/* eslint-disable @typescript-eslint/no-explicit-any */

import { InputEvents } from "../lib/Events";
import { playNote } from "../lib/Sound";

import * as dom from "./Dom";
import * as seq from "./Sequence";
import * as time from "./Timing";

export { init, waitForUserInput, trigger };

let _buttons: any[] = [];
const _state: any = {
    compareResult: null,
    inputCompleted: false,
    allowTouchStart: false,
    allowTouchEnd: false,
    lastGlow: 0,
    lastTouch: 0,
};

function init() {
    const backColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
    const borderColors = ["#A00000", "#00A000", "#0000A0", "#A0A000"];
    const glowColors = ["#FFA0A0", "#A0FFA0", "#A0A0FF", "#FFFFA0"];

    glowColors.forEach((color: string, index: number) => {
        dom.setGlowColor(index, color);
    });

    _buttons = dom.Layer.buttons();
    const notes = ["C4", "Eb4", "G4", "Bb4"];

    _buttons.forEach((button: any, index: number) => {
        button.gameId = index;
        button.style.color = backColors[index];
        button.style.backgroundColor = backColors[index];
        button.style.borderColor = borderColors[index];

        button.sound = null;
        button.playSound = () => {
            button.sound = playNote({
                wave: "triangle",
                note: notes[index],
                nostop: true,
                startGain: 0.4,
            });
        };

        button.stopSound = () => {
            button.sound.stop();
        };

        button.addEventListener(InputEvents.MOUSE_DOWN, handleTouchStart);
        button.addEventListener(InputEvents.MOUSE_UP, handleTouchEnd);

        button.addEventListener(InputEvents.TOUCH_START, handleTouchStart);
        button.addEventListener(InputEvents.TOUCH_END, handleTouchEnd);
    });
}

function handleTouchStart(event: any) {
    event.preventDefault();
    if (!_state.allowTouchStart) {
        return;
    }

    _state.allowTouchStart = false;
    _state.lastTouch = Date.now();
    animateTouchStart(event.target);

    seq.addUserStep(event.target.gameId);
    _state.compareResult = seq.compareSequences();

    if (_state.compareResult === seq.CompareResult.MISMATCH) {
        setTimeout(() => {
            animateTouchEnd(event.target);
            _state.inputCompleted = true;
        }, _state.lastGlow);
        return;
    }

    _state.allowTouchEnd = true;
}

function handleTouchEnd(event: any) {
    event.preventDefault();
    if (!_state.allowTouchEnd) {
        return;
    }

    _state.allowTouchEnd = false;
    let animationWait: number = 1;
    if (Date.now() - _state.lastTouch < _state.lastGlow) {
        animationWait = _state.lastGlow;
    }

    setTimeout(() => {
        animateTouchEnd(event.target);
    }, animationWait);

    if (_state.compareResult === seq.CompareResult.MATCH) {
        _state.inputCompleted = true;
        return;
    }

    _state.allowTouchStart = true;
}

async function waitForUserInput() {
    _state.inputCompleted = false;
    _state.allowTouchEnd = false;
    _state.allowTouchStart = true;

    while (!_state.inputCompleted) {
        await time.Delay.inputLoopThrottle();
    }

    const isGameOver: boolean =
        _state.compareResult === seq.CompareResult.MISMATCH;
    return isGameOver;
}

function trigger(index: number, glow: number) {
    const button = _buttons[index];
    _state.lastGlow = glow;
    animateTouchStart(button);
    setTimeout(() => {
        animateTouchEnd(button);
    }, glow);
}

function animateTouchStart(button: any) {
    button.className = "glow";
    button.playSound();
}

function animateTouchEnd(button: any) {
    button.className = "";
    button.stopSound();
}
