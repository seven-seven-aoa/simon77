/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dom from "./Dom";

export {
    addSequenceStep,
    addUserStep,
    clearUserSequence,
    compareSequences,
    getSequenceStep,
};

export const CompareResult = {
    PARTIAL: 0,
    MATCH: 1,
    MISMATCH: 2,
};

const sequence: any[] = [];

function addSequenceStep(count: number = 1) {
    for (let i = 0; i < count; i++) {
        sequence.push({ button: Math.floor(Math.random() * 4) });
    }
    dom.Hidden.gameSequence().value = sequence
        .map((step) => step.button)
        .join(",");
}

function compareSequences() {
    const game = dom.Hidden.gameSequence().value;
    const user = dom.Hidden.userSequence().value;
    if (game === user) {
        return CompareResult.MATCH;
    }
    if (game.indexOf(user) === 0) {
        return CompareResult.PARTIAL;
    }
    return CompareResult.MISMATCH;
}

function getSequenceStep(index: number) {
    return sequence[index];
}

function clearUserSequence() {
    dom.Hidden.userSequence().value = "";
}

function addUserStep(buttonId: number) {
    if (dom.Hidden.userSequence().value.length > 0) {
        dom.Hidden.userSequence().value += ",";
    }
    dom.Hidden.userSequence().value += buttonId;
}