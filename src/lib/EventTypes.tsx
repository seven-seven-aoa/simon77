import { ElementX } from "./ElementX";

export interface ElementSet {
    elementObjects: ElementX[],
    includeDocument: boolean,
}

export interface ElementEventSet {
    elementSet: ElementSet,
    eventTypes: EventType[],
}

export interface ElementEvent {
    elementObject: ElementX | Document,
    eventType: EventType,
}

export interface EventDetection {
    eventType: EventType;
    eventObject: Event;
}

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