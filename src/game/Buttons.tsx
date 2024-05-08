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
    inputEnabled: false,
};

function init() {
    _buttons = dom.Layer.buttons();
    const backColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
    const borderColors = ["#A00000", "#00A000", "#0000A0", "#A0A000"];

    const glowColors = ["#FFA0A0", "#A0FFA0", "#A0A0FF", "#FFFFA0"];
    glowColors.forEach((color: string, index: number) => {
        dom.setGlowColor(index, color);
    });

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

function handleTouchStart(event: Event) {
    event.preventDefault();
    if (!_state.inputEnabled) {
        return;
    }
    animateTouchStart(event.target);
}

function handleTouchEnd(event: any) {
    event.preventDefault();
    _state.inputEnabled = false;

    animateTouchEnd(event.target);
    seq.addUserStep(event.target.gameId);

    _state.compareResult  = seq.compareSequences();
    _state.inputEnabled   = _state.compareResult === seq.CompareResult.PARTIAL;
    _state.inputCompleted = !_state.inputEnabled;
}

async function waitForUserInput() {
    _state.inputEnabled = true;
    _state.inputCompleted = false;

    while (!_state.inputCompleted) {
        await time.Delay.inputLoopThrottle();
    }

    const isGameOver: boolean = _state.compareResult === seq.CompareResult.MISMATCH;
    return isGameOver;
}

function trigger(index: number, glow: number) {
    const button = _buttons[index];
    animateTouchStart(button);
    setTimeout(() => { animateTouchEnd(button); }, glow);
}

function animateTouchStart(button: any) {
    button.className = "glow";
    button.playSound();
}

function animateTouchEnd(button: any) {
    button.className = "";
    button.stopSound();
}
