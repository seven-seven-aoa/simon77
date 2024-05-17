import { ElementX, FadeConfig, FadeStatus } from "../ElementX";
import { applyProgress } from "./Core";

const _mode = {
    in: [FadeStatus.FadingIn, FadeStatus.FadedIn],
    out: [FadeStatus.FadingOut, FadeStatus.FadedOut],
};

export async function fade(elx: ElementX) {
    let config: FadeConfig = elx.fade.in;
    let mode: FadeStatus[] = _mode.in;

    if (_mode.in.indexOf(elx.fade.status) > -1) {
        config = elx.fade.out;
        mode = _mode.out;
    }

    config.initialOpacity ??= parseFloat(elx.style.opacity);
    const range: number = config.targetOpacity - config.initialOpacity;

    elx.style.opacity = config.initialOpacity.toString();
    elx.fade.status = mode[0];

    await applyProgress(
        config.durationMs,
        (progress) => {
            elx.style.opacity = (
                config.initialOpacity! +
                progress * range
            ).toString();
        },
        () => {
            elx.fade.status = mode[1];
        }
    );
}
