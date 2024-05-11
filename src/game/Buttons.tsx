/* eslint-disable @typescript-eslint/no-explicit-any */

import { playNote } from "../lib/Sound";
import * as dom from "./Dom";
import * as seq from "./Sequence";
import * as time from "./Timing";

export { init, waitForUserInput, trigger, handleTouchStart, handleTouchEnd };

let _buttons: any[] = [];

const _state: GameState = {
    compareResult: seq.CompareResult.None,
    inputEnabled: false,
    turnCompleted: false,
    gameOver: false,
};
interface GameState {
    compareResult: seq.CompareResult;
    inputEnabled: boolean;
    turnCompleted: boolean;
    gameOver: boolean;
}

function init() {
    const backColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
    const borderColors = ["#A00000", "#00A000", "#0000A0", "#A0A000"];
    const glowColors = ["#FFA0A0", "#A0FFA0", "#A0A0FF", "#FFFFA0"];

    glowColors.forEach((color: string, index: number) => {
        dom.setVarGlowColor(index, color);
    });

    _buttons = dom.buttons();
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
    });
}

// let touchStartTimeMs: number;

function handleTouchStart(event: any) {
    if (!_state.inputEnabled) {
        return;
    }
    _state.inputEnabled = false;
    animateTouchStart(event.target);
    // touchStartTimeMs = Date.now();
}

function handleTouchEnd(event: any) {

    // await time.Delay.inputLoopThrottle();
    animateTouchEnd(event.target);

    seq.addUserStep(event.target.gameId);
    _state.compareResult = seq.compareSequences();

    if (_state.compareResult === seq.CompareResult.Partial) {
        _state.inputEnabled = true;
        return;
    }
    _state.turnCompleted = true;
    return false;
}

async function waitForUserInput() {
    _state.turnCompleted = false;
    _state.compareResult = seq.CompareResult.None;
    _state.gameOver = false;
    _state.inputEnabled = true;

    while (!_state.turnCompleted) {
        await time.Delay.inputLoopThrottle();
    }

    if (_state.compareResult === seq.CompareResult.None) {
        throw new Error("No comparison result");
    }
    _state.gameOver = _state.compareResult === seq.CompareResult.Mismatch;
    return _state.gameOver;
}

function trigger(index: number, glow: number) {
    const button = _buttons[index];
    animateTouchStart(button);
    button.timeout = setTimeout(() => {
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
