/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, JSX } from "react";

import { delay } from "../../lib/TimeManager";
import { MusicNote, playNote } from "../../lib/SoundManager";
import { addUserStep, compareSequences } from "./SequenceManager";

import * as cssVariable from "../../lib/CSSVariableManager";
import * as gameStatus from "./Status";
import * as gameTime from "./Time";

export { create, render, trigger };

export interface Button {
    key: number;
    sound: ButtonSound;
    style: ButtonStyle;
}

export interface ButtonSound {
    musicNote: MusicNote;
    oscillator: OscillatorNode | null;
}

export interface ButtonStyle {
    cssProperties: CSSProperties;
    cssVarGlowColor: string;
    isGlowing: boolean;
}

const _buttons: Button[] = [];
function create() {
    const buttonCount: number = 4;
    const musicNotes: string[] = ["C4", "Eb4", "G4", "Bb4"];
    const glowColors = ["#FFA0A0", "#A0FFA0", "#A0A0FF", "#FFFFA0"];
    const backColors: string[] = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
    const borderColors: string[] = ["#A00000", "#00A000", "#0000A0", "#A0A000"];

    for (let key = 0; key < buttonCount; key++) {
        const button: Button = {
            key: key,
            sound: {
                musicNote: {
                    nostop: true,
                    note: musicNotes[key],
                    startGain: 0.4,
                    wave: "triangle",
                },
                oscillator: null,
            },
            style: {
                cssProperties: {
                    color: backColors[key],
                    backgroundColor: backColors[key],
                    borderColor: borderColors[key],
                },
                cssVarGlowColor: cssVariable.set({
                    rootName: "main > section.buttons",
                    varName: `glowColor_${key}`,
                    value: glowColors[key],
                }),
                isGlowing: false,
            },
        };

        _buttons.push(button);
    }

    return _buttons;
}

function getClassName(button: Button): string {
    return button.style.isGlowing ? "button glowing" : "button";
}

function render(): JSX.Element[] {
    const jsx: JSX.Element[] = [];
    for (const button of _buttons) {
        jsx.push(
            <div
                id={`button_${button.key}`}
                className={getClassName(button)}
                style={button.style.cssProperties}
                onPointerDown={handleTouchStart}
                onPointerUp={handleTouchEnd}
            ></div>,
        );
    }
    return jsx;
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

function trigger(buttonKey: number, glowSpeed: number) {
    const button = _buttons[buttonKey];
    animateTouchStart(button);
    setTimeout(() => {
        animateTouchEnd(button);
    }, glowSpeed);
}

function animateTouchStart(button: Button) {
    if (button.sound.oscillator !== null) {
        throw new Error("Oscillator already exists");
    }
    button.style.isGlowing = true;
    button.sound.oscillator = playNote(button.sound.musicNote);
}

function animateTouchEnd(button: Button) {
    if (button.sound.oscillator === null) {
        throw new Error("Oscillator does not exist");
    }
    button.style.isGlowing = false;
    button.sound.oscillator.stop();
}
