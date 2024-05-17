export interface ElementX extends HTMLElement {
    fade: Fade;
}

export interface Fade {
    in: FadeConfig;
    out: FadeConfig;
    status: FadeStatus;
}

export interface FadeConfig {
    initialOpacity: number;
    targetOpacity: number;
    durationMs: number;
}

export const FadeDefaults = {
    in: { durationMs: 2000 },
    out: { durationMs: 2000 },
};

export enum FadeStatus {
    None = 0,
    FadingIn = 1,
    FadedIn = 2,
    FadingOut = 3,
    FadedOut = 4,
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
    };
    return elementX;
}
