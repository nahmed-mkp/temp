export interface PositionLayout {
    layouts: {
        [layoutName: string]: {
            layout: any[];
            rowGrouping: string[]
            owner: string;
        }
    };
    menu: {
        [menuName: string]: {
            layouts: string[]
        }
    };
    menus: string[];
}

export interface MissingClosesRequest {
    asOfDate: string, 
    showClosedPositions: number
}

export interface PositionDatesResponse {
    latest: string;
    portfolios: {
      [portfolioID: string]: {
        date: string;
        isLatest: boolean;
        lastUpdated: string;
        locked: boolean;
        portfolioID: number;
        portfolioRolled: string;
        saveDate: string;
      }
    };
}

export interface PositionInfoRequest {
    isLive: boolean;
    sid: number;
    fundId: number;
    asOfDate: string;
    tid: number;
    podId: number;
    layout: string;
}

export interface DataPath {
    key: string;
    grouping: string;
    layout?: string;
    displayName?: string;
    capital?: number;
    date? : string;
}

// export interface DataPathWithCapital extends DataPath {
//     capital: number;
// }


export interface ExecutionRequest {
    grouping: string;
    asOfDate: string;
    keys: number[];
}

export interface NonlinearPnlRequest {
    asOfDate: string;
    grouping: string;
    layout: string;
    source: string;
    mode: string;
}
