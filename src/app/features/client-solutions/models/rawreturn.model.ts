export interface IReturns {
    years: number[];
    returns: {[year: number]: IMonthlyReturn };

    getReturns(): IMonthlyReturn[];
}

export class Returns implements IReturns {

    years: number[];
    returns: {[year: number]: IMonthlyReturn };

    constructor(options?: IReturns) {
        this.years = (options && options.years) || [];
        this.returns = (options && options.returns) || {};
    }

    getReturns(): IMonthlyReturn[] {
        const result = [];
        // sort descending
        this.years.sort((a, b) => b - a);
        // get returns
        this.years.map((year: number) => {
            result.push(this.returns[year]);
        });
        return result;
    }
}

export interface IMonthlyReturn {
    year: number;
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
    ytd: number;
    itd: number;

    updateReturn(month: number, ret: number);
}

export class MonthlyReturn implements IMonthlyReturn {
    year: number;
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
    ytd: number;
    itd: number;

    constructor(options?: IMonthlyReturn) {
        this.year = options && options.year;
        this.jan = (options && options.jan) || null;
        this.feb = (options && options.feb) || null;
        this.mar = (options && options.mar) || null;
        this.apr = (options && options.apr) || null;
        this.may = (options && options.may) || null;
        this.jun = (options && options.jun) || null;
        this.jul = (options && options.jul) || null;
        this.aug = (options && options.aug) || null;
        this.sep = (options && options.sep) || null;
        this.oct = (options && options.oct) || null;
        this.nov = (options && options.nov) || null;
        this.dec = (options && options.dec) || null;
    }

    updateReturn(month: number, ret: number): void {
        switch (month) {
            case 1:
                this.jan = ret;
                break;
            case 2:
                this.feb = ret;
                break;
            case 3:
                this.mar = ret;
                break;
            case 4:
                this.apr = ret;
                break;
            case 5:
                this.may = ret;
                break;
            case 6:
                this.jun = ret;
                break;
            case 7:
                this.jul = ret;
                break;
            case 8:
                this.aug = ret;
                break;
            case 9:
                this.sep = ret;
                break;
            case 10:
                this.oct = ret;
                break;
            case 11:
                this.nov = ret;
                break;
            case 12:
                this.dec = ret;
                break;
        }
    }
}
