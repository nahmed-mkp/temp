export interface ISecMasterSearch {
    'searchTerm': string | number;
}

export interface ISecurityTag {
    TagName: string;
    TagType: string;
    IsAmbigious: boolean;
}

export interface ISecurity {
    crSecType: string;
    createDate: string;
    createName: string;
    crid: number;
    currency: string;
    cusip: string;
    dateAdded: string;
    description: string;
    futuresInfo: number;
    name: string;
    parentSID: number;
    securityType: string;
    sid: number;
    tags: ISecurityTags[];
    ticker: string;
    updateDate: string;
    updateName: string;
}

export interface ISecurityTags {
    sid: number;
    tagName: string;
    tagValue: any;
    dateModified: Date;
    userId: string;
    createName: string;
    createDate: Date;
    updateName: string;
    updateDate: Date;

    oldValue: any;
    newValue: any;
}

export interface IMarketData {
    mdid: number;
    sid: number;
    name: string;
    type: string;
    priceSource: string;
    bloombergTicker: string;
    bloombergField: string;
    bloombergEODField: string;
    status: string;
    dateAdded: string;
    updated: string;
}

export interface IMarketDataPoint {
    mdid: number;
    date: string;
    userId: string;
    eod_value: number;
    eod_ts: string;
    live_value: number;
    live_ts: string;
}


export interface ISecMasterRecInput {
    startDate: string;
    endDate: string;
    target: 'crd' | 'rcpm' | 'dwh';
    secType: string;
    securityName?: string;
    match?: boolean;
}


export interface ISecurityTagUpdateReq {
    sid: number;
    tagValue: any;
    tagType: string;
    tagName: string;
    status?: 'new' | 'edit'
}