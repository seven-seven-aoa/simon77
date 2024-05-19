/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, JSX } from "react";
import { delay } from "../lib/Timing";
import { MusicNote, playNote } from "../lib/Sound";
import { addUserStep, compareSequences, CompareResult } from "./Sequence";
import * as cssVariable from "../lib/CSSVariable";
import * as gameStatus from "./GameStatus";
import * as gameTime from "./GameTime";

export { create, trigger };

export interface Button {
    color: Color;
    jsx?: JSX.Element;
    key: number;
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

const _buttons: Button[] = [];
function create() {

    const buttonCount: number = 4;
    const musicNotes: string[] = ["C4", "Eb4", "G4", "Bb4"];
    const glowColors = ["#FFA0A0", "#A0FFA0", "#A0A0FF", "#FFFFA0"];
    const backColors: string[] = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
    const borderColors: string[] = ["#A00000", "#00A000", "#0000A0", "#A0A000"];

    for (let buttonIndex = 0; buttonIndex < buttonCount; buttonIndex++) {
        const button: Button = {
            key: buttonIndex,
            color: {
                css: {
                    color: backColors[buttonIndex],
                    backgroundColor: backColors[buttonIndex],
                    borderColor: borderColors[buttonIndex],
                },
                glow: cssVariable.set(
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
        button.jsx =
            <div
                id={`button_${buttonIndex}`}
                key={buttonIndex}
                className="button"
                style={button.color.css}
                onPointerDown={handleTouchStart}
                onPointerUp={handleTouchEnd}
            ></div>,

        _buttons.push(button);
    }

    return _buttons;
}

function handleTouchStart(event: any) {
    if (gameStatus.get() !== gameStatus.Value.WaitingForTouchStart) {
        return;
    }
    gameStatus.set(gameStatus.Value.WaitingForTouchEnd);
    animateTouchStart(event.target);
}


async function handleTouchEnd(event: any) {
    if (gameStatus.get() !== gameStatus.Value.WaitingForTouchEnd) {
        return;
    }
    await delay(gameTime.loop.throttle.default);
    animateTouchEnd(event.target);

    addUserStep(event.target.key);
    switch (compareSequences()) {
        case CompareResult.Match:
            gameStatus.set(gameStatus.Value.GameWon);
            break;
        case CompareResult.Partial:
            gameStatus.set(gameStatus.Value.WaitingForTouchStart);
            break;
        case CompareResult.Mismatch:
            gameStatus.set(gameStatus.Value.GameLost);
            break;
        default:
            throw new Error("Invalid comparison result");
    }   
}

function trigger(index: number, glow: number) {
    const button = _buttons[index];
    animateTouchStart(button);
    setTimeout(() => {
        animateTouchEnd(button);
    }, glow);
}

function animateTouchStart(button: Button) {
    button.className = "glow";
    button.playSound();
}

function animateTouchEnd(button: Button) {
    button.className = "";
    button.stopSound();
}
