
export interface ITimeseriesResponse {
    fundCode: string;
    value: string;
    errorCol: string[];
}

export class TimeseriesResponse implements ITimeseriesResponse {

    fundCode: string;
    errorCol: string[];
    value: string;

    constructor(options: ITimeseriesResponse) {
        this.fundCode = options.fundCode;
        this.value = options.value;
        this.errorCol = options.errorCol;
    }
}

export interface IStatistics {
    code: string;
    startDate: Date;
    endDate: Date;
    description: string;
    isBenchmark: boolean;
    compoundROR: number;
    cumulativeReturn: number;
    standardDeviationAnnualized: number;
    maxDrawdown: number;
    sharpeRatio: number;
    correlationWithFund: number;
    pctProfitablePeriods: number;
    sortinoRatio: number;
    riskFreeRate: number;
    isError: boolean;
}

export class Statistics implements IStatistics {
    code: string;
    startDate: Date;
    endDate: Date;
    description: string;
    isBenchmark: boolean;
    compoundROR: number;
    cumulativeReturn: number;
    standardDeviationAnnualized: number;
    maxDrawdown: number;
    sharpeRatio: number;
    correlationWithFund: number;
    pctProfitablePeriods: number;
    sortinoRatio: number;
    riskFreeRate: number;
    isError: boolean;

    constructor(options: IStatistics) {
        this.code = options.code;
        this.startDate = options.startDate;
        this.endDate = options.endDate;
        this.description = options.description;
        this.isBenchmark = options.isBenchmark;
        this.compoundROR = options.compoundROR;
        this.cumulativeReturn = options.cumulativeReturn;
        this.standardDeviationAnnualized = options.standardDeviationAnnualized;
        this.maxDrawdown = options.maxDrawdown;
        this.sharpeRatio = options.sharpeRatio;
        this.correlationWithFund = options.correlationWithFund;
        this.pctProfitablePeriods = options.pctProfitablePeriods;
        this.sortinoRatio = options.sortinoRatio;
        this.riskFreeRate = options.riskFreeRate;
        this.isError = options.isError;
    }
}
