export interface IDateRange {
    startDate: string;
    endDate: string;
}

export interface ITradeTag {
    TID: number;
    TagName: string;
    TagValue: string;
}

export interface ISecurityTagChanges {
    startDate: string;
    endDate: string;
    payload: any;
}

export interface ITradeTagChanges {
    startDate: string;
    endDate: string;
    payload: any;
}

export interface IPositionTagChanges {
    startDate: string;
    endDate: string;

    tags: IPositionTagChange;
}

export interface IPositionTagChange {
    fundID: number;
    podID: number;
    tid: number;
    sid: number;
    tagName: string;
    tagValue: any;
    action: string;
}

export interface ITradeNameTagChanges {
    tid: number;
    tagName: string;
    tagValue: any;
    tagType: string;
    action: 'update' | 'delete';
}

export interface IPositionTagChangesAdvance {
    fundid: number;
    podid: number;
    tid: number;
    sid: number;
    tagName: string;
    tagValue: any;
    tagType: string;
    action: 'update' | 'delete';
}


