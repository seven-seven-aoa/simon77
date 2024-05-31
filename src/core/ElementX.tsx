import { trackProgress } from "./AnimationTracker";

export type { ElementX, ScreenPosition, XProps };
export { toElementX };

interface ElementX extends HTMLElement {
    attributeNames: string[];
    key: string;

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
    fade: (fade: OpacityFade) => Promise<void>;
}

interface OpacityController {
    initial: () => number;
    get: () => number;
    set: (value: number) => void;
    reset: () => void;
}

interface OpacityFade {
    initialValue?: number;
    targetValue: number;
    durationMs?: number;
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
    elementX.attributeNames = elementX.getAttributeNames();
    elementX.key = elementX.getAttribute("data-key") ?? elementX.id;

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
        get: () => (elementX.style.opacity ? Number(elementX.style.opacity) : 1),
        set: (value: number) => (elementX.style.opacity = value.toString()),
        reset: () => elementX.opacity.set(elementX.opacity.initial()),
    };
    elementX.opacity.reset();

    elementX.fade = async (fade: OpacityFade) => {
        fade.initialValue ??= elementX.opacity.get();
        fade.durationMs ??= 0;
        if (fade.durationMs < 1) {
            elementX.opacity.set(fade.targetValue);
            return;
        }
        const range: number = fade.targetValue - fade.initialValue;
        elementX.opacity.set(fade.initialValue);
        await trackProgress({
            durationMs: fade.durationMs,
            onUpdate: (progress) => {
                elementX.opacity.set(fade.initialValue! + progress * range);
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

    console.debug({ elementX });
    return elementX;
}
