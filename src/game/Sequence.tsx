/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dom from "./Dom";

export {
    addSequenceStep,
    addUserStep,
    clearUserSequence,
    compareSequences,
    getSequenceStep,
};

export enum CompareResult {
    None = 0,
    Match = 1,
    Partial = 2,
    Mismatch = 3,
}

const sequence: any[] = [];

function addSequenceStep(count: number = 1) {
    for (let i = 0; i < count; i++) {
        sequence.push({ button: Math.floor(Math.random() * 4) });
    }
    dom.gameSequence().value = sequence
        .map((step) => step.button)
        .join(",");
}

function compareSequences() {
    const game = dom.gameSequence().value;
    const user = dom.userSequence().value;

    if (game === user) {
        return CompareResult.Match;
    }
    
    if (game.indexOf(user) === 0) {
        return CompareResult.Partial;
    }

    return CompareResult.Mismatch;
}

function getSequenceStep(index: number) {
    return sequence[index];
}

function clearUserSequence() {
    dom.userSequence().value = "";
}

function addUserStep(buttonId: number) {
    if (dom.userSequence().value.length > 0) {
        dom.userSequence().value += ",";
    }
    dom.userSequence().value += buttonId;
}
