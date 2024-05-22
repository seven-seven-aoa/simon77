import { dxSingle } from "./DomX";
export { getCSSVariable, removeCSSVariable, setCSSVariable };

interface GetCSSVariableProps {
    rootName?: string;
    varName: string;
}
function getCSSVariable(props: GetCSSVariableProps): string {
    props.rootName ??= ":root";
    return dxSingle(props.rootName).style.getPropertyValue(`--${props.varName}`);
}

interface RemoveCSSVariableProps extends GetCSSVariableProps {}
function removeCSSVariable(props: RemoveCSSVariableProps): void {
    props.rootName ??= ":root";
    dxSingle(props.rootName).style.removeProperty(`--${props.varName}`);
}

interface SetCSSVariableProps extends GetCSSVariableProps {
    value: string;
}
function setCSSVariable(props: SetCSSVariableProps): string {
    props.rootName ??= ":root";
    dxSingle(props.rootName).style.setProperty(`--${props.varName}`, props.value);
    return props.value;
}
