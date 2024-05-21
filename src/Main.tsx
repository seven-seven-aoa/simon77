import "./Styles.tsx";
import { initButtons, renderButtons } from "./app/ButtonManager.tsx";
import { initGame } from "./app/GameManager.tsx";
import { initLevels } from "./app/LevelManager.tsx";
import { restartImage } from "./images/index.tsx";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <App versionInfo="BUILD [2024-05-12 16:04:42]" />,
);

initGame();

function App(props: { versionInfo: string }) {
    console.info(props);
    
    initLevels();
    initButtons();

    return (
        <main className="centered">
            <section className="debugLayer">{props.versionInfo}</section>

            <section className="titleLayer">Ximon '77</section>

            <section className="gameLayer">{renderButtons()}</section>

            <section className="controlLayer">
                <img src={restartImage} id="restart" />
            </section>

            <section className="scoreLayer">
                Score: <span className="scoreValue"></span>
            </section>
        </main>
    );
}
