/* eslint-disable @typescript-eslint/no-explicit-any */
import { addUserStep, compareSequences } from "./Sequencer";
import { Button, CompareResult, GameStatus } from "./Types";
import { delay } from "../../lib/TimeManager";
import { getGameStatus, setGameStatus } from "./Status";
import { JSX } from "react";
import { loopTime } from "./TimeConstants";
import { playNote } from "../../lib/SoundManager";
import { setCSSVariable } from "../../lib/CSSVariableManager";

export { initButtons, renderButtons, sequenceTrigger };

const _buttons: Button[] = [];

function initButtons() {
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
                cssVarGlowColor: setCSSVariable({
                    rootName: "main > section.buttonLayer",
                    varName: `glowColor_${key}`,
                    value: glowColors[key],
                }),
                isGlowing: false,
            },
        };

        _buttons.push(button);
    }
}

function getClassName(button: Button): string {
    return button.style.isGlowing ? "button glowing" : "button";
}

function renderButtons(): JSX.Element[] {
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
    if (getGameStatus() !== GameStatus.WaitingForTouchStart) {
        return;
    }
    setGameStatus(GameStatus.WaitingForTouchEnd);
    animateTouchStart(event.target);
}

async function handleTouchEnd(event: any) {
    if (getGameStatus() !== GameStatus.WaitingForTouchEnd) {
        return;
    }
    await delay(loopTime.throttle.default);
    animateTouchEnd(event.target);

    addUserStep(event.target.key);
    switch (compareSequences()) {
        case CompareResult.Match:
            setGameStatus(GameStatus.FinalWon);
            break;
        case CompareResult.Partial:
            setGameStatus(GameStatus.WaitingForTouchStart);
            break;
        case CompareResult.Mismatch:
            setGameStatus(GameStatus.FinalLost);
            break;
        default:
            throw new Error("Invalid comparison result");
    }
}

function sequenceTrigger(buttonKey: number, glowSpeed: number) {
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
