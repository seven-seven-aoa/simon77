import {
    ElementSet,
    EventType,
    ElementEvent,
    ElementEventSet,
} from "./EventTypes";

export function disableCommomAnnnoyingEvents(set: ElementSet) {
    disableMultipleEvents({
        elementSet: set,
        eventTypes: [
            EventType.dblclick,
            EventType.selectstart,
            EventType.touchmove,
        ],
    });
}

export function disableMultipleEvents(set: ElementEventSet) {
    for (const eventType of set.eventTypes) {
        if (set.elementSet.includeDocument) {
            disableSingleEvent({ eventType, elementObject: document });
        }
        for (const elementObject of set.elementSet.elementObjects) {
            disableSingleEvent({ eventType, elementObject });
        }
    }
}

export function disableSingleEvent(single: ElementEvent) {
    single.elementObject.addEventListener(
        single.eventType.toString(),
        (e: Event) => {
            e.preventDefault();
            return false;
        },
    );
}
