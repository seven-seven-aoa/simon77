// core //
import { MusicPhrase, MusicSequence, generateMusicSequence, playMusicPhrase } from "../core/AudioMusic";

export { playStartupMusic, playLoserMusic, playWinnerMusic };

async function playStartupMusic() {
    const noteSeq:MusicSequence = {
        notes: ["C4", "G3", "C4", "C5", "C6"],
        wave: "sine"
    };
    const phrase:MusicPhrase = {
        props: {
            gain: 0.12,
            holdMs: 55,
            intervalMs: 150,
            decayMs: 100
        },
        evolution: {
            gain: 0.01,
            holdMs: -5,
            intervalMs: 0,
            decayMs: -10
        }
    };
    const seq = generateMusicSequence(noteSeq);
    await playMusicPhrase(phrase, seq);
}

async function playLoserMusic () {
    const noteSeq:MusicSequence = {
        notes: ["F#2", "F#2", "F#2", "F#1", "F#2", "F#2", "F#2", "F#1", "F#1"],
        wave: "sawtooth"
    };
    const phrase:MusicPhrase = {
        props: {
            gain: 0.11,
            holdMs: 35,
            intervalMs: 150,
            decayMs: 100
        },
        evolution: {
            gain: 0.01,
            holdMs: 0,
            intervalMs: 0,
            decayMs: 0
        }
    };
    const seq = generateMusicSequence(noteSeq);
    await playMusicPhrase(phrase, seq);
}

async function playWinnerMusic() {
    const noteSeq:MusicSequence = {
        notes: ["C3", "E3", "G3", "C4", "E4", "G4", "C5", "E5", "G5", "C6", "E6", "G6", "C7"],
        wave: "sawtooth"
    };
    const phrase:MusicPhrase = {
        props: {
            gain: 0.11,
            holdMs: 35,
            intervalMs: 52,
            decayMs: 44
        },
        evolution: {
            gain: 0.01,
            holdMs: 0,
            intervalMs: 0,
            decayMs: 0
        }
    };
    const seq = generateMusicSequence(noteSeq);
    await playMusicPhrase(phrase, seq);
}
