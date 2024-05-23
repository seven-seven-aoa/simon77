import { PointerEventHandler } from "react";
import { ElementX } from "./ElementX";
import { EventType } from "./EventTypes";

export type { InputEvent };
export { initInput, inputHandler };

interface InputConfig {
    captor: ElementX;
    observers: ((observer: InputEvent) => void)[];
}

interface InputEvent {
    eventTypeName: string;
    isType: (eventType: EventType) => boolean;
    isContainedBy: (element: ElementX) => boolean;
}

let _config: InputConfig;

function initInput(config: InputConfig) {
    _config = config;
    disableBadEvents();
}

function disableBadEvents() {
    const badEvents: EventType[] = [EventType.dblclick, EventType.selectstart, EventType.touchmove];
    badEvents.forEach((eventType: EventType) => {
        _config.captor.addEventListener(eventType, (e: Event) => {
            e.preventDefault();
            return false;
        });
    });
}

const inputHandler: PointerEventHandler<HTMLElement> = (pe: React.PointerEvent<HTMLElement>) => {
    const inputEvent: InputEvent = {
        eventTypeName: pe.type,
        isType: (eventType: EventType) => pe.type === eventType,
        isContainedBy: (element: ElementX) => element.contains(pe.target as Node),
    };
    console.debug({ inputEvent });
    pe.preventDefault();
    _config.observers.forEach((observer) => observer(inputEvent));
    return false;
};
