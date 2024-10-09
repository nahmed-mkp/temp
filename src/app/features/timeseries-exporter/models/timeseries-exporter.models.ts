export interface IDateRange {
    startDate: any;
    endDate: any;

}

export interface IMonitor {
    name: string;
    marketData: IMonitorMarketData[];
    newName?: string;
}

export interface IMonitorMarketData {
    mdid: number;
    displayType: string;
    displayName: string;
    listOrder?: number;
    label: string;

    editStatus?: string | boolean;
}

export interface IMonitorRequest {
    monitor: IMonitor;
    startDate: string;
    endDate: string;
    frequency: string;
    lookback: number;
}

export interface ISaveMonitorRequest {
    name: string;
    newList: boolean;
    add: IMonitorMarketData[];
    update: IMonitorMarketData[];
    delete: IMonitorMarketData[];
}

export interface ISaveMonitorResponse {
    name: string;
    updatedList: any[];
    status: boolean;
    error?: string;
}

export interface ITimeseriesRequest {
    monitorName: string;
    startDate: string;
    endDate: string;
}




export interface ITimeseriesWithMdidListRequest {
    mdidList: number[];
    fullList: any[];
    startDate: string;
    endDate: string;
}

