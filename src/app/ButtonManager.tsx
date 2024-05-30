import { JSX } from "react";

// core //
import { playNote } from "../core/SoundManager";
import { setCSSVariable } from "../core/StyleManager";

// app //
import { addUserStep, compareSequences } from "./Sequencer";
import { Button, CompareResult, GameStatus } from "./GameTypes";
import { isGameStatus, setGameStatus } from "./GameStatus";
import { buttonArray, glowingArray } from "./GameElements";
import { InputInfo } from "../core/InputManager";
import { EventType } from "../core/EventTypes";
import { runNextLevel } from "./LevelManager";

export { initButtons, pushButton, releaseButton, renderButtons, sequenceTrigger };
const _buttons: Button[] = [];
const _spots: string[] = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
const _buttonSpots = new Map<string, Button>();
let _currentlyPushedButton: Button | null = null;

function initButtons() {
    setGameStatus(GameStatus.GameButtonInit);
    const buttonCount: number = 4;
    const musicNotes: string[] = ["C4", "Eb4", "G4", "Bb4"];
    const glowColors = ["#FFA0A0", "#A0FFA0", "#A0A0FF", "#FFFFA0"];
    const borderColors: string[] = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
    const backColors: string[] = ["#BB0000", "#00BB00", "#0000AA", "#CCCC00"];

    for (let index = 0; index < buttonCount; index++) {
        const button: Button = {
            index: index,
            input: {
                push: () => {
                    glowingArray()[index].fade({ targetOpacity: 1, durationMs: 100 });
                    button.sound.oscillator = playNote(button.sound.musicNote);
                },
                release: () => {
                    glowingArray()[index].fade({ targetOpacity: 0, durationMs: 100 });
                    button.sound.oscillator!.stop();
                },
            },
            spot: _spots[index],
            sound: {
                musicNote: {
                    nostop: true,
                    note: musicNotes[index],
                    startGain: 0.4,
                    wave: "triangle",
                },
                oscillator: null,
            },
            style: {
                cssProperties: {
                    color: backColors[index],
                    backgroundColor: backColors[index],
                    borderColor: borderColors[index],
                },
                cssVarGlowColor: setCSSVariable({
                    rootName: ":root",
                    varName: `glowColor_${index}`,
                    value: glowColors[index],
                }),
                isGlowing: false,
            },
        };

        _buttons.push(button);
        _buttonSpots.set(button.spot, button);
    }
}

function pushButton(inputInfo: InputInfo) {
    if (!isGameStatus(GameStatus.UserTurnNext)) return;
    if (!inputInfo.isType(EventType.pointerdown)) return;
    const button = buttonArray().find((b) => b.containsPoint(inputInfo.screenPosition));
    if (!button) return;

    setGameStatus(GameStatus.UserPushedButton);
    _currentlyPushedButton = _buttonSpots.get(button.key)!;
    _currentlyPushedButton.input.push();
}

function releaseButton(inputInfo: InputInfo) {
    if (!isGameStatus(GameStatus.UserPushedButton)) return;
    if (!inputInfo.isType(EventType.pointerup)) return;
    if (!_currentlyPushedButton) return;

    _currentlyPushedButton.input.release();
    addUserStep(_currentlyPushedButton.index);
    _currentlyPushedButton = null;

    const result = compareSequences();
    switch (result) {
        case CompareResult.Match:
            setGameStatus(GameStatus.UserTurnSuccess);
            break;
        case CompareResult.Partial:
            setGameStatus(GameStatus.UserTurnNext);
            return;
        case CompareResult.Mismatch:
            setGameStatus(GameStatus.UserTurnFailure);
            break;
        default:
            throw new Error("Invalid comparison result: " + result);
    }

    runNextLevel();
}

function renderButtons(): JSX.Element[] {
    let spotIndex = 0;
    const jsx: JSX.Element[] = [];
    for (const button of _buttons) {
        const spot: string = _spots[spotIndex++];
        const className: string = `button ${spot}`;
        jsx.push(<div key={spot} data-key={spot} className={className} style={button.style.cssProperties}></div>);
    }
    return jsx;
}

function sequenceTrigger(buttonIndex: number, glowSpeed: number) {
    const button = _buttons[buttonIndex];
    button.input.push();
    setTimeout(() => {
        button.input.release();
    }, glowSpeed);
}
