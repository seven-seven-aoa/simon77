import { trackProgress } from "./AnimationTracker";

export type { FadeInfo };
export { FadeDefaults, FadeStatus, fadeAnimation };

interface FadeConfiguration {
    initialOpacity: number;
    targetOpacity: number;
    durationMs: number;
}

const FadeDefaults = {
    in: { durationMs: 2000 },
    out: { durationMs: 2000 },
};

interface FadeInfo {
    status: FadeStatus;
    opacityController: OpacityController;
    fadeInConfig: FadeConfiguration;
    fadeOutConfig: FadeConfiguration;
}

enum FadeStatus {
    None      = "None",
    FadingIn  = "FadingIn",
    FadedIn   = "FadedIn",
    FadingOut = "FadingOut",
    FadedOut  = "FadedOut",
}

interface OpacityController {
    get: () => number;
    set: (value: number) => void;
}

const _fadeStatus = {
    in: [FadeStatus.FadingIn, FadeStatus.FadedIn],
    out: [FadeStatus.FadingOut, FadeStatus.FadedOut],
};

async function fadeAnimation(info: FadeInfo) {
    let config: FadeConfiguration = info.fadeInConfig;
    let status: FadeStatus[] = _fadeStatus.in;

    if (_fadeStatus.in.indexOf(info.status) > -1) {
        config = info.fadeOutConfig;
        status = _fadeStatus.out;
    }

    config.initialOpacity ??= info.opacityController.get();
    const range: number = config.targetOpacity - config.initialOpacity;

    info.opacityController.set(config.initialOpacity);
    info.status = status[0];
    console.debug({ fadeStatus: info.status });
    
    await trackProgress({
        durationMs: config.durationMs,
        onUpdate: (progress) => {
            info.opacityController.set(config.initialOpacity! + progress * range);
        },
    });
    
    return new Promise((resolve) => {
        info.status = status[1];
        console.debug({ fadeStatus: info.status });
        resolve(void 0);
    });
}
