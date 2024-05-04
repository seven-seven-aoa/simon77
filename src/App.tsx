/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
import splash from "./images/simon77.png";
import play from "./images/play.png";
import pause from "./images/pause.png";
import restart from "./images/restart.png";

import "./App.css";
import { useState, useEffect } from "react";
import { buttons, dom, levels, seq, sound, time } from "./components";
import { setCSSVariable } from "./components/Dom";
import { RampType } from "./components/Sound";

export default function App() {
    const newLevelPause: number = 1000;
    const fadeSpeed: number = 720;
    const inputLoop: number = 100;
    setCSSVariable("fade_speed", `${fadeSpeed}ms`);

    const [screen, setScreen] = useState("screen show transparent");
    const [title, setTitle] = useState("title show transparent");
    const [game, setGame] = useState("game hide transparent");

    useEffect(() => {
        levels.init();
        buttons.init();

        const timeout = setTimeout(() => {
            setTitle("title fade opaque");
        }, fadeSpeed);

        return () => clearTimeout(timeout);
    }, []);

    async function runGame() {
        setScreen("screen hide transparent");
        setTitle("title fade transparent");
        await time.delay(fadeSpeed * 0.25);
        setTitle("title hide transparent");
        playStartMusic();
        await time.delay(fadeSpeed * 0.75);
        
        
        setGame("game show opaque");
        await time.delay(fadeSpeed);
        
        while (true) {
            await time.delay(newLevelPause);
            const level = levels.next();
            if (!level) break;
            const gameOver = await runLevel(level);
            if (gameOver) break;
        }
    }

    function playStartMusic() {
        const notes: string[] = ["C3", "C4", "C5", "C6"];
        const gains: number[] = [0.62, 0.42, 0.24, 0.12];

        let time: number = 0;
        const duration: number = 2.2;
        const space: number = 0.11;
        const ramp: RampType = "exponential";
        const wave: OscillatorType = "sine";

        for (let i = 0; i < notes.length; i++) {
            sound.playNote({
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
    async function runLevel(level: any) {
        seq.addSequenceStep();

        let sequenceStep = -1;
        while (true) {
            const step = seq.getSequenceStep(++sequenceStep);
            if (!step) break;

            const { button } = step;
            buttons.trigger(button, level.glow, sequenceStep);
            await time.delay(level.speed);
        }

        seq.clearUserSequence();
        buttons.enableInput();

        let state = null;
        while (state === null || state.inputEnabled) {
            await time.delay(inputLoop);
            state = buttons.getState();
        }

        if (state.compareResult === seq.CompareResult.MISMATCH) {
            // sound.stop();
            // sound.playFail();
            dom.getDomSingle(".game").style.display = "none";
            return true;
        }

        return false;
    }

    return (
        <main>
            <div className={title}>
                <img src={splash} alt="Simon `77" />
            </div>
            <div className={screen} onClick={runGame}></div>
            <div className={game}>
                <section>
                    <button id="button_0">&nbsp;</button>
                    <button id="button_1">&nbsp;</button>
                </section>
                <section>
                    <button id="button_2">&nbsp;</button>
                    <button id="button_3">&nbsp;</button>
                </section>

                <img src={pause} alt="Pause" id="pause" />
                <img src={play} alt="Play" id="play" />
                <img src={restart} alt="Restart" id="restart" />

                <input type="hidden" id="game_sequence" />
                <input type="hidden" id="user_sequence" />
            </div>
        </main>
    );
}
