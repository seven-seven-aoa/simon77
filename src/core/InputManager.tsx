import { PointerEventHandler } from "react";
import { ElementX } from "./ElementX";
import { EventType } from "./EventTypes";

export type { InputObserver };
export { initInput, inputHandler };


interface InputConfig {
    container: ElementX;
    observers: ((observer: InputObserver) => void)[];
}

interface InputObserver {
    inputEvent: React.PointerEvent<HTMLElement>;
    node: Node;
}

let _config: InputConfig;

function initInput(config: InputConfig) {
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

const inputHandler: PointerEventHandler<HTMLElement> = (inputEvent: React.PointerEvent<HTMLElement>) => {
    console.debug({ inputEvent });
    inputEvent.preventDefault();
    _config.observers.forEach((observer) =>
        observer({
            inputEvent,
            node: inputEvent.target as Node,
        }),
    );
    return false;
};
