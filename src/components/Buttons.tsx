/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDomAll, setCSSVariable } from "./Dom";
import { CompareResult, addUserStep, compareSequences } from "./Sequence";
import { Events } from "./Events";
import * as sound from "./Sound";

export { init, enableInput, getState, trigger };

let _buttons: any[] = [];
const _state: any = {
    inputEnabled: false,
    compareResult: null,
};

function init() {
    _buttons = getDomAll("button");
    const backColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
    const borderColors = ["#800000", "#008000", "#000080", "#808000"];

    const glowColors = ["#FF8080", "#80FF80", "#8080FF", "#FFFF80"];
    glowColors.forEach((color: string, index: number) => {
        setCSSVariable(`glow_color_${index}`, color);
        setCSSVariable(`glow_color_${index}`, color);
        setCSSVariable(`glow_color_${index}`, color);
        setCSSVariable(`glow_color_${index}`, color);
    });

    const notes = ["C4", "Eb4", "G4", "Bb4"];

    _buttons.forEach((button: any, index: number) => {
        button.gameId = index;
        button.style.color = backColors[index];
        button.style.backgroundColor = backColors[index];
        button.style.borderColor = borderColors[index];

        button.sound = null;
        button.playSound = () => {
            button.sound = sound.playNote({
                wave: "triangle",
                note: notes[index],
                nostop: true,
                startGain: 0.4,
            });
        };

        button.stopSound = () => {
            button.sound.stop();
        };

        button.addEventListener(Events.TOUCH_START, handleTouchStart);
        button.addEventListener(Events.TOUCH_END, handleTouchEnd);
        button.addEventListener(Events.MOUSE_DOWN, handleTouchStart);
        button.addEventListener(Events.MOUSE_UP, handleTouchEnd);
    });
}

function handleTouchStart(event: Event) {
    //   if (!_state.inputEnabled) return;
    event.preventDefault();
    animateTouchStart(event.target);
}

function handleTouchEnd(event: any) {
    // if (!_state.inputEnabled) return;
    event.preventDefault();
    animateTouchEnd(event.target);
    addUserStep(event.target.gameId);
    _state.compareResult = compareSequences();
    _state.inputEnabled = _state.compareResult === CompareResult.PARTIAL;
}

function getState() {
    return _state;
}

function enableInput() {
    _state.inputEnabled = true;
}

function trigger(index: number, glow: number, sequenceStep: number) {
    const button = _buttons[index];
    button.innerHTML = sequenceStep;
    animateTouchStart(button);
    setTimeout(() => animateTouchEnd(button), glow);
}

function animateTouchStart(button: any) {
    button.className = "glow";
    button.playSound();
}

function animateTouchEnd(button: any) {
    button.stopSound();
    button.innerHTML = "&nbsp;";
    button.className = "";
}
