/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react";

// core //
import { playNote } from "../core/SoundManager";
import { setCSSVariable } from "../core/StyleManager";
import { delay } from "../core/TimeManager";

// app //
import { addUserStep, compareSequences } from "./Sequencer";
import { Button, CompareResult, GameStatus } from "./GameTypes";
import { isGameStatus, setGameStatus } from "./GameStatus";
import { loopTime } from "./TimeConstants";

export { initButtons, renderButtons, sequenceTrigger, handleTouchEnd, handleTouchStart };
const _buttons: Button[] = [];

function initButtons() {
    setGameStatus(GameStatus.GameButtonInit);
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
                    rootName: ":root",
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
                key={button.key}
                className={getClassName(button)}
                style={button.style.cssProperties}
            ></div>,
        );
    }
    return jsx;
}

function handleTouchStart(event: any) {
    if (!isGameStatus(GameStatus.UserTurnReady)) return;
    // setGameStatus(GameStatus.Us);
    animateTouchStart(event.target);
}

async function handleTouchEnd(event: any) {
    // if (getGameStatus() !== GameStatus.WaitingForUserTurn) {
    //     return;
    // }
    await delay(loopTime.throttle.default);
    animateTouchEnd(event.target);

    addUserStep(event.target.key);
    switch (compareSequences()) {
        case CompareResult.Match:
            setGameStatus(GameStatus.GameOverWinner);
            break;
        case CompareResult.Partial:
            setGameStatus(GameStatus.UserTurnReady);
            break;
        case CompareResult.Mismatch:
            setGameStatus(GameStatus.GameOverLoser);
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
