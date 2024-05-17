/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */

import { useState, useEffect } from "react";
import { ElementX, FadeDefaults } from "./lib/ElementX";
import { fade } from "./lib/animation/Fade";
import { delay } from "./lib/Timing";

import * as buttons from "./game/Buttons";
import * as img from "./images";
import * as input from "./lib/Input";
import * as layers from "./game/Layers";
import * as levels from "./game/Levels";
import * as music from "./game/Music";
import * as time from "./game/Timing";

import "./css";

console.info("XIMON77 - DEPLOYED ON [2024-05-12 16:04:42]");
FadeDefaults.in.durationMs = time.fade.default.in;
FadeDefaults.out.durationMs = time.fade.default.out;
levels.init();

export default function App() {
    const [enableRunButton, setEnableRunButton] = useState(false);
    const [levelNumber, setLevelNumber] = useState(0);

    useEffect(() => {
        input.disableCommomAnnnoyingEvents(
            [
                ...layers.buttons(),
                layers.control(),
                layers.debug(),
                layers.game(),
                layers.score(),
                layers.title(),
            ],
            true
        );
        buttons.init();
        const title: ElementX = layers.title();

        const timeout: number = setTimeout(async () => {
            title.style.display = "block";
            await fade(title);
            setEnableRunButton(true);
        }, time.delay.titleSplash);

        return () => clearTimeout(timeout);
    }, []);

    async function runGame() {
        if (!enableRunButton) {
            return;
        }

        setEnableRunButton(false);
        music.startup();

        const title = layers.title();
        await fade(title);
        title.style.display = "none";

        // layers.game().fade(fade.inConfig());
        // await time.Delay.titleDelay(0.25);

        // layers.control().fade(fade.inConfig());
        // await time.Delay.newLevelDelay(0.5);
        // layers.score().fade(fade.inConfig());

        let winner: boolean = false;
        while (true) {
            await delay(time.delay.newLevel);
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

        layers.buttons().forEach((button: ElementX) => {
            button.style.backgroundColor = winner ? "#FFFFFF" : "#222222";
        });
        await music.gameOver(winner);
        restartClick();
    }

    function restartClick() {
        // layers.game().fade(fade.outConfig());
        // layers.control().fade(fade.outConfig());
        // layers.score().fade(fade.outConfig());
        window.location.reload();
    }

    function toggleDebug() {
        // const layer = layers.debug();
        // const fadeToggle = fade.toggleConfig(layer);
        // fadeToggle.preDisplay = "block";
        // fadeToggle.postDisplay = undefined;
        // config.durationMs = time.WaitTime.titleDelay;
        // config.postDisplay = undefined;
        // area.fade(config);
    }

    const buttonElements = [];
    for (let i = 0; i < 4; i++) {
        buttonElements.push(
            <b
                key={i}
                id={`button_${i}`}
                onPointerDown={buttons.handleTouchStart}
                onPointerUp={buttons.handleTouchEnd}
            ></b>
        );
    }

    return (
        <main className="centered" onClick={runGame}>
            <section className="debug" onClick={toggleDebug}>
                DEPLOYED ON [2024-05-12 16:04:42]
            </section>

            <section className="title">Ximon '77</section>

            <section className="game">
                {buttonElements}
                <input type="hidden" id="gameSequence" />
                <input type="hidden" id="userSequence" />
            </section>

            <section className="control">
                <img src={img.pauseImage} id="pause" />
                <img src={img.playImage} id="play" />
                <img
                    src={img.restartImage}
                    id="restart"
                    onClick={restartClick}
                />
            </section>

            <section className="score">
                Score: <span className="scoreValue">{levelNumber}</span>
            </section>
        </main>
    );
}
