import { ElementX } from "./ElementX";
import { EventType } from "./EventTypes";
import { PointerEventHandler } from "react";

export interface InputConfig {
    container: ElementX;
    nodeObservers: ((node: Node) => void)[];
}

let _config : InputConfig;

export function initInput(config : InputConfig) {
    _config = config;
    disableBadEvents();
}

function disableBadEvents() {
    const badEvents: EventType[] = [EventType.dblclick, EventType.selectstart, EventType.touchmove];
    badEvents.forEach((eventType: EventType) => {
        _config.container.addEventListener(EventType[eventType], (e: Event) => {
            e.preventDefault();
            return false;
        });
    });
}

export const inputHandler: PointerEventHandler<HTMLElement> = (e: React.PointerEvent<HTMLElement>) => {
    console.debug({ inputEvent: e });
    e.preventDefault();
    _config.nodeObservers.forEach((node) => node(e.target as Node));
    return false;
};
