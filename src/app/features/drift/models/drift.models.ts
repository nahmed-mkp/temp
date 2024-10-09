export interface PositionsDriftRequest {
    asOfDate: Date;
    threshold: number;
    hideFXHedges: boolean;
    useDailyDrift: boolean;
}

export interface PositionDriftRequest extends PositionsDriftRequest {
    tid: number;
    sid: number;
}

export interface PnlLoadRequest {
    asOfDate: Date;
    tid: number;
    sid: number;
}
