/* eslint-disable @typescript-eslint/no-explicit-any */

import { delay } from "../lib/Timing";
import { playNote } from "../lib/Sound";
import * as cvar from "../lib/CSSVars";
import * as game from "./Game";
import * as layers from "./Layers";
import * as seq from "./Sequence";
import * as time from "./Timing";

export { 
    createButtonElements, 
    trigger, 
    waitForUserInput, 
};

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

function createButtonElements() {
    
    const musicNotes = ["C4", "Eb4", "G4", "Bb4"];
    
    const backColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
    const borderColors = ["#A00000", "#00A000", "#0000A0", "#A0A000"];
    const glowColors = ["#FFA0A0", "#A0FFA0", "#A0A0FF", "#FFFFA0"];

    glowColors.forEach((color: string, index: number) => {
        cvar.set(`glow_color_${index}`, color);
    });

    const buttonElements = [];
    for (let i = 0; i < 4; i++) {
        buttonElements.push(
            <b
                key={i}
                id={`button_${i}`}
                onPointerDown={handleTouchStart}
                onPointerUp={handleTouchEnd}
            ></b>
        );
    }
    return buttonElements;
}

function init() {

    _buttons = layers.buttons();

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

async function handleTouchEnd(event: any) {
    await delay(time.loop.throttle.default);
    animateTouchEnd(event.target);

    seq.addUserStep(event.target.key);
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
        await delay(time.loop.throttle.default);
    }

    if (_state.compareResult === seq.CompareResult.None) {
        throw new Error("No comparison result");
    }
    _state.gameOver = _state.compareResult === seq.CompareResult.Mismatch;
    if (_state.gameOver) {
        game.setState(game.State.GameLost);
    }
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
