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

export interface SequenceStep {
    button: number;
}

const sequence: SequenceStep[] = [];

function addSequenceStep(count: number = 1) {
    for (let i = 0; i < count; i++) {
        sequence.push({ button: Math.floor(Math.random() * 4) });
    }
    gameSequence = sequence
        .map((step) => step.button)
        .join(",");
}

function compareSequences() {
    if (gameSequence === userSequence) {
        return CompareResult.Match;
    }
    if (gameSequence.indexOf(userSequence) === 0) {
        return CompareResult.Partial;
    }
    return CompareResult.Mismatch;
}

function getSequenceStep(index: number) : SequenceStep {
    return sequence[index];
}

function clearUserSequence() {
    userSequence = "";
}

function addUserStep(buttonId: number) {
    if (userSequence.length > 0) {
        userSequence += ",";
    }
    userSequence += buttonId;
}

let gameSequence: string = "";
let userSequence: string = "";