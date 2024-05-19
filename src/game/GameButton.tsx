/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, JSX } from "react";
import { delay } from "../lib/Timing";
import { MusicNote, playNote } from "../lib/Sound";
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

const _buttons: GameButton[] = [];

export interface GameButton {
    color: Color;
    jsx?: JSX.Element;
    index: number;
    sound: Sound;
}

export interface Sound {
    musicNote: MusicNote;
    oscillator?: OscillatorNode;
}

export interface Color {
    css: CSSProperties;
    glow: string;
}

function createButtonElements() {

    const buttonCount: number = 4;
    const musicNotes: string[] = ["C4", "Eb4", "G4", "Bb4"];
    const glowColors = ["#FFA0A0", "#A0FFA0", "#A0A0FF", "#FFFFA0"];
    const backColors: string[] = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
    const borderColors: string[] = ["#A00000", "#00A000", "#0000A0", "#A0A000"];

    for (let buttonIndex = 0; buttonIndex < buttonCount; buttonIndex++) {
        const button: GameButton = {
            index: buttonIndex,
            color: {
                css: {
                    color: backColors[buttonIndex],
                    backgroundColor: backColors[buttonIndex],
                    borderColor: borderColors[buttonIndex],
                },
                glow: cvar.set(
                    `glow_color_${buttonIndex}`,
                    glowColors[buttonIndex])
            },
            sound: {
                musicNote: {
                    nostop: true,
                    note: musicNotes[buttonIndex],
                    startGain: 0.4,
                    wave: "triangle",
                }
            }
        }
        button.jsx = <div id={`button_${buttonIndex}`}
            className="button"
            
            style={button.color.css}
            onPointerDown={handleTouchStart}
            onPointerUp={handleTouchEnd}
        ></div>
        _buttons.push(button);
    }
}

// function init() {

//     _buttons = layers.buttons();


//     button.sound = null;
//     button.playSound = () => {
//         button.sound = 
//     };

//     button.stopSound = () => {
//         button.sound.stop();
//     };
// });
// }

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
