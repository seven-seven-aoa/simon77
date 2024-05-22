// react //
import ReactDOM from "react-dom/client";
import { useEffect } from "react";

// lib //
import { dxSingle } from "./lib/DomX.tsx";
import { initInput, inputHandler } from "./lib/InputManager.tsx";

// app //
import { initButtons, renderButtons } from "./app/ButtonManager.tsx";
import { initGame, mainContainer } from "./app/GameManager.tsx";
import { initLevels } from "./app/LevelManager.tsx";

// styles //
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
            observers: [],
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

