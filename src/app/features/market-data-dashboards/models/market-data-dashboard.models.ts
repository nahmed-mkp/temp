export interface GeneratedColDef {
    headerName: string;
    children: StaticColDef[];
}

export interface StaticColDef {
    field: string;
    headerName?: string;
    rowGroup?: boolean;
    hide?: boolean;
    width?: number;
    valueFormatter?: Function
}

export interface BondChartRequestRow {
    alias: string;
    asset_class: string;
    mdid: number;
    name: string;
    ticker: string;
    mdid2?: number;
    formula?: string;
}