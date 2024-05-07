export { getDomAll, getDomSingle, setCssVar };

const dom = new Map();

function getDomAll(query: string) {
    if (!dom.has(query)) {
        const elements = document.querySelectorAll(query);
        if (elements.length === 0) {
            throw new Error(`No elements found for query: ${query}`);
        }
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
        dom.set(query, element);
    }
    return dom.get(query);
}

function setCssVar(name: string, value: string) {
    getDomSingle(":root").style.setProperty(`--${name}`, value);
}