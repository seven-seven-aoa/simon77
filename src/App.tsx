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

    const [titleLayer, setTitleLayer] = useState("title");
    const [gameLayer, setGameLayer] = useState("game");
    const [controlLayer, setControlLayer] = useState("control");
    const [runButton, setRunButton] = useState(false);

    useEffect(() => {
        levels.init();
        buttons.init();

        const timeout = setTimeout(async () => {
            setTitleLayer("title fade_in");
            setRunButton(true);
        }, fadeSpeed);

        return () => clearTimeout(timeout);
    }, []);

    async function runGame() {
        if (!runButton) {
            return;
        }

        setRunButton(false);
        setTitleLayer("title fade_out");

        await time.delay(fadeSpeed * 0.75);
        playStartMusic();

        setGameLayer("game fade_in");
        await time.delay(fadeSpeed * 0.75);

        setControlLayer("control fade_in");
        await time.delay(newLevelPause * 0.5);

        let winner: boolean = false;
        while (true) {
            await time.delay(newLevelPause);
            const level = levels.next();
            console.info(level);
            if (!level) {
                winner = true;
                break;
            }
            const gameOver = await runLevel(level);
            if (gameOver) {
                winner = false;
                break;
            }
        }

        dom.getDomAll(".button").forEach((button: any) => {
            button.style.backgroundColor = winner ? "#FFFFFF" : "#222222";
        });
        await playGameOver(winner);
        restartClick();
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

    async function playGameOver(winner: boolean) {
        const notes: string[] = winner
            ? [
                  "C3",
                  "E3",
                  "G3",
                  "C4",
                  "E4",
                  "G4",
                  "C5",
                  "E5",
                  "G5",
                  "C6",
                  "E6",
                  "G6",
                  "C7",
              ]
            : ["F#2", "F#2", "F#2", "F#1", "F#2", "F#2", "F#2", "F#1", "F#1"];

        const delay = winner ? 50 : 75;
        for (let j = 0; j < notes.length; j++) {
            const osc = sound.playNote({
                wave: "sawtooth",
                note: notes[j],
                nostop: true,
                startGain: 0.4,
            });
            await time.delay(delay);
            osc.stop();
            await time.delay(delay);
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

            return true;
        }

        return false;
    }

    function restartClick() {
        setGameLayer("game fade_out");
        setControlLayer("control fade_out");
        window.location.reload();
    }

    return (
        <main onClick={runGame}>
            <div className={gameLayer}>
                <section>
                    <span className="button" id="button_0">
                        &nbsp;
                    </span>
                    <span className="button" id="button_1">
                        &nbsp;
                    </span>
                </section>
                <section>
                    <span className="button" id="button_2">
                        &nbsp;
                    </span>
                    <span className="button" id="button_3">
                        &nbsp;
                    </span>
                </section>

                <input type="hidden" id="game_sequence" />
                <input type="hidden" id="user_sequence" />
            </div>
            <div className={controlLayer}>
                <img src={pause} alt="Pause" id="pause" />
                <img src={play} alt="Play" id="play" />
                <img
                    src={restart}
                    alt="Restart"
                    id="restart"
                    onClick={restartClick}
                />
            </div>
            <div className={titleLayer}>
                <img src={splash} alt="Simon `77" />
            </div>
        </main>
    );
}
