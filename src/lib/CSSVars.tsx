import { single } from "./Dom";


export function get(name: string) {
    single(":root").style.getPropertyValue(`--${name}`);
}

export function remove(name: string) {
    single(":root").style.removeProperty(`--${name}`);
}

export function set(name: string, value: string) {
    single(":root").style.setProperty(`--${name}`, value);
}