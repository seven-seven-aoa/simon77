import { ElementX } from "./ElementX";

export enum EventType {
    click,
    dblclick,
    mousedown,
    mouseup,
    pointerdown,
    pointerup,
    selectstart,
    touchend,
    touchstart,
    touchmove,
}

export interface Detection {
    type: EventType;
    event: Event;
}

export function disableCommomAnnnoyingEvents(
    elements: ElementX[],
    includeDocument: boolean
) {
    disableMultipleEvents(
        [EventType.dblclick, EventType.selectstart, EventType.touchmove],
        elements,
        includeDocument
    );
}

export function disableMultipleEvents(
    events: EventType[],
    elements: ElementX[],
    includeDocument: boolean
) {
    for (const event of events) {
        if (includeDocument) {
            disableSingleEvent(event, document);
        }
        for (const element of elements) {
            disableSingleEvent(event, element);
        }
    }
}

export function disableSingleEvent(
    event: EventType,
    element: ElementX | Document
) {
    element.addEventListener(event.toString(), (e: Event) => {
        e.preventDefault();
        return false;
    });
}

// const _buffer: InputData[] = [];
