import { Fade, FadeDefaults, FadeStatus } from "./animation/Fade";

export interface ElementX extends HTMLElement {
    fade: Fade;
}

export function toElementX(element: HTMLElement): ElementX {
    const elementX = element as ElementX;
    elementX.fade = {
        in: {
            initialOpacity: 0,
            targetOpacity: 1,
            durationMs: FadeDefaults.in.durationMs,
        },
        out: {
            initialOpacity: 1,
            targetOpacity: 0,
            durationMs: FadeDefaults.out.durationMs,
        },
        status: FadeStatus.None,
        opacity: {
            get: () => elementX.style.opacity ? parseFloat(elementX.style.opacity) : 1,
            set: (value: number) => elementX.style.opacity = value.toString(),
        },
    };
    return elementX;
}
