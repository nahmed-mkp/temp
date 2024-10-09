export interface IBond {
    name: string;
    cusip: string;
}

export interface IServicer {
    servicer: string;
    percent: number;
}


export interface IDelinquency {
    delinquencyType: string;
    percent: number;
}

export interface IQuartile {
    loanLevelSATOLow: number;
    loanLevelWACLow: number;
    wachigh: number;
    originationYearLow: number;
    percentDTILow: number;
    loanSizeLow: number;
    ltvhigh: number;
    creditScoreHigh: number;
    loanSizeHigh: number;
    ltvlow: number;
    originalLoanAgeHigh: number;
    creditScoreLow: number;
    loanLevelWACHigh: number;
    originationYearHigh: number;
    waclow: number;
    loanLevelSATOHigh: number;
    percentDTIHigh: number;
}

export interface IStateDistribution {
    state: string;
    percent: number;
}