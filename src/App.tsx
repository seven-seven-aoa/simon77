/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
import splash from "./images/simon77.png";
import play from "./images/play.png";
import pause from "./images/pause.png";
import restart from "./images/restart.png";

import "./App.css";
import { useState, useEffect } from "react";
import * as dom from "./game/GameDom";
import * as time from "./game/GameTiming";
import * as music from "./game/GameMusic";
import * as buttons from "./game/Buttons";
import * as levels from "./game/Levels";

export default function App() {
    dom.setFadeSpeed(time.WaitTime.fadeSpeed);

    const [titleClass, setTitleClass] = useState(dom.Class.title);
    const [gameClass, setGameClass] = useState(dom.Class.game);
    const [controlClass, setControlClass] = useState(dom.Class.control);
    const [runButton, setRunButton] = useState(false);

    useEffect(() => {
        levels.init();
        buttons.init();

        const timeout = setTimeout(async () => {
            setTitleClass(dom.FadeIn.title);
            setRunButton(true);
        }, time.WaitTime.fadeSpeed);

        return () => clearTimeout(timeout);
    }, []);

    async function runGame() {
        if (!runButton) {
            return;
        }
        setRunButton(false);
        setTitleClass(dom.FadeOut.title);
        music.startup();
        await time.Delay.fadeSpeed(1);

        setGameClass(dom.FadeIn.game);
        await time.Delay.fadeSpeed(0.25);

        setControlClass(dom.FadeIn.control);
        await time.Delay.newLevelDelay(1);
        dom.toggleOverlay(false);

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
        }

        dom.Layer.buttons().forEach((button: any) => {
            button.style.backgroundColor = winner ? "#FFFFFF" : "#222222";
        });
        await music.gameOver(winner);
        restartClick();
    }

    function restartClick() {
        setGameClass(dom.FadeOut.game);
        setControlClass(dom.FadeOut.control);
        window.location.reload();
    }

    return (
        <main>
            <div className={gameClass}>
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
            <div className={controlClass}>
                <img src={pause} alt="Pause" id="pause" />
                <img src={play} alt="Play" id="play" />
                <img
                    src={restart}
                    alt="Restart"
                    id="restart"
                    onClick={restartClick}
                />
            </div>
            <div className={titleClass}>
                <img src={splash} alt="Simon `77" />
            </div>
            <div className="overlay" onClick={runGame}></div>
        </main>
    );
}
