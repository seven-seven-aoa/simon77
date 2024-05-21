// import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles.tsx";
import { initGame } from "./app/GameManager.tsx";
import { renderButtons } from "./app/ButtonManager.tsx";
import { restartImage } from "./images/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    //    <React.StrictMode>
    <App versionInfo="BUILD [2024-05-12 16:04:42]" />,
    //    </React.StrictMode>
);

function App(props: { versionInfo: string }) {
    console.info(props);
    initGame();

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
