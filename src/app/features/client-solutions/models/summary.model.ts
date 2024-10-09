export interface ISummary {
    code: string;
    mean: number;
    std: number;
    skew: number;
    kurt: number;
    count: number;
}

export class Summary implements ISummary {
    code: string;
    mean: number;
    std: number;
    skew: number;
    kurt: number;
    count: number;

    constructor(options: ISummary) {
        this.code = options.code;
        this.mean = options.mean;
        this.std = options.std;
        this.skew = options.skew;
        this.kurt = options.kurt;
        this.count = options.count;
    }
}
