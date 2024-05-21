import { GetProps, RemoveProps, SetProps } from "./CSSVariableTypes";
import { single } from "./DomX";

export function get(props: GetProps): string {
    props.rootName ??= ":root";
    return single(props.rootName).style.getPropertyValue(`--${props.varName}`);
}

export function remove(props: RemoveProps): void {
    props.rootName ??= ":root";
    single(props.rootName).style.removeProperty(`--${props.varName}`);
}

export function set(props: SetProps): string {
    props.rootName ??= ":root";
    single(props.rootName).style.setProperty(`--${props.varName}`, props.value);
    return props.value;
}
