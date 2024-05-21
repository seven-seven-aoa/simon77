export interface FadeConfiguration {
    initialOpacity: number;
    targetOpacity: number;
    durationMs: number;
}

export const FadeDefaults = {
    in: { durationMs: 2000 },
    out: { durationMs: 2000 },
};

export interface FadeInfo {
    status: FadeStatus;
    opacityController: OpacityController;
    fadeInConfig: FadeConfiguration;
    fadeOutConfig: FadeConfiguration;
}

export enum FadeStatus {
    None = 0,
    FadingIn = 1,
    FadedIn = 2,
    FadingOut = 3,
    FadedOut = 4,
}

export interface OpacityController {
    get: () => number;
    set: (value: number) => void;
}

export interface ProgressTracker {
    durationMs: number;
    onUpdate: (progress: number) => void;
}
