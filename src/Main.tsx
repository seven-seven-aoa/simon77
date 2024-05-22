// react //
import ReactDOM from "react-dom/client";
import { useEffect } from "react";

// lib //
import { dxSingle } from "./lib/core/DomX.tsx";
import { initInput, inputHandler } from "./lib/core/InputManager.tsx";

// app //
import { initButtons, renderButtons } from "./lib/ButtonManager.tsx";
import { initGame, mainContainer, startGame } from "./lib/GameManager.tsx";
import { initLevels } from "./lib/LevelManager.tsx";

// styles //s
import "./Styles.tsx";
import { restartImage } from "./images/index.tsx";

// init app //
const _version: string = "Ximon '77 - v0.1.0";
console.info(_version);
initLevels();
initButtons();

// init react //
ReactDOM.createRoot(dxSingle("#root")).render(<App />);
const _buttons: JSX.Element[] = renderButtons();

/////////////////
function App() {
    useEffect(() => {
        initInput({
            container: mainContainer(),
            observers: [startGame],
        });
        const game = initGame();
        return () => clearTimeout(game);
    }, []);

    return (
        <main className="centered" onPointerDown={inputHandler} onPointerUp={inputHandler}>
            <section className="buttonLayer">{_buttons}</section>
            <section className="controlLayer">
                <img src={restartImage} id="restart" />
            </section>
            <section className="debugLayer">{_version}</section>
            <section className="scoreLayer">
                Score: <span className="scoreValue"></span>
            </section>
            <section className="titleLayer">Ximon '77</section>
        </main>
    );
}
