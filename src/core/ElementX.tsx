import { FadeInfo, FadeDefaults, FadeStatus } from "./FadeAnimation";

export type { ElementX };
export { toElementX };

interface ElementX extends HTMLElement {
    fadeInfo: FadeInfo;
    displayShow: DisplayStyle;
    displayHide: DisplayStyle;
    show: () => void;
    hide: () => void;
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
            get: () => elementX.style.opacity ? parseFloat(elementX.style.opacity) : 1,
            set: (value: number) => elementX.style.opacity = value.toString(),
        },
    };
    return elementX;
}
