import { CompareResult, SequenceStep } from "./GameTypes";
export { addSequenceStep, addUserStep, clearUserSequence, compareSequences, getSequenceStep };

const _sequence: SequenceStep[] = [];

function addSequenceStep(newNotesCount: number, initialSequenceLength: number) {
    if (_sequence.length === 0) {
        newNotesCount = initialSequenceLength;
    }
    for (let i = 0; i < newNotesCount; i++) {
        _sequence.push({ button: Math.floor(Math.random() * 4) });
    }
    gameSequence = _sequence.map((step) => step.button).join(",");
}

function compareSequences() : CompareResult {
    if (gameSequence === userSequence) {
        return CompareResult.Match;
    }
    if (gameSequence.indexOf(userSequence) === 0) {
        return CompareResult.Partial;
    }
    return CompareResult.Mismatch;
}

function getSequenceStep(index: number): SequenceStep {
    return _sequence[index];
}

function clearUserSequence() {
    userSequence = "";
}

function addUserStep(buttonIndex: number) {
    if (userSequence.length > 0) {
        userSequence += ",";
    }
    userSequence += buttonIndex;
}

let gameSequence: string = "";
let userSequence: string = "";
