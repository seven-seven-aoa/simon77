/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */

import { useState, useEffect } from "react";

import * as buttons from "./game/Buttons";
import * as dom     from "./game/Dom";
import * as levels  from "./game/Levels";
import * as music   from "./game/Music";
import * as time    from "./game/Timing";

import "./App.css";
import playImage    from "./assets/play.png";
import pauseImage   from "./assets/pause.png";
import restartImage from "./assets/restart.png";

console.info("XIMON77 - DEPLOYED ON [2024-05-08 13:11:47]");
levels.init();
export default function App() {
    
    dom.setFadeSpeed(time.WaitTime.fadeSpeed);
    const [enableRunButton, setEnableRunButton] = useState(false);
    const [levelNumber, setLevelNumber]         = useState(0);

    const [controlClass, setControlClass] = useState(dom.Class.control);
    const [gameClass, setGameClass]       = useState(dom.Class.game);
    const [overlayClass, setOverlayClass] = useState(dom.Class.overlay);
    const [scoreClass, setScoreClass]     = useState(dom.Class.score);
    const [titleClass, setTitleClass]     = useState(dom.Class.title);

    useEffect(() => {
        
        buttons.init();
        const timeout = setTimeout(async () => {
            setTitleClass(dom.FadeIn.title);
            setEnableRunButton(true);
        }, time.WaitTime.fadeSpeed);

        return () => clearTimeout(timeout);
    }, []);

    async function runGame() {
        if (!enableRunButton) {
            return;
        }
        setEnableRunButton(false);
        setTitleClass(dom.FadeOut.title);
        music.startup();
        await time.Delay.fadeSpeed(1);

        setGameClass(dom.FadeIn.game);
        await time.Delay.fadeSpeed(0.25);

        setControlClass(dom.FadeIn.control);
        await time.Delay.newLevelDelay(.50);

        setScoreClass(dom.FadeIn.score);
        await time.Delay.newLevelDelay(1);
        setOverlayClass(dom.Hide.overlay);

        let winner: boolean = false;
        while (true) {
            await time.Delay.newLevelDelay(1);
            const level = levels.next();
            if (!level) {
                winner = true;
                break;
            }
            setLevelNumber(level.number);
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
            <section className={titleClass}>
                <h1>Ximon '77</h1>
                <aside>DEPLOYED ON [2024-05-08 13:11:47]</aside>
            </section>

            <section className={gameClass}>
                <b id="button_0"></b>
                <b id="button_1"></b>
                <b id="button_2"></b>
                <b id="button_3"></b>
                
                <input type="hidden" id="game_sequence" />
                <input type="hidden" id="user_sequence" />
            </section>

            <section className={controlClass}>
                <img src={pauseImage}   id="pause" />
                <img src={playImage}    id="play" />
                <img src={restartImage} id="restart" onClick={restartClick} />
            </section>

            <section className={scoreClass}>Score: {levelNumber}</section>

            <section className={overlayClass} onClick={runGame}></section>
        </main>
    );
}
