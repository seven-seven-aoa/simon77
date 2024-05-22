import { PointerEventHandler } from "react";
import { EventType } from "./EventTypes";
import { mainContainer, titleLayer } from "../app/GameManager";

const badEvents: EventType[] = [EventType.dblclick, EventType.selectstart, EventType.touchmove];

export function initInputEvents() {
    badEvents.forEach((eventType: EventType) => {
        mainContainer().addEventListener(EventType[eventType], (e: Event) => {
            e.preventDefault();
            return false;
        });
    });
}

export const pointerEventHandler: PointerEventHandler<HTMLElement> = (e: React.PointerEvent<HTMLElement>) => {
    console.info({ pointerEvent: e });
    e.preventDefault();

    if (titleLayer().contains(e.target as Node)) {
        console.info("clicked inside");
    } else {
        console.info("clicked outside");
    }

    return false;
};
