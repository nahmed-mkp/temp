import * as fromBenchmarks from './benchmark.model';
import * as fromMetrics from './metric.model';

export interface IDateRange {
    startDate: Date;
    endDate: Date;
}

export interface IFund {
    id: number;
    code: string;
    description: string;
    returnMDID: number;
    inceptionDate: Date;

    benchmarks: fromBenchmarks.IBenchmark[];

    timeseries: fromMetrics.ITimeseriesResponse;
    stats: fromMetrics.IStatistics[];

    benchmarksLoaded: boolean;
    timeseriesLoaded: boolean;
    statisticsLoaded: boolean;
    histogramLoaded: boolean;
    summaryLoaded: boolean;
    correlationLoaded: boolean;
    drawdownLoaded: boolean;
    rawReturnsLoaded: boolean;
    fundBenchmarksLoaded: boolean;
    alphaBetaLoaded: boolean;
    rollingCorrLoaded: boolean;
    rollingCorrWindowLoaded: boolean;
}

export class Fund implements IFund {
    id: number;
    code: string;
    description: string;
    returnMDID: number;
    benchmarks: fromBenchmarks.IBenchmark[];
    inceptionDate: Date;

    benchmarksLoaded: boolean;
    timeseriesLoaded: boolean;
    statisticsLoaded: boolean;
    histogramLoaded: boolean;
    summaryLoaded: boolean;
    correlationLoaded: boolean;
    drawdownLoaded: boolean;
    rawReturnsLoaded: boolean;
    fundBenchmarksLoaded: boolean;
    alphaBetaLoaded: boolean;
    rollingCorrLoaded: boolean;
    rollingCorrWindowLoaded: boolean;

    timeseries: fromMetrics.ITimeseriesResponse;
    stats: fromMetrics.IStatistics[];

    constructor(options: IFund) {
        this.id = options.id;
        this.code = options.code;
        this.description = options.description;
        this.returnMDID = options.returnMDID;
        this.benchmarks = options.benchmarks || [];
        this.inceptionDate = options.inceptionDate;

        this.timeseries = options.timeseries || null;
        this.stats = options.stats || [];

        this.benchmarksLoaded = options.benchmarksLoaded || false;
        this.timeseriesLoaded = options.timeseriesLoaded || false;
        this.statisticsLoaded = options.statisticsLoaded || false;
        this.histogramLoaded = options.histogramLoaded || false;
        this.summaryLoaded = options.summaryLoaded || false;
        this.correlationLoaded = options.correlationLoaded || false;
        this.drawdownLoaded = options.drawdownLoaded || false;
        this.rawReturnsLoaded = options.rawReturnsLoaded || false;
        this.fundBenchmarksLoaded = options.fundBenchmarksLoaded || false;
        this.alphaBetaLoaded = options.alphaBetaLoaded || false;
        this.rollingCorrLoaded = options.rollingCorrLoaded || false;
        this.rollingCorrWindowLoaded = options.rollingCorrWindowLoaded || false;
    }
}

export interface IReportParameter {
    fund: IFund;
    dateRange: IDateRange;
    window?: number;
}

export class ReportParameter {
    fund: IFund;
    dateRange: IDateRange;

    constructor(options: IReportParameter) {
        this.fund = options.fund;
        this.dateRange = options.dateRange;
    }

}


export interface ISnapshotParameter {
    fund: IFund;
    monthEndDate: string;
    period: 'ITD' | 'YTD' | 'QTD' | 'MTD';
    grouping?: string;
}

export class SnapshotParameter implements ISnapshotParameter {
    fund: IFund;
    monthEndDate: string;
    period: 'ITD' | 'YTD' | 'QTD' | 'MTD';
    grouping?: string;

    constructor(options: ISnapshotParameter) {
        this.fund = options.fund;
        this.monthEndDate = options.monthEndDate;
        this.grouping = options.grouping;
    }
}



export class RefreshDataReqParameter {
    run_return_stats: boolean;
    mode: 'month_end' | 'daily';
    run_net_attribution: boolean;
    run_non_linear_risks: boolean;
    grouping: '';
    run_leverage: boolean;
    as_of_date: any;
    run_linear_risks: boolean;
    download_benchmark_returns: boolean;
}
