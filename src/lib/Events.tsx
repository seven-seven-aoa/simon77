/* eslint-disable @typescript-eslint/no-namespace */

export namespace InputEvents {
    export const MOUSE_DOWN: string = "mousedown";
    export const MOUSE_UP: string = "mouseup";

    export const TOUCH_START: string = "touchstart";
    export const TOUCH_END: string = "touchend";

    export const POINTER_DOWN: string = "pointerdown";
    export const CLICK: string = "click";
    export const DBL_CLICK: string = "dblclick";
}

export function bind(
    element: HTMLElement,
    events: string[],
    callback: (event: Event) => void
) {
    events.forEach((event) => element.addEventListener(event, callback));
}
