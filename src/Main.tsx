// react //
import ReactDOM from "react-dom/client";
import { useEffect } from "react";

// core //
import { dxSingle } from "./core/DomX";
import { inputHandler } from "./core/InputManager";

// app //
import { initButtons, renderButtons } from "./app/ButtonManager";
import { initGame } from "./app/GameManager";
import { initLevels, gameScore } from "./app/LevelManager";

// styles/assets //
import "./fonts/GameMusicLove.css";
import "./Style.css";
import { restartButtonImage } from "./images";

// init app //
const _version: string = "Ximon '77 - v0.1.0";
console.info(_version);
initLevels();
initButtons();

// init react //
ReactDOM.createRoot(dxSingle("#root")).render(<App />);
const _buttons: JSX.Element[] = renderButtons(false);
const _glowing: JSX.Element[] = renderButtons(true);

/////////////////
function App() {
    useEffect(() => {
        const game = initGame();
        return () => clearTimeout(game);
    }, []);

    return (
        <main onPointerDown={inputHandler} onPointerUp={inputHandler}>
            <section className="titleLayer">Ximon '77</section>
            <section className="controlLayer">
                <img src={restartButtonImage} id="restartButton" />
            </section>
            <section className="scoreLayer">
                Score: <span className="scoreValue">{gameScore()}</span>
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
