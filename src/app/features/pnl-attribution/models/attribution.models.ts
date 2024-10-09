export interface IAttributionRequest {
    startDate: Date;
    endDate: Date;
    grouping?: string[];
    includeShareClassFundsInFirmTotal: boolean;
    guid?: string;
    reclassifyRepo: boolean;
    excludeFunding: boolean;
    includeBetaAdjustment: boolean
}

export interface IPositionAttributionRequest { 
    guid: string;
    id: number;
}
export interface IAttributionDailyTimeseriesRequest {
    guid: string;
    id: number;
    name?: string;
}

export class IAttributionDetailsRequest {
    guid: string;
    id: number | string;
    month: number | string;
    year: number | string;
    combineId?: string;

    constructor(guid: string, id: number, month: number, year: number) {
        this.guid = guid;
        this.id = id;
        this.month = month;
        this.year = year;
        this.combineId = id + '|' + month + '|' + year;
    }
}

export interface IAttributionReportRequest {
    startDate: Date;
    endDate: Date;
    funds?: string[];
    pods?: string[];
}

export interface ICapitalRequest {
    startDate: string;
    endDate: string;
}

export interface GridDisplayMode {
    "Id": false;
    "ParentId": false;
    "Level": false;
    "DisplayName": false;
    "SortOrder": false;
    'P/L($)': true;
    '% to Fund': boolean;
    '% to Cap': boolean;
    'Fund Cap (k)': boolean;
    'Cap (k)': boolean;
    'σ': boolean;
    'σ(%)': boolean;
    '% to Fund(qr)': boolean;
    'P/L($)(qr)': boolean;
    '% to Fund(yr)': boolean;
    'P/L($)(yr)': boolean;
}


export interface IAttributionNode { 
    id: number;
    guid: string;
}

export interface layoutState {
    filterValue?: string;
    sortState?: any;
    grouping?: string[];
    isShared?: boolean;
    default?: boolean;
    layoutName?: string;
    createdBy?: string;
    gridDisplayMode?: GridDisplayMode;
}