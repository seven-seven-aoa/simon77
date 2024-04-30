import { Howl } from "howler";
import { delay } from "./Timing";
import soundUrlOgg from "./Sound.ogg";
import soundUrlMp3 from "./Sound.mp3";
import zplay1 from "./zapsplat_multimedia_game_retro_musical_positive.wav";
import zplay2 from "./zapsplat_multimedia_game_retro_musical_negative_003.wav";

export { create, playButton, playFail, playStart, stop };

let _sound: Howl;
const _duration = {
    start: 1600,
    button: 9000,
    fail: 9000,
};

function create() {
    _sound = new Howl({
        src: [soundUrlOgg, soundUrlMp3],
        sprite: {
            start: [0, _duration.start],
            button0: [2000, _duration.button],
            button1: [12000, _duration.button],
            button2: [22000, _duration.button],
            button3: [32000, _duration.button],
            fail: [42000, _duration.fail],
        },
    });
}

function playStart() {
    new Howl({ src: [zplay1] }).play();
}

function playFail() {
    new Howl({ src: [zplay2] }).play();
}

function playButton(id: number) {
    _sound.play(`button${id}`);
}

function stop() {
    _sound.stop();
}
