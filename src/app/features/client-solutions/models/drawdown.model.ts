export interface IDrawdown {
    fundCode: string;
    value: any;
}

export class Drawdown implements IDrawdown {
    fundCode: string;
    value: string;
    constructor(options: IDrawdown) {
        this.fundCode = options.fundCode;
        this.value = options.value;
    }
}
