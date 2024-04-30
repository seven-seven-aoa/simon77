export { game, loader, title, getDomAll, getDomSingle, setCSSVariable };

const dom = new Map();

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

function setCSSVariable(name: string, value: string) {
    getDomSingle(":root").style.setProperty(`--${name}`, value);
}

function game() {
    return getDomSingle(".game");
}

function loader() {
    return getDomSingle(".loader");
}

function title() {
    return getDomSingle(".title");
}
