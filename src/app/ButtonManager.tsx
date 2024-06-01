import { JSX } from "react";

// core //
import { setCSSVariable } from "../core/StyleManager";
import { MusicNoteAudio } from "../core/AudioMusic";

// app //
import { addUserStep, compareSequences } from "./Sequencer";
import { Button, CompareResult, GameStatus } from "./GameTypes";
import { isGameStatus, isGameStatusAny, setGameStatus } from "./GameStatus";
import { buttonArray, glowingArray } from "./GameElements";
import { InputInfo } from "../core/InputManager";
import { EventType } from "../core/EventTypes";
import { runNextLevel } from "./LevelManager";
import { time } from "./TimeConstants";

export { initButtons, pressButton, releaseButton, renderButtons, sequenceTrigger };
const _buttons: Button[] = [];
const _spots: string[] = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
const _buttonSpots = new Map<string, Button>();
let _currentButton: Button | null = null;

function initButtons() {
    setGameStatus(GameStatus.GameButtonInit);
    const buttonCount: number = 4;
    const musicNotes: string[] = ["C4", "Eb4", "G4", "Bb4"];
    const glowColors = ["#FFA0A0", "#A0FFA0", "#A0A0FF", "#FFFFA0"];
    const borderColors: string[] = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
    const backColors: string[] = ["#CC0000", "#00CC00", "#0000CC", "#CCCC00"];

    for (let index = 0; index < buttonCount; index++) {
        const button: Button = {
            index: index,
            input: {
                press: () => {
                    glowingArray()[index].fade({ targetValue: 1 });
                    const audio = new MusicNoteAudio(button.sound.musicNote);
                    button.sound.audio.push(audio);
                    audio.start({ gain: 0.09 });
                },
                release: async () => {
                    glowingArray()[index].fade({ targetValue: 0 });
                    const audio = button.sound.audio.shift();
                    await audio!.fade({
                        targetGain: 0,
                        durationMs: time.gameButtonReleaseFadeOut,
                    });
                },
            },
            spot: _spots[index],
            sound: {
                musicNote: {
                    note: musicNotes[index],
                    wave: "triangle",
                },
                audio: [],
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

function pressButton(inputInfo: InputInfo) {
    if (!isGameStatusAny(GameStatus.UserTurnNext, GameStatus.FreePlay)) return;
    if (!inputInfo.isType(EventType.pointerdown)) return;
    const button = buttonArray().find((b) => b.containsPoint(inputInfo.screenPosition));
    if (!button) return;

    _currentButton = _buttonSpots.get(button.key)!;
    _currentButton.input.press();

    setGameStatus(isGameStatus(GameStatus.FreePlay) ? GameStatus.FreePlayPressButton : GameStatus.UserPressButton);
}

function releaseButton(inputInfo: InputInfo) {
    if (!isGameStatusAny(GameStatus.UserPressButton, GameStatus.FreePlayPressButton)) return;
    if (!inputInfo.isType(EventType.pointerup)) return;
    if (!_currentButton) return;

    _currentButton.input.release();
    if (isGameStatus(GameStatus.FreePlayPressButton)) {
        _currentButton = null;
        setGameStatus(GameStatus.FreePlay);
        return;
    }

    addUserStep(_currentButton.index);
    _currentButton = null;

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
    button.input.press();
    setTimeout(() => {
        button.input.release();
    }, glowSpeed);
}
