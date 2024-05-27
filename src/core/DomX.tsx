import { ElementX, XProps, toElementX } from "./ElementX";
export { dxSingle, dxMultiple };

const _single = new Map<string, ElementX>();
const _multiple = new Map<string, ElementX[]>();

function dxSingle(query: string, xprops?: XProps): ElementX {
    if (_single.has(query)) {
        return _single.get(query)!;
    }

    const element = document.querySelector(query);
    console.debug({ query, type: typeof element, element });
    if (!element) {
        throw new Error(noElementsError(query));
    }

    const elementX = toElementX(element as HTMLElement, xprops);
    _single.set(query, elementX);
    return _single.get(query)!;
}

function dxMultiple(query: string, xprops?: XProps): ElementX[] {
    if (_multiple.has(query)) {
        return _multiple.get(query)!;
    }

    const elements = document.querySelectorAll(query);
    if (elements.length === 0) {
        throw new Error(noElementsError(query));
    }

    const elementXArray: ElementX[] = [];
    elements.forEach((element) => {
        const elementX = toElementX(element as HTMLElement, xprops);
        elementXArray.push(elementX);
    });

    _multiple.set(query, elementXArray);
    return _multiple.get(query)!;
}

function noElementsError(query: string) {
    return `No elements found for query: ${query}`;
}
