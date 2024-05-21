import { trackProgress } from "./Core";
import { FadeStatus, FadeInfo, FadeConfiguration } from "./Types";

const _fadeStatus = {
    in: [FadeStatus.FadingIn, FadeStatus.FadedIn],
    out: [FadeStatus.FadingOut, FadeStatus.FadedOut],
};

export async function fade(info: FadeInfo) {
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

    await trackProgress({
        durationMs: config.durationMs,
        onUpdate: (progress) => {
            info.opacityController.set(config.initialOpacity! + progress * range);
        },
    });

    return new Promise((resolve) => {
        info.status = status[1];
        resolve(void 0);
    });
}
