/* eslint-disable @typescript-eslint/no-explicit-any */
export { getDomAll, getDomSingle, setCssVar };

const dom = new Map();

function getDomAll(query: string) {
    if (!dom.has(query)) {
        const elements = document.querySelectorAll(query);
        if (elements.length === 0) {
            throw new Error(`No elements found for query: ${query}`);
        }
        elements.forEach(extendElement);
        dom.set(query, elements);
    }
    return dom.get(query);
}

function getDomSingle(query: string) {
    if (!dom.has(query)) {
        const element = document.querySelector(query);
        if (element === null) {
            throw new Error(`No element found for query: ${query}`);
        }
        extendElement(element);
        dom.set(query, element);
    }
    return dom.get(query);
}

function setCssVar(name: string, value: string) {
    getDomSingle(":root").style.setProperty(`--${name}`, value);
}

function extendElement(element: any) {
    element.fadeIn = function () {
        element.classList.remove("fade_out");
        element.classList.add("fade_in");
    };
    element.fadeOut = function () {
        element.classList.remove("fade_in");
        element.classList.add("fade_out");
    };
    element.hide = function () {
        element.classList.add("hide");
    };
    element.show = function () {
        element.classList.remove("hide");
    };
}
