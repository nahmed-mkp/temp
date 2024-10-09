export interface IPnlAdjustmentReq {
  startDate: string;
  endDate: string;
}

export interface IPnlAdjustment {
  ActualSID: number,
  AdjustmentAmount: number,
  AdjustmentDate: string,
  AdjustmentSecurity: string,
  ApplyTo: string,
  CreatedBy: string,
  CreatedOn: string, 
  Description: string,
  FundId: number,
  FundName: string,
  Level: string,
  PLAdjustTypeId: number,
  PodId: number, 
  PodName: string,
  Remarks: string,
  SecurityId: number,
  SecurityName: string,
  TradeId: number,
  TradeName: string,
  UpdatedBy: string,
  UpdatedOn: string
}

export interface IDownloadAdjustmentAttachments {
  rowId: number;
  filePath: string
}