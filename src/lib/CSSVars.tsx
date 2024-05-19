import { single } from "./Dom";


export function get(name: string) : string {
    return single(":root").style.getPropertyValue(`--${name}`);
}

export function remove(name: string) : void {
    single(":root").style.removeProperty(`--${name}`);
}

export function set(name: string, value: string) : string {
    single(":root").style.setProperty(`--${name}`, value);
    return value;
}