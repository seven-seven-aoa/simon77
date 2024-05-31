// core //

// app //
// import { getGameStatus, isGameStatus } from "./GameStatus";
// import { GameStatus } from "./GameTypes";

export { playStartupMusic, playGameOverMusic };

function playStartupMusic() {
    // const notes: string[] = ["C3", "C4", "C5", "C6"];
    // const gains: number[] = [0.62, 0.42, 0.24, 0.12];

    // let time: number = 0;
    // const duration: number = 2.2;
    // const space: number = 0.11;
    // const ramp: RampType = RampType.exponential;
    // const wave: OscillatorType = "sine";

    // for (let i = 0; i < notes.length; i++) {
    //     playNote({
    //         wave,
    //         note: notes[i],
    //     });
    //     time += space;
    // }
}

async function playGameOverMusic() {

    return;
    // let delayValue: number = 0;
    // let notes: string[] = [];

    // if (isGameStatus(GameStatus.GameOverWinner)) {
    //     delayValue = 50;
    //     notes = ["C3", "E3", "G3", 
    //              "C4", "E4", "G4", 
    //              "C5", "E5", "G5", 
    //              "C6", "E6", "G6", "C7"];
    // }
    // else if (isGameStatus(GameStatus.GameOverLoser)) {
    //     delayValue = 75;
    //     notes = ["F#2", "F#2", "F#2", "F#1", "F#2", 
    //              "F#2", "F#2", "F#1", "F#1"];
    // }
    // else {
    //     throw new Error("Invalid game status: " + getGameStatus());
    // }

    // for (let j = 0; j < notes.length; j++) {
    //     // const osc = hitNote({
    //     //     wave: "sawtooth",
    //     //     note: notes[j],
    //     // });
    //     // await delay(delayValue);
    //     // // osc.stop();
    //     // await delay(delayValue);
    // }
}
