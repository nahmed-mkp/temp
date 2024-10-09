export interface ITagsByTraderReq {
  startDate: string;
  endDate: string;
  portfolioManager: string;
}
export interface IPortfolioManager {
  NTName: string;
  Name: string;
  UserId: number;
}
export interface IExecutionData {
  "Buy/Sell": string;
  ExecPrice: number;
  OrderId: number;
  PortfolioManager: string,
  Qty: number;
  Reason: string;
  ReasonId: number;
  SecId: number;
  SecName: string;
  SettleDate: string;
  TradeDate: string;
  TradeName: string;
  Trader: string;
}

export interface IReason {
  Reason: string;
  ReasonId: number;
  UsedBy: string
}

export interface IReasonsUpdateReq {
  reason: string;
  usedBy: string;
  enteredBy: string;
  reasonId: number;
}

export interface ITagsUpdateReq {
  orderId: number;
  reasonId: number;
  enteredBy: string;
}