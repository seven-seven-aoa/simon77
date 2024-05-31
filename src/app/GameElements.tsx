import { dxSingle, dxMultiple } from "../core/DomX";
import { ElementX } from "../core/ElementX";

export { cacheElements, 
    buttonArray, 
    buttonLayer, 
    settingsBarLayer, 
    glowingArray, 
    glowingLayer,
    mainContainer, 
    restartButton, 
    scoreLayer, 
    scoreValue,
    titleLayer 
};

function cacheElements(): void {
    buttonArray();
    buttonLayer();
    settingsBarLayer();
    glowingArray();
    glowingLayer();
    mainContainer();
    restartButton();
    scoreLayer();
    scoreValue();
    titleLayer();
}

function mainContainer(): ElementX {
    return dxSingle("main", { initialOpacity: 1 });
}

function buttonArray(): ElementX[] {
    const elx: ElementX[] = dxMultiple("section.buttonLayer div.button", { initialOpacity: 1 });
    return elx;
}

function buttonLayer(): ElementX {
    const elx: ElementX = dxSingle("section.buttonLayer", { initialOpacity: 0 });
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

function settingsBarLayer(): ElementX {
    const elx: ElementX = dxSingle("section.settingsBarLayer", { initialOpacity: 0 });
    return elx;
}

function restartButton(): ElementX {
    const elx: ElementX = dxSingle("section.settingsBarLayer > img#restartButton", { initialOpacity: 0.15 });
    return elx;
}

function scoreLayer(): ElementX {
    const elx: ElementX = dxSingle("section.scoreLayer", { initialOpacity: 0 });
    return elx;
}

function scoreValue(): ElementX {
    const elx: ElementX = dxSingle("span.scoreValue", { initialOpacity: 1 });
    return elx;
}

function titleLayer(): ElementX {
    const elx: ElementX = dxSingle("section.titleLayer", { initialOpacity: 0 });
    return elx;
}
