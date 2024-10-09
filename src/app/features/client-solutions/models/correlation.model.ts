export interface ICorrelation {
    code: string;
    corr: {[code: string]: number};
}
export class Correlation implements ICorrelation {
    code: string;
    corr: {[code: string]: number};

    constructor(options: ICorrelation) {
        this.code = options.code;
        this.corr = options.corr;
    }

}
