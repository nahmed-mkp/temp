export interface timeSeriesPlotObject {
    name: string,
    data: any[]
}

export interface VolReportData {
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