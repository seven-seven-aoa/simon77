import { FadeInfo, FadeDefaults, FadeStatus } from "./animation/Types";

export interface ElementX extends HTMLElement {
    fadeInfo: FadeInfo;
}

export function toElementX(element: HTMLElement): ElementX {
    const elementX = element as ElementX;
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
