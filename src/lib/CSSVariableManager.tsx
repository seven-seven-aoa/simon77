import { GetProps, RemoveProps, SetProps } from "./CSSVariableTypes";
import { dxSingle } from "./DomX";

export function getCSSVariable(props: GetProps): string {
    props.rootName ??= ":root";
    return dxSingle(props.rootName).style.getPropertyValue(`--${props.varName}`);
}

export function removeCSSVariable(props: RemoveProps): void {
    props.rootName ??= ":root";
    dxSingle(props.rootName).style.removeProperty(`--${props.varName}`);
}

export function setCSSVariable(props: SetProps): string {
    props.rootName ??= ":root";
    dxSingle(props.rootName).style.setProperty(`--${props.varName}`, props.value);
    return props.value;
}
