/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
import play from "./assets/play.png";
import pause from "./assets/pause.png";
import restart from "./assets/restart.png";
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
        // levels.init();
        // buttons.init();

        console.info("XIMON77 - DEPLOYED ON [2024-05-07 13:39:12]");

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
            <aside>DEPLOYED ON [2024-05-07 13:39:12]</aside>
            <h1>Ximon '77</h1>
        </main>
    );
}
