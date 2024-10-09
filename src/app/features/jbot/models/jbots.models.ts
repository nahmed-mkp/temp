export interface JbotGridData {
    asOfDate: string;
    av_Sigs: number;
    category: string;
    count: number;
    fauxSharpe: number;
    high: number;
    low: number;
    mean: number;
    mean_C: number;
    median: number;
    median_C: number;
    noPrint_Pct: number;
    now_Sigs: number;
    pctNegative: number;
    pctPositive: number;
    percentile: number;
    seriesName: string;
    since: number;
    spearman: number;
    when: string;
}

export interface JbotTimeseriesResponse {
    annotations: {when: string}[];
    data: JbotGridData[];
}   