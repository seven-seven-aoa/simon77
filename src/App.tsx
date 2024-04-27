/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
import "./App.css";
import * as buttons from "./Buttons";
import * as dom from "./Dom";
import * as levels from "./Levels";
import * as seq from "./Sequence";
import * as sound from "./Sound";
import { delay } from "./Timing";

export default function App() {
    levels.create();

    document.body.addEventListener("click", runGame);
    async function runGame() {

        document.body.removeEventListener("click", runGame);
        dom.getDomSingle(".title").style.display = "none";
        dom.getDomSingle(".loader").style.display = "grid";

        sound.create();
        await sound.playStart();

        buttons.create(sound);
        dom.getDomSingle(".loader").style.display = "none";
        dom.getDomSingle(".game").style.display = "block";

        await delay(1000);

        while (true) {
            const level = levels.getNext();
            if (!level) break;
            const gameOver = await runLevel(level);
            if (gameOver) break;
            await delay(1000);
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
            await delay(level.speed);
        }

        seq.clearUserSequence();
        buttons.enableInput();

        let state = null;
        while (state === null || state.inputEnabled) {
            await delay(100);
            state = buttons.getState();
        }

        if (state.compareResult === seq.CompareResult.MISMATCH) {
            sound.stop();
            await sound.playFail();
            dom.getDomSingle(".game").style.display = "none";
            return true;
        }

        return false;
    }

    return (
        <main>
            <div className="title">Touch to start.</div>
            <div className="loader"></div>
            <div className="game">
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
