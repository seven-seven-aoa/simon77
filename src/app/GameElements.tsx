import { dxSingle, dxMultiple } from "../core/DomX";
import { ElementX } from "../core/ElementX";

export { mainContainer, buttonArray, buttonLayer, controlLayer, restartButton, debugLayer, scoreLayer, titleLayer };

function mainContainer(): ElementX {
    return dxSingle("main", { initialOpacity: 1 });
}

function buttonArray(): ElementX[] {
    const elx: ElementX[] = dxMultiple("main > section.buttonLayer > div.button");
    return elx;
}

function buttonLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.buttonLayer", { initialOpacity: 0 });
    return elx;
}

function controlLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.controlLayer", { initialOpacity: 0 });
    return elx;
}

function restartButton(): ElementX {
    const elx: ElementX = dxSingle("main > section.controlLayer > img#restartButton", { initialOpacity: 0.15 });
    return elx;
}

function debugLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.debugLayer");
    return elx;
}

function scoreLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.scoreLayer", { initialOpacity: 0 });
    return elx;
}

function titleLayer(): ElementX {
    const elx: ElementX = dxSingle("main > section.titleLayer", { initialOpacity: 0 });
    return elx;
}
