export interface IDeliverableData {
  tba: string;
  deliverable: string;
  active: boolean;
}


export interface IAgencyData {
  UpdateDate: number;
  alias: string;
  asOfDate: number,
  field: string,
  inputType: string,
  inputValue: number;
  instrId: number,
  instrumentCode: string,
  portfolioId: number,
  portfolioName: string,
  scenario: string,
  settleDate: number,
  spreadType: string,
  updateName: string, 
  valuationDate: number,
  value: number, 
  valueDate: number,
  version: number
}