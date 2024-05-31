// react //
import ReactDOM from "react-dom/client";
import { useEffect } from "react";

// core //
import { dxSingle } from "./core/DomX";
import { inputHandler } from "./core/InputManager";

// app //
import { initButtons, renderButtons } from "./app/ButtonManager";
import { initGame } from "./app/GameManager";

// styles/assets //
import "./fonts/GameMusicLove.css";
import "./Style.css";
import { restartButtonImage } from "./images";

// init app //
const _version: string = "Ximon '77 - v0.1.0";
console.info(_version);
initButtons();

// init react //
ReactDOM.createRoot(dxSingle("#root")).render(<App />);
const _buttons: JSX.Element[] = renderButtons();
const _glowing: JSX.Element[] = renderButtons();

/////////////////
function App() {

    useEffect(() => {
        const game = initGame();
        return () => clearTimeout(game);
    });
    const gameScorePlaceholder: number = 0;

    return (
        <main onPointerDown={inputHandler} onPointerUp={inputHandler}>
            <section className="titleLayer">Ximon '77</section>
            <section className="settingsBarLayer">
                <img src={restartButtonImage} id="restartButton" />
            </section>
            <section className="scoreLayer">
                Score: <span className="scoreValue">{gameScorePlaceholder}</span>
            </section>
            <section className="buttonLayer">
                <div className="buttonContainer">
                    {_buttons}
                </div>
            </section>
            <section className="glowingLayer">
                <div className="buttonContainer">
                    {_glowing}
                </div>
            </section>
        </main>
    );
}
