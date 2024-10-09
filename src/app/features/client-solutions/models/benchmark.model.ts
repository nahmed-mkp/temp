import * as fromFunds from './fund.model';

export interface IBenchmark {
    id: number;
    code: string;
    description: string;
    rcpmMDID: number;
}

export class Benchmark implements IBenchmark {

    id: number;
    code: string;
    description: string;
    rcpmMDID: number;

    constructor(options: IBenchmark) {
        this.id = options.id;
        this.code = options.code;
        this.description = options.description;
        this.rcpmMDID = options.rcpmMDID;
    }
}

export interface BenchmarkChanges {
    added: IBenchmark[];
    removed: IBenchmark[];
}

export interface IFundBenchmarks {
    fund: fromFunds.IFund;
    benchmarks: IBenchmark[];
}

export class FundBenchmarks {
    fund: fromFunds.IFund;
    benchmarks: IBenchmark[];

    constructor(options: IFundBenchmarks) {
        this.fund = options.fund;
        this.benchmarks = options.benchmarks || [];
    }
}

export interface IFundBenchmark {
    fund: fromFunds.IFund;
    benchmark: IBenchmark;
}

export class FundBenchmark implements IFundBenchmark {
    benchmark: IBenchmark;
    fund: fromFunds.IFund;
}
