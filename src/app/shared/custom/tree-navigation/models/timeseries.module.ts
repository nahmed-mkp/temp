export class TimeseriesNode {
    absolutePath: string;
    catalogId: number;
    catalogLevel: string;
    catalogName: string;
    hasChildren: boolean;
    parentCatalogId: number;
    timeseriesId: number | null;
    children?: TimeseriesNode[]
}

export class TimeseriesSelectionPayload {
    id: number;
    timeseriesId: number;
    label: string;
    alias?: string;
    isSelected: boolean;
    isChecked: boolean;
    axis: AxisType
}

export type AxisType = 'auto' | 'left' | 'right' | 'invertedLeft' | 'invertedRight'