/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDomSingle } from "./Dom";

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

function addSequenceStep() {
    console.log(sequence.length);
    sequence.push({ button: Math.floor(Math.random() * 4) });
    getDomSingle("#game_sequence").value = sequence
        .map((step) => step.button)
        .join(",");
}

function compareSequences() {
    const game = getGameSequence().value;
    const user = getUserSequence().value;
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
    getDomSingle("#user_sequence").value = "";
}

function addUserStep(buttonId: number) {
    if (getDomSingle("#user_sequence").value.length > 0) {
        getDomSingle("#user_sequence").value += ",";
    }
    getDomSingle("#user_sequence").value += buttonId;
}

function getGameSequence() {
    return getDomSingle("#game_sequence");
}

function getUserSequence() {
    return getDomSingle("#user_sequence");
}
