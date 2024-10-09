export interface IFundReturn {
  year: number;
  month: number;
  return: number;
  isEstimated: boolean;
  fundcode?: string;
}

export class FundReturn implements IFundReturn {
  code: string;
  year: number;
  month: number;
  return: number;
  isEstimated: boolean;
  fundcode: string;
  constructor(year, month, rtn, isEstimated) {
    this.year = year;
    this.month = month;
    this.return = rtn;
    this.isEstimated = isEstimated;
  }
}
