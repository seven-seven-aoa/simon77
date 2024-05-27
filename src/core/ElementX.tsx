import { trackProgress } from "./AnimationTracker";

export type { ElementX, ScreenPosition, XProps };
export { toElementX };

interface ElementX extends HTMLElement {
    containsPoint: (position: ScreenPosition) => boolean;
    overlapsWith: (element: ElementX) => boolean;

    hideStyle: () => DisplayStyle;
    showStyle: () => DisplayStyle;

    hide: () => void;
    show: () => void;
    isHidden: () => boolean;
    isVisible: () => boolean;
    isInitiallyHidden: () => boolean;

    opacity: OpacityController;
    fade: (config: FadeProps) => Promise<void>;
}

interface FadeProps {
    initialOpacity?: number;
    targetOpacity: number;
    durationMs?: number;
}

interface OpacityController {
    initial: () => number;
    get: () => number;
    set: (value: number) => void;
    reset: () => void;
}

interface ScreenPosition {
    x: number;
    y: number;
}

enum DisplayStyle {
    block = "block",
    flex = "flex",
    grid = "grid",
    none = "none",
}

interface XProps {
    showStyle?: DisplayStyle;
    hideStyle?: DisplayStyle;
    initiallyHidden?: boolean;
    initialOpacity?: number;
}

function toElementX(element: HTMLElement, xprops?: XProps): ElementX {
    xprops ??= {};
    xprops.showStyle ??= DisplayStyle.block;
    xprops.hideStyle ??= DisplayStyle.none;
    xprops.initiallyHidden ??= false;
    xprops.initialOpacity ??= 1;

    const elementX = element as ElementX;

    elementX.showStyle = () => xprops.showStyle!;
    elementX.show = () => {
        elementX.style.display = elementX.showStyle();
    };

    elementX.hideStyle = () => xprops.hideStyle!;
    elementX.hide = () => {
        elementX.style.display = elementX.hideStyle();
    };

    elementX.isHidden = () => elementX.style.display === elementX.hideStyle();
    elementX.isVisible = () => elementX.style.display === elementX.showStyle();
    elementX.isInitiallyHidden = () => xprops.initiallyHidden!;

    if (elementX.isInitiallyHidden()) {
        elementX.hide();
    }

    elementX.opacity = {
        initial: () => xprops.initialOpacity!,
        get: () => (elementX.style.opacity ? parseFloat(elementX.style.opacity) : 1),
        set: (value: number) => (elementX.style.opacity = value.toString()),
        reset: () => elementX.opacity.set(elementX.opacity.initial()),
    };
    elementX.opacity.reset();

    elementX.fade = async (fprops: FadeProps) => {
        fprops.initialOpacity ??= elementX.opacity.get();
        const range: number = fprops.targetOpacity - fprops.initialOpacity;

        elementX.opacity.set(fprops.initialOpacity);
        await trackProgress({
            durationMs: fprops.durationMs ?? 1000,
            onUpdate: (progress) => {
                elementX.opacity.set(fprops.initialOpacity! + progress * range);
            },
        });
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
