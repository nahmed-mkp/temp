export interface IHistogram {
    code: string;
    hist: IHistbar[];
}

export class Histogram {
    code: string;
    hist: IHistbar[];
    constructor(options: IHistogram) {
        this.code = options.code;
        this.hist = options.hist;
    }
}

export interface IHistbar {
    lowerBound: number;
    upperBound: number;
    count: number;
}
export class Histbar implements IHistbar {
    lowerBound: number;
    upperBound: number;
    count: number;
    constructor(options: IHistbar) {
        this.lowerBound = options.lowerBound;
        this.upperBound = options.upperBound;
        this.count = options.count;
    }
}
