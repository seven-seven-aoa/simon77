import { Howl } from "howler";
import { delay } from "./Timing";
import soundUrlOgg from "./Sound.tsx.ogg";
import soundUrlMp3 from "./Sound.tsx.mp3";

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

async function playStart() {
    _sound.play("start");
    await delay(_duration.start);
}

async function playFail() {
    _sound.play("fail");
    await delay(_duration.fail);
}

function playButton(id: number) {
    _sound.play(`button${id}`);
}

function stop() {
    _sound.stop();
}
