// react //
import ReactDOM from "react-dom/client";
import { useEffect } from "react";

// core //
import { dxSingle } from "./core/DomX";
import { initInput, inputHandler } from "./core/InputManager";

// app //
import { initButtons, renderButtons } from "./app/ButtonManager";
import { initGame, mainContainer, startGame } from "./app/GameManager";
import { initLevels } from "./app/LevelManager";

// styles //
import "./Styles";
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
        initInput({
            captor: mainContainer(),
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
