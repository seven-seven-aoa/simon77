import "./Style.tsx";
import { initGame } from "./components/GameManager.tsx";
import { renderButtons } from "./components/ButtonManager.tsx";
import { restartImage } from "./stylesheets/Images/index.tsx";


export default function App(props: { versionInfo: string }) {

    console.info(props);
    initGame();

    return (
        <main className="centered">
            <section className="debug">
                {props.versionInfo}
            </section>

            <section className="title">Ximon '77</section>

            <section className="game">
                {renderButtons()}
            </section>

            <section className="control">
                <img src={restartImage} id="restart" />
            </section>

            <section className="score">
                Score: <span className="scoreValue"></span>
            </section>
        </main>
    );
}
