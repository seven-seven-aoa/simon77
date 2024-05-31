import { PointerEventHandler } from "react";
import { ElementX, ScreenPosition } from "./ElementX";
import { EventType } from "./EventTypes";

export type { InputInfo };
export { initInput, inputHandler };

interface InputConfig {
    captor: ElementX;
    observers: ((observer: InputInfo) => void)[];
}

interface InputInfo {
    eventTypeName: string;
    isType: (eventType: EventType) => boolean;
    screenPosition: ScreenPosition;
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
    const inputInfo: InputInfo = {
        eventTypeName: pe.type,
        isType: (eventType: EventType) => {
            return pe.type === eventType;
        },
        screenPosition: {
            x: pe.clientX,
            y: pe.clientY,
        },
    };
    pe.preventDefault();
    _config.observers.forEach((observer) => observer(inputInfo));
    return false;
};
