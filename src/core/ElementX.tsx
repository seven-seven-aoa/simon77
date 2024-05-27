import { FadeInfo, FadeDefaults, FadeStatus } from "./FadeAnimation";

export type { ElementX, ScreenPosition };
export { toElementX };

interface ElementX extends HTMLElement {
    fadeInfo: FadeInfo;
    displayShow: DisplayStyle;
    displayHide: DisplayStyle;
    overlapsWith: (element: ElementX) => boolean;
    containsPoint: (position: ScreenPosition) => boolean;
    show: () => void;
    hide: () => void;
}

interface ScreenPosition {
    x: number;
    y: number;
}

enum DisplayStyle {
    block = "block",
    none = "none",
}

function toElementX(element: HTMLElement): ElementX {
    const elementX = element as ElementX;
    elementX.displayShow = DisplayStyle.block;
    elementX.displayHide = DisplayStyle.none;

    elementX.show = () => {
        elementX.style.display = elementX.displayShow;
    };

    elementX.hide = () => {
        elementX.style.display = elementX.displayHide;
    };

    elementX.fadeInfo = {
        fadeInConfig: {
            initialOpacity: 0,
            targetOpacity: 1,
            durationMs: FadeDefaults.in.durationMs,
        },
        fadeOutConfig: {
            initialOpacity: 1,
            targetOpacity: 0,
            durationMs: FadeDefaults.out.durationMs,
        },
        status: FadeStatus.None,
        opacityController: {
            get: () => (elementX.style.opacity ? parseFloat(elementX.style.opacity) : 1),
            set: (value: number) => (elementX.style.opacity = value.toString()),
        },
    };

    elementX.overlapsWith = (element: ElementX) => {
        const rect1 = elementX.getBoundingClientRect();
        const rect2 = element.getBoundingClientRect();
        return !(rect2.left > rect1.right || rect2.right < rect1.left || rect2.top > rect1.bottom || rect2.bottom < rect1.top);
    };

    elementX.containsPoint = (position: ScreenPosition) => {
        const rect = elementX.getBoundingClientRect();
        return position.x >= rect.left && position.x <= rect.right && position.y >= rect.top && position.y <= rect.bottom;
    };
    return elementX;
}
