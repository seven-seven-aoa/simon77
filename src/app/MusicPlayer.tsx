import { delay } from "../lib/TimeManager";
import { GameStatus } from "./Types";
import { getGameStatus } from "./Status";
import { playNote } from "../lib/SoundManager";
import { RampType } from "../lib/SoundTypes";

export function playStartupMusic() {
    const notes: string[] = ["C3", "C4", "C5", "C6"];
    const gains: number[] = [0.62, 0.42, 0.24, 0.12];

    let time: number = 0;
    const duration: number = 2.2;
    const space: number = 0.11;
    const ramp: RampType = RampType.exponential;
    const wave: OscillatorType = "sine";

    for (let i = 0; i < notes.length; i++) {
        playNote({
            wave,
            note: notes[i],
            gain: [
                { value: gains[i], time: time, ramp },
                { value: 0, time: time + duration, ramp },
            ],
        });
        time += space;
    }
}

export async function playGameOverMusic() {

    let delayValue: number = 0;
    let notes: string[] = [];

    if (getGameStatus() === GameStatus.FinalWon) {
        delayValue = 50;
        notes = ["C3", "E3", "G3", 
                 "C4", "E4", "G4", 
                 "C5", "E5", "G5", 
                 "C6", "E6", "G6", "C7"];
    }
    else {
        delayValue = 75;
        ["F#2", "F#2", "F#2", "F#1", "F#2", 
         "F#2", "F#2", "F#1", "F#1"];
    }

    for (let j = 0; j < notes.length; j++) {
        const osc = playNote({
            wave: "sawtooth",
            note: notes[j],
            nostop: true,
            startGain: 0.4,
        });
        await delay(delayValue);
        osc.stop();
        await delay(delayValue);
    }
}