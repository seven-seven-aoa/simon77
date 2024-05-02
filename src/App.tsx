/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
import "./App.css";
import { useState, useEffect } from "react";
import { buttons, dom, levels, seq, sound, time } from "./components";
import { setCSSVariable } from "./components/Dom";

export default function App() {
    const fadeSpeed = 0.9;
    const [screen, setScreen] = useState("screen show transparent");
    const [title, setTitle] = useState("title show opaque");
    const [game, setGame] = useState("game hide transparent");

    //useEffect(sound.playStart, []);

    async function runGame() {
        await playStartMusic();

        setCSSVariable("fade_speed", `${fadeSpeed}s`);
        setScreen("screen hide transparent");
        setTitle("title fade transparent");
        await time.delay(fadeSpeed);
        setTitle("title hide transparent");
        return;

        levels.init();
        buttons.init(sound);

        setGame("game show transparent");
        await time.delay(fadeSpeed / 4);
        setGame("game fade opaque");

        while (true) {
            const level = levels.next();
            if (!level) break;
            const gameOver = await runLevel(level);
            if (gameOver) break;
            await time.delay(1000);
        }
    }

    async function playStartMusic() {
        const duration: number = 0.5;
        const oscillator: OscillatorType = "triangle";

        let gain: number = 0.16;
        const gainAdjust: number = 0.05;

        const notes = ["C3", "C4", "C5", "G5"];
        for (const note of notes) {
            const { ctx, osc, vol } = sound.playNote({
                gain,
                note,
                oscillator,
            });
            await time.delay(duration);
            osc.stop();
            osc.disconnect();
            vol.disconnect();
            ctx.close();
            gain -= gainAdjust;
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
            await time.delay(100);
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
            <div className={title}>Touch to start.</div>
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
                <input type="hidden" id="game_sequence" />
                <input type="hidden" id="user_sequence" />
            </div>
        </main>
    );
}
