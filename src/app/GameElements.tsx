import { dxSingle, dxMultiple } from "../core/DomX";
import { ElementX } from "../core/ElementX";

export { cacheElements, glowingArray, glowingLayer, mainContainer, buttonArray, buttonLayer, controlLayer, restartButton, debugLayer, scoreLayer, titleLayer };

function cacheElements(): void {
    mainContainer();
    buttonArray();
    buttonLayer();
    controlLayer();
    restartButton();
    //debugLayer();
    scoreLayer();
    titleLayer();
    glowingArray();
    glowingLayer();
}

function mainContainer(): ElementX {
    return dxSingle("main", { initialOpacity: 1 });
}

function buttonArray(): ElementX[] {
    const elx: ElementX[] = dxMultiple("section.buttonLayer div.button", { initialOpacity: 1 });
    return elx;
}

function buttonLayer(): ElementX {
    const elx: ElementX = dxSingle("section.buttonLayer", { initialOpacity: 1 });
    return elx;
}

function glowingArray(): ElementX[] {
    const elx: ElementX[] = dxMultiple("section.glowingLayer div.button", { initialOpacity: 0 });
    return elx;
}

function glowingLayer(): ElementX {
    const elx: ElementX = dxSingle("section.glowingLayer", { initialOpacity: 1 });
    return elx;
}

function controlLayer(): ElementX {
    const elx: ElementX = dxSingle("section.controlLayer", { initialOpacity: 0 });
    return elx;
}

function restartButton(): ElementX {
    const elx: ElementX = dxSingle("section.controlLayer > img#restartButton", { initialOpacity: 0.15 });
    return elx;
}

function debugLayer(): ElementX {
    const elx: ElementX = dxSingle("section.debugLayer");
    return elx;
}

function scoreLayer(): ElementX {
    const elx: ElementX = dxSingle("section.scoreLayer", { initialOpacity: 0 });
    return elx;
}

function titleLayer(): ElementX {
    const elx: ElementX = dxSingle("section.titleLayer", { initialOpacity: 0 });
    return elx;
}
