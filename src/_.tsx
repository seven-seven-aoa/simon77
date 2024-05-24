// import { useState, useEffect } from "react";
// import { ElementX, FadeDefaults } from "./lib/ElementX";
// import { fade } from "./lib/animation/Fade";
// import { delay } from "./lib/Timing";
// import "./css";

// import * as buttons from "./game/GameButton";
// import * as game from "./game/Game";
// import * as img from "./images";
// import * as layers from "./game/Layers";
// import * as levels from "./game/Levels";
// import * as music from "./game/Music";
// import * as time from "./game/Timing";

// console.info("XIMON77 - DEPLOYED ON [2024-05-12 16:04:42]");
// FadeDefaults.in.durationMs = time.fade.default.in;
// FadeDefaults.out.durationMs = time.fade.default.out;
// levels.init();
// game.setState(game.State.Loading);

// export default function App() {
//     const [levelNumber, setLevelNumber] = useState(0);

//     useEffect(() => {
//         const timeout = game.startup();
//         return () => clearTimeout(timeout);
//     }, []);

//     async function runGame() {
//         if (game.getState() !== game.State.Ready) {
//             return;
//         }

//         game.setState(game.State.Running);
//         music.startup();

//         const title = layers.title();
//         await fade(title);
//         title.style.display = "none";

//         // layers.game().fade(fade.inConfig());
//         // await time.Delay.titleDelay(0.25);

//         // layers.control().fade(fade.inConfig());
//         // await time.Delay.newLevelDelay(0.5);
//         // layers.score().fade(fade.inConfig());

//         while (game.getState() === game.State.Running) {
//             await delay(time.delay.newLevel);
//             const level = levels.next();
//             if (!level) {
//                 game.setState(game.State.GameWon);
//                 break;
//             }
//             await levels.run(level);
//             if (game.getState() === game.State.GameLost) {
//                 break;
//             }
//             setLevelNumber(level.number);
//         }

//         layers.buttons().forEach((button: ElementX) => {
//             if (game.getState() === game.State.GameLost) {
//                 button.style.borderColor = "#FF0000";
//             }
//             else {
//                 button.style.borderColor = "#00FF00";
//             }
//         });
//         await music.gameOver();
//         restartClick();
//     }

//     function restartClick() {
//         // layers.game().fade(fade.outConfig());
//         // layers.control().fade(fade.outConfig());
//         // layers.score().fade(fade.outConfig());
//         window.location.reload();
//     }

//     function toggleDebug() {
//         // const layer = layers.debug();
//         // const fadeToggle = fade.toggleConfig(layer);
//         // fadeToggle.preDisplay = "block";
//         // fadeToggle.postDisplay = undefined;
//         // config.durationMs = time.WaitTime.titleDelay;
//         // config.postDisplay = undefined;
//         // area.fade(config);
//     }

//     const buttonElements = [];
//     for (let i = 0; i < 4; i++) {
//         buttonElements.push(
//             <b
//                 key={i}
//                 id={`button_${i}`}
//                 onPointerDown={buttons.handleTouchStart}
//                 onPointerUp={buttons.handleTouchEnd}
//             ></b>
//         );
//     }