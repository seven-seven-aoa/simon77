// react //
import ReactDOM from "react-dom/client";
import { useEffect } from "react";

// core //
import { dxSingle } from "./core/DomX";
import { inputHandler } from "./core/InputManager";

// app //
import { initButtons, renderButtons } from "./app/ButtonManager";
import { initGame } from "./app/GameManager";
import { initLevels } from "./app/LevelManager";

// styles/assets //
import "./fonts/GameMusicLove.css";
import "./Style.css";
import { restartImage } from "./images";

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
        const game = initGame();
        return () => clearTimeout(game);
    }, []);

    return (
        <main onPointerDown={inputHandler} onPointerUp={inputHandler}>
            <section className="titleLayer">
                Ximon '77
            </section>
            <section className="buttonLayer">{_buttons}</section>
            <section className="controlLayer">
                <img src={restartImage} id="restart" />
            </section>
            <section className="debugLayer">{_version}</section>
            <section className="scoreLayer">
                Score: <span className="scoreValue"></span>
            </section>
        </main>
    );
}
