import "./css";
import { FadeDefaults } from "./lib/animation/Fade";
import * as gameStatus from "./game/GameStatus";
import * as img from "./images";
import * as levels from "./game/Levels";
import * as time from "./game/GameTime";


export default function App() {

    console.info("XIMON77 - BUILD [2024-05-12 16:04:42]");
    FadeDefaults.in.durationMs = time.fade.default.in;
    FadeDefaults.out.durationMs = time.fade.default.out;
    levels.init();
    gameStatus.set(gameStatus.Value.Loading);

    return (
        <main className="centered">
            <section className="debug">
                BUILD [2024-05-12 16:04:42]
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
