// core //

import { MusicNoteAudio } from "../core/SoundManager";
import { delay } from "../core/TimeManager";

// app //
// import { getGameStatus, isGameStatus } from "./GameStatus";
// import { GameStatus } from "./GameTypes";

export { playStartupMusic, playLoserMusic, playWinnerMusic };

async function playStartupMusic() {
    const notes: string[] = ["C3", "C4", "C5", "C6"];
    let gain: number = 0.12
    const gainIncrement: number = 0.01;
    const hold: number = 35;
    const interval: number = 150;
    const decay: number = 100;

    const wave: OscillatorType = "sine";

    const seq: MusicNoteAudio[] = [];
    while (notes.length > 0) {
        seq.push(new MusicNoteAudio({ note: notes.shift()!, wave }));
    }
    while (seq.length > 0) {
        const note = seq.shift()!;
        note.start({ gain: gain });
        setTimeout(() => note.fade({ targetGain: 0, durationMs: decay }), hold);
        await delay(interval);
        gain += gainIncrement;
    }
}

async function playLoserMusic () {
    const notes = ["F#2", "F#2", "F#2", "F#1", "F#2", "F#2", "F#2", "F#1", "F#1"];
    let gain: number = 0.13;
    const gainIncrement: number = 0.01;
    const hold: number = 35;
    const interval: number = 150;
    const decay: number = 100;

    const wave: OscillatorType = "sawtooth";

    const seq: MusicNoteAudio[] = [];
    while (notes.length > 0) {
        seq.push(new MusicNoteAudio({ note: notes.shift()!, wave }));
    }
    while (seq.length > 0) {
        const note = seq.shift()!;
        note.start({ gain: gain });
        setTimeout(() => note.fade({ targetGain: 0, durationMs: decay }), hold);
        await delay(interval);
        gain += gainIncrement;
    }
}

async function playWinnerMusic() {
    const notes = ["C3", "E3", "G3", "C4", "E4", "G4", "C5", "E5", "G5", "C6", "E6", "G6", "C7"];
    let gain: number = 0.16;
    const gainIncrement: number = 0.01;
    const hold: number = 35;
    let interval: number = 52;
    const speedUp: number = 0;
    const decay: number = 44;

    const wave: OscillatorType = "sawtooth";

    const seq: MusicNoteAudio[] = [];
    while (notes.length > 0) {
        seq.push(new MusicNoteAudio({ note: notes.shift()!, wave }));
    }
    while (seq.length > 0) {
        const note = seq.shift()!;
        note.start({ gain: gain });
        setTimeout(() => note.fade({ targetGain: 0, durationMs: decay }), hold);
        await delay(interval);
        gain += gainIncrement;
        interval += speedUp;
    }
}
