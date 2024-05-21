export interface GetProps {
    rootName?: string;
    varName: string;
}

export interface RemoveProps extends GetProps {
}

export interface SetProps extends GetProps {
    value: string;
}