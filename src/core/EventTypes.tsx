import { ElementX } from "./ElementX";
export type { ElementSet, ElementEventSet, ElementEvent, EventDetection };
export { EventType };

interface ElementSet {
    elementObjects: ElementX[];
    includeDocument: boolean;
}

interface ElementEventSet {
    elementSet: ElementSet;
    eventTypes: EventType[];
}

interface ElementEvent {
    elementObject: ElementX | Document;
    eventType: EventType;
}

interface EventDetection {
    eventType: EventType;
    eventObject: Event;
}

enum EventType {
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
