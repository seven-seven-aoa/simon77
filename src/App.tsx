/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */

import { useState, useEffect } from "react";
import * as img from "./images";
import * as buttons from "./game/Buttons";
import * as dom from "./game/Dom";
import * as levels from "./game/Levels";
import * as music from "./game/Music";
import * as time from "./game/Timing";
import "./css";

console.info("XIMON77 - DEPLOYED ON [2024-05-11 20:27:03]");
levels.init();

const hiddenInputs: string = "hidden";
// const hiddenInputs: string = "text";

export default function App() {
    const [enableRunButton, setEnableRunButton] = useState(false);
    const [levelNumber, setLevelNumber] = useState(0);

    useEffect(() => {
        dom.init(time.WaitTime.fadeSpeed);
        buttons.init();

        const timeout = setTimeout(async () => {
            dom.titleArea().fadeIn();
            setEnableRunButton(true);
        }, time.WaitTime.fadeSpeed);

        return () => clearTimeout(timeout);
    }, []);

    async function runGame() {
        if (!enableRunButton) {
            return;
        }
        music.startup();
        setEnableRunButton(false);
        dom.titleArea().fadeOut();
        await time.Delay.fadeSpeed(1);
        dom.titleArea().hide();

        dom.gameArea().fadeIn();
        await time.Delay.fadeSpeed(0.25);

        dom.controlArea().fadeIn();
        await time.Delay.newLevelDelay(0.5);
        dom.scoreArea().fadeIn();

        let winner: boolean = false;
        while (true) {
            await time.Delay.newLevelDelay(1);
            const level = levels.next();
            if (!level) {
                winner = true;
                break;
            }
            const gameOver: boolean = await levels.run(level);
            if (gameOver) {
                winner = false;
                break;
            }
            setLevelNumber(level.number);
        }

        dom.buttons().forEach((button: any) => {
            button.style.backgroundColor = winner ? "#FFFFFF" : "#222222";
        });
        await music.gameOver(winner);
        restartClick();
    }

    function restartClick() {
        dom.gameArea().fadeOut();
        dom.controlArea().fadeOut();
        dom.scoreArea().fadeOut();
        window.location.reload();
    }

    const buttonElements = [];
    for (let i = 0; i < 4; i++) {
        buttonElements.push(
            <b
                key={i}
                id={`button_${i}`}
                onPointerDown={buttons.handleTouchStart}
                onPointerUp={buttons.handleTouchEnd}
                // onMouseDown={buttons.handleTouchStart}
                // onMouseUp={buttons.handleTouchEnd}
            ></b>
        );
    }

    return (
        <main>
            <section className="titleArea" onClick={runGame}>
                <h1>Ximon '77</h1>
                <aside>DEPLOYED ON [2024-05-11 20:27:03]</aside>
            </section>

            <section className="gameArea">
                {buttonElements}
                <input type={hiddenInputs} id="gameSequence" />
                <input type={hiddenInputs} id="userSequence" />
            </section>

            <section className="controlArea">
                <img src={img.pauseImage} id="pause" />
                <img src={img.playImage} id="play" />
                <img src={img.restartImage} id="restart" onClick={restartClick} />
            </section>

            <section className="scoreArea">
                Score: <span className="scoreValue">{levelNumber}</span>
            </section>
        </main>
    );
}
