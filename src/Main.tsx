import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import "./Styles.tsx";
import { initButtons, renderButtons } from "./app/ButtonManager.tsx";
import { initGame } from "./app/GameManager.tsx";
import { initLevels } from "./app/LevelManager.tsx";
import { restartImage } from "./images/index.tsx";
import { initInputEvents, pointerEventHandler } from "./lib/InputManager.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

const _version: string = "Ximon '77 - v0.1.0";
console.info(_version);
initLevels();
initButtons();
const _buttons: JSX.Element[] = renderButtons();

function App() {
    useEffect(() => {
        initInputEvents();
        const game = initGame();
        return () => clearTimeout(game);
    }, []);

    return (
        <main className="centered" onPointerDown={pointerEventHandler} onPointerUp={pointerEventHandler}>
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

// // Get arbitrary element with id "my-element"
// var myElementToCheckIfClicksAreInsideOf = document.querySelector('#my-element');
// // Listen for click events on body
// document.body.addEventListener('click', function (event) {
//     if (myElementToCheckIfClicksAreInsideOf.contains(event.target)) {
//         console.log('clicked inside');
//     } else {
//         console.log('clicked outside');
//     }
// });
