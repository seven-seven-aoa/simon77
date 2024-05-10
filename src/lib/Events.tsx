/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */

export namespace InputEvents {
    export const CLICK: string        = "click";
    export const DBL_CLICK: string    = "dblclick";
    export const MOUSE_DOWN: string   = "mousedown";
    export const MOUSE_UP: string     = "mouseup";
    export const POINTER_DOWN: string = "pointerdown";
    export const POINTER_UP: string   = "pointerup";
    export const TOUCH_END: string    = "touchend";
    export const TOUCH_START: string  = "touchstart";
}

export function bind(
    elements: any[],
    events: string[],
    callback: (event: any) => void
) {
    elements.forEach((element) => {
        events.forEach((eventName) => {
            element.addEventListener(eventName, (event: any) => {
                console.info({element, eventName, event});
                callback(event);
            });
        });
    });
}
