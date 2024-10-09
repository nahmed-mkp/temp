// export enum PlotType {
//     OAS = 1,
//     TSYOAS = 2
// }

// export let PlotType: string;

export interface OASTimeseries {
    series: string;
    description: string;
    coupons: OASCoupon[];
}

export interface OASCoupon {
    id: string;
    bond: string;
    coupon: number;
    oasUrl: string;
    tsyOasUrl: string;
    oasCompareUrl: string;
    tsyOasCompareUrl: string;
    couponToCompare?: OASCoupon;
    isSupportedByTBATracker: boolean;
}

export interface CacheDataResponse {
    plotType: string;
    message: string;
}

export interface PlotDataRequest {
    coupon: OASCoupon;
    requestType: string;
    mode?: string;
}

export interface PlotDataResult {
    bond: string;
    coupon: number;
    plotType: string;
    visible: boolean;
    data: any[];
    rendered?: boolean;
    isComparison?: boolean;
}

export interface MetricType {
    metricName: string;
    metricTypeId: number;
    mnemonic: string;
}

export interface TrackerTimestamp {
    timestamp: string;
}
