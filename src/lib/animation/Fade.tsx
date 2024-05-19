import { applyProgress } from "./Core";

export interface Fade {
    status: FadeStatus;
    opacity: Opacity;
    in: FadeConfig;
    out: FadeConfig;
}

export interface Opacity {
    get: () => number;
    set: (value: number) => void;
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

const _fadeStatus = {
    in: [FadeStatus.FadingIn, FadeStatus.FadedIn],
    out: [FadeStatus.FadingOut, FadeStatus.FadedOut],
};

export async function fade(fade: Fade) {
    let config: FadeConfig = fade.in;
    let status: FadeStatus[] = _fadeStatus.in;

    if (_fadeStatus.in.indexOf(fade.status) > -1) {
        config = fade.out;
        status = _fadeStatus.out;
    }

    config.initialOpacity ??= fade.opacity.get();
    const range: number = config.targetOpacity - config.initialOpacity;

    fade.opacity.set(config.initialOpacity);
    fade.status = status[0];

    await applyProgress(
        config.durationMs,
        (progress) => {
            fade.opacity.set(config.initialOpacity! + progress * range);
        },
        () => { fade.status = status[1]; }
    );
}
