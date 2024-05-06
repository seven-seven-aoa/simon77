/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
import splash from "./images/simon77.png";
import play from "./images/play.png";
import pause from "./images/pause.png";
import restart from "./images/restart.png";

import "./App.css";
import { useState, useEffect } from "react";
import { buttons, dom, levels, music, seq, time } from "./components";

export default function App() {
    const newLevelPause: number = 1000;
    const fadeSpeed: number = 720;
    const inputLoop: number = 100;
    dom.setCSSVariable("fade_speed", `${fadeSpeed}ms`);

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
        music.startup();

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
            const gameOver = await levels.run(level, buttons, inputLoop, seq, time);
            if (gameOver) {
                winner = false;
                break;
            }
        }

        dom.getDomAll(".button").forEach((button: any) => {
            button.style.backgroundColor = winner ? "#FFFFFF" : "#222222";
        });
        await music.gameOver(winner);
        restartClick();
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
