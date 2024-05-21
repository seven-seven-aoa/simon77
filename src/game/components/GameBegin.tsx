import { ElementX } from "../../lib/ElementX";
import { fade } from "../../lib/animation/Fade";

import * as buttonSet from "./ButtonManager";
import * as input from "../../lib/EventManager";
import * as layers from "./Layers";
import * as levelSet from "./LevelManager";
import * as time from "./Time";

export function init(): number {
    buttonSet.create();
    levelSet.create();

    input.disableCommomAnnnoyingEvents({
        elementObjects: [
            ...layers.buttonsEach(),
            layers.buttonsSection(),
            layers.controlSection(),
            layers.debugSection(),
            layers.scoreSection(),
            layers.titleSection(),
        ],
        includeDocument: true,
    });
    
    

    const title: ElementX = layers.titleSection();

    const timeout: number = setTimeout(async () => {
        title.style.display = "block";
        await fade(title.fadeConfig);

        await fade(title);
        game.setState(game.State.Ready);
    }, time.delay.titleSplash);

    return timeout;
}
