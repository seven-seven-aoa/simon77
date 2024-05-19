import { ElementX } from "../lib/ElementX";
import { fade } from "../lib/animation/Fade";

import * as buttons from "./GameButton";
import * as game from "./Game";
import * as input from "../lib/Input";
import * as layers from "./Layers";
import * as time from "./GameTime";
export function startup() : number {
    input.disableCommomAnnnoyingEvents(
        [
            ...layers.buttons(),
            layers.control(),
            layers.debug(),
            layers.game(),
            layers.score(),
            layers.title(),
        ],
        true
    );
    buttons.init();
    const title: ElementX = layers.title();

    const timeout: number = setTimeout(async () => {
        title.style.display = "block";
        await fade(title);
        game.setState(game.State.Ready);
    }, time.delay.titleSplash);

    return timeout;
}