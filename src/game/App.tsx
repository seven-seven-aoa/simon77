import { FadeConfigDefaults } from "../lib/animation/Fade";

import "./Style.tsx";
import * as img from "./stylesheets/Images";




import * as statua  from "./components/Status.tsx";
import * as levelSet from "./components/LevelManager.tsx";
import * as time from "./components/Time";


export default function App(props: { versionInfo: string }) {

    console.info(props);
    FadeConfigDefaults.in.durationMs = time.fade.default.in;
    FadeConfigDefaults.out.durationMs = time.fade.default.out;
    levels.init();
    gameStatus.set(gameStatus.Value.Loading);

    return (
        <main className="centered">
            <section className="debug">
                {props.versionInfo}
            </section>

            <section className="title">Ximon '77</section>

            <section className="game">
                {/* {buttonElements} */}
            </section>

            <section className="control">
                <img src={img.pauseImage} id="pause" />
                <img src={img.playImage} id="play" />
                <img src={img.restartImage} id="restart" />
            </section>

            <section className="score">
                Score: <span className="scoreValue"></span>
            </section>
        </main>
    );
}
